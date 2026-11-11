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

// 2. Section numerals rise once. Visible by default; hidden only when motion is allowed.
const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
if (motionOk && 'IntersectionObserver' in window) {
  const rise = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.remove('is-pre');
          rise.unobserve(e.target);
        }
      }
    },
    { threshold: 0.2 },
  );
  document.querySelectorAll('.rise').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.9) {
      el.classList.add('is-pre');
      rise.observe(el);
    }
  });
}

// 3. Netlify forms: submit in place with a status line; fall back to a normal POST without JS.
document.querySelectorAll<HTMLFormElement>('form[data-ajax]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('.form-status');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
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
      status.textContent = 'Sent. I will reply by email.';
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'That did not go through. Try again, or message me on LinkedIn.';
    } finally {
      status.hidden = false;
      button.disabled = false;
      button.innerHTML = label;
    }
  });
});
