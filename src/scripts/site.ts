// 1. Running header: mark the section in view.
const links = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((a) => links.set(a.dataset.nav!, a));
const sections = document.querySelectorAll<HTMLElement>('[data-sec]');

if (sections.length && 'IntersectionObserver' in window) {
  // Track elements, not ids: a section's divider and its sheets share one id.
  const visible = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        e.isIntersecting ? visible.add(el) : visible.delete(el);
      }
      const inView = [...visible].sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      const current = inView.pop()?.dataset.sec;
      if (!current) return;
      links.forEach((a, id) => a.setAttribute('aria-current', String(id === current)));
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));
  // Keep a section current while its sheets scroll by: observe sheets as part of the preceding section.
  document.querySelectorAll<HTMLElement>('[data-sec] ~ .sheet').forEach((sheet) => {
    let prev = sheet.previousElementSibling as HTMLElement | null;
    while (prev && !prev.dataset.sec) prev = prev.previousElementSibling as HTMLElement | null;
    if (prev) {
      sheet.dataset.sec = prev.dataset.sec;
      io.observe(sheet);
    }
  });
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

// Play `run` once, the first time `el` is mostly in view. Content stays visible until then:
// animations use fill 'backwards', so nothing is hidden if this never runs.
function once(el: Element, run: () => void, threshold = 0.4) {
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      run();
    }
  }, { threshold });
  io.observe(el);
}

if (motionOk && 'IntersectionObserver' in window) {
  // 2. Figure 1.0: one change passes the gates row by row; the typical setup's skips land last and harder.
  document.querySelectorAll('.gates').forEach((fig) => {
    once(fig, () => {
      const marks = [...fig.querySelectorAll<HTMLElement>('td > :first-child')];
      const passes = marks.filter((m) => !m.classList.contains('skipped'));
      const skips = marks.filter((m) => m.classList.contains('skipped'));
      passes.forEach((m, i) =>
        m.animate([{ opacity: 0, transform: 'scale(0.4)' }, { opacity: 1, transform: 'none' }], {
          duration: 260, delay: 120 + i * 55, easing: EASE, fill: 'backwards',
        }),
      );
      const after = 120 + passes.length * 55 + 120;
      skips.forEach((m, i) =>
        m.animate([{ opacity: 0, transform: 'scale(1.8)' }, { opacity: 1, transform: 'none' }], {
          duration: 340, delay: after + i * 140, easing: EASE, fill: 'backwards',
        }),
      );
    });
  });

  // 3. Pipeline figures: stages arrive left to right, so the direction reads at a glance.
  document.querySelectorAll('.flow').forEach((fig) => {
    once(fig, () => {
      fig.querySelectorAll<HTMLElement>('li').forEach((li, i) =>
        li.animate([{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'none' }], {
          duration: 320, delay: Math.min(i, 7) * 60, easing: EASE, fill: 'backwards',
        }),
      );
    }, 0.6);
  });
}

// 4. Field errors: say what is wrong under the field, not only in colour. JS-only, so the
// browser's own validation still guards the form when script fails.
type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
function errorFor(c: Control): string {
  if (c.validity.valueMissing) {
    if (c instanceof HTMLSelectElement) return 'Choose what you need.';
    if (c.type === 'email') return 'Enter your email address.';
    if (c.name === 'message') return 'Tell me a little about the work.';
    return 'Enter your name.';
  }
  if (c.validity.typeMismatch) return 'Enter an email address like you@company.com.';
  return '';
}
function showError(c: Control) {
  const msg = errorFor(c);
  let el = document.getElementById(`${c.id || c.name}-error`);
  if (!msg) {
    el?.remove();
    c.removeAttribute('aria-invalid');
    c.removeAttribute('aria-describedby');
    return;
  }
  if (!el) {
    el = Object.assign(document.createElement('span'), { id: `${c.id || c.name}-error`, className: 'field-error' });
    c.after(el);
  }
  el.textContent = msg;
  c.setAttribute('aria-invalid', 'true');
  c.setAttribute('aria-describedby', el.id);
}

// 5. Netlify forms: submit in place with a status line; fall back to a normal POST without JS.
document.querySelectorAll<HTMLFormElement>('form[data-ajax]').forEach((form) => {
  form.noValidate = true;
  const controls = [...form.querySelectorAll<Control>('input:not([type=hidden]):not([name=bot-field]), select, textarea')];
  controls.forEach((c, i) => {
    if (!c.id) c.id = `${form.name}-${c.name || i}`;
    c.addEventListener('blur', () => c.value && showError(c));
    c.addEventListener('input', () => c.hasAttribute('aria-invalid') && showError(c));
    c.addEventListener('change', () => c.hasAttribute('aria-invalid') && showError(c));
  });
  const status = form.querySelector<HTMLElement>('.form-status');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    controls.forEach(showError);
    const firstBad = controls.find((c) => !c.checkValidity());
    if (firstBad) {
      firstBad.focus();
      return;
    }
    if (!status || !button) return form.submit();
    const label = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Sending…';
    status.hidden = true;
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.dataset.state = 'ok';
      status.textContent = 'Sent. I will reply to the email address you gave within 2 days.';
    } catch {
      status.dataset.state = 'error';
      const li = Object.assign(document.createElement('a'), { href: 'https://linkedin.com/in/nathantr', textContent: 'message me on LinkedIn' });
      status.replaceChildren('That did not go through. Try again, or ', li, '.');
    } finally {
      status.hidden = false;
      button.disabled = false;
      button.innerHTML = label;
      // Feedback stays legible under reduced motion: fade only, no travel.
      status.animate(
        motionOk
          ? [{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }]
          : [{ opacity: 0 }, { opacity: 1 }],
        { duration: 180, easing: EASE },
      );
    }
  });
});
