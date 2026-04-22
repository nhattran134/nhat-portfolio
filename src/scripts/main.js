(function () {
  'use strict';

  // 1. Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('active');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  // 2. Stagger assignment
  var grids = document.querySelectorAll('.stats-grid, .stat-grid, .services-grid, .skills-grid, .projects-grid, .testimonials-grid, .cert-grid, .tags, .tag-row');
  grids.forEach(function (grid) {
    var children = grid.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.classList.add('stagger-' + ((i % 6) + 1));
    });
  });

  // 3. Counter animation
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counterObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.textContent.replace(/[0-9]/g, '');
          var start = performance.now();
          var duration = 1500;
          function step(now) {
            var t = Math.min((now - start) / duration, 1);
            var ease = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * ease) + suffix;
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach(function (el) { counterObs.observe(el); });
  }

  // 4. Smooth scroll + close mobile menu
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('[data-nav-links]');
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (toggle && links && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 5. Mobile menu toggle
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('open');
    });
  }

  // 6. Magnetic buttons
  document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.3;
      var y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  // 7. Back-to-top + 8. Nav scroll effect
  var backToTop = document.querySelector('.back-to-top');
  var nav = document.querySelector('nav, .nav');
  window.addEventListener('scroll', function () {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. Card tilt
  document.querySelectorAll('[data-tilt]').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(500px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  // 10. Contact form AJAX
  var form = document.getElementById('contactForm') || document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          btn.textContent = 'Sent!';
          form.reset();
          setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 3000);
        })
        .catch(function () {
          btn.textContent = 'Error — try again';
          btn.disabled = false;
          setTimeout(function () { btn.textContent = original; }, 3000);
        });
    });
  }

  // 11. Hero code typing animation
  var codeEl = document.getElementById('hero-code-text');
  if (codeEl) {
    var lines = [
      { text: '# pipeline.yml', cls: 'cm' },
      { text: 'name: ', cls: 'key', rest: [{ text: 'CI/CD Pipeline', cls: 'str' }] },
      { text: 'on: ', cls: 'key', rest: [{ text: '[push, pull_request]', cls: 'val' }] },
      { text: '' },
      { text: 'jobs:', cls: 'key' },
      { text: '  discover:', cls: 'key' },
      { text: '    runs-on: ', cls: 'key', rest: [{ text: 'self-hosted', cls: 'str' }] },
      { text: '    outputs:', cls: 'key' },
      { text: '      matrix: ', cls: 'key', rest: [{ text: '${{ steps.detect.outputs.projects }}', cls: 'fn' }] },
      { text: '' },
      { text: '  build:', cls: 'key' },
      { text: '    needs: ', cls: 'key', rest: [{ text: 'discover', cls: 'str' }] },
      { text: '    strategy:', cls: 'key' },
      { text: '      matrix: ', cls: 'key', rest: [{ text: '${{ fromJson(needs.discover.outputs.matrix) }}', cls: 'fn' }] },
      { text: '    steps:', cls: 'key' },
      { text: '      - uses: ', cls: 'key', rest: [{ text: 'actions/checkout@v4', cls: 'str' }] },
      { text: '      - run: ', cls: 'key', rest: [{ text: 'terraform init && terraform plan', cls: 'fn' }] },
      { text: '      - run: ', cls: 'key', rest: [{ text: 'trivy fs --severity HIGH,CRITICAL .', cls: 'fn' }] },
      { text: '' },
      { text: '  deploy:', cls: 'key' },
      { text: '    needs: ', cls: 'key', rest: [{ text: '[build]', cls: 'str' }] },
      { text: '    environment: ', cls: 'key', rest: [{ text: 'production', cls: 'val' }] },
      { text: '    permissions:', cls: 'key' },
      { text: '      id-token: ', cls: 'key', rest: [{ text: 'write  ', cls: 'val' }, { text: '# OIDC', cls: 'cm' }] },
      { text: '    steps:', cls: 'key' },
      { text: '      - run: ', cls: 'key', rest: [{ text: 'terraform apply -auto-approve', cls: 'fn' }] },
      { text: '' },
      { text: '# Apply complete! Resources: 12 added, 3 changed, 0 destroyed.', cls: 'cm' },
    ];

    var lineIdx = 0;
    var charIdx = 0;
    var currentLine = '';
    var output = '';
    var speed = 30;
    var lineDelay = 200;

    function getLineText(line) {
      var t = line.text;
      if (line.rest) {
        line.rest.forEach(function (r) { t += r.text; });
      }
      return t;
    }

    function renderLine(line) {
      if (!line.text && !line.rest) return '';
      var html = '';
      if (line.cls) {
        html += '<span class="' + line.cls + '">' + escHtml(line.text) + '</span>';
      } else {
        html += escHtml(line.text);
      }
      if (line.rest) {
        line.rest.forEach(function (r) {
          html += '<span class="' + r.cls + '">' + escHtml(r.text) + '</span>';
        });
      }
      return html;
    }

    function escHtml(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderPartial(line, chars) {
      var plain = getLineText(line);
      var visible = plain.substring(0, chars);
      // Build syntax-highlighted partial
      var pos = 0;
      var parts = [];
      if (line.cls) parts.push({ text: line.text, cls: line.cls });
      else parts.push({ text: line.text, cls: '' });
      if (line.rest) {
        line.rest.forEach(function (r) { parts.push({ text: r.text, cls: r.cls }); });
      }
      var html = '';
      var remaining = chars;
      for (var i = 0; i < parts.length && remaining > 0; i++) {
        var slice = parts[i].text.substring(0, remaining);
        remaining -= slice.length;
        if (parts[i].cls) {
          html += '<span class="' + parts[i].cls + '">' + escHtml(slice) + '</span>';
        } else {
          html += escHtml(slice);
        }
      }
      return html;
    }

    function typeLine() {
      if (lineIdx >= lines.length) return;
      var line = lines[lineIdx];
      var fullLen = getLineText(line).length;

      if (charIdx <= fullLen) {
        codeEl.innerHTML = output + renderPartial(line, charIdx);
        charIdx++;
        codeEl.parentElement.scrollTop = codeEl.parentElement.scrollHeight;
        var vimPos = document.getElementById('vim-pos');
        if (vimPos) vimPos.textContent = (lineIdx + 1) + ',' + charIdx;
        setTimeout(typeLine, speed);
      } else {
        output += renderLine(line) + '\n';
        codeEl.innerHTML = output;
        codeEl.parentElement.scrollTop = codeEl.parentElement.scrollHeight;
        lineIdx++;
        charIdx = 0;
        if (lineIdx >= lines.length) {
          var vimMode = document.getElementById('vim-mode');
          var vimPos2 = document.getElementById('vim-pos');
          if (vimMode) vimMode.textContent = '-- NORMAL --';
          if (vimMode) vimMode.style.color = '#bd93f9';
          if (vimPos2) vimPos2.textContent = lines.length + ',1';
          return;
        }
        lineIdx++;
        charIdx = 0;
        setTimeout(typeLine, lineDelay);
      }
    }

    // Start after a short delay
    setTimeout(typeLine, 800);
  }

  // 12. Git branch flow background
  var canvas = document.getElementById('hero-bg');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var mouse = { x: -9999, y: -9999 };
    var commits = [];
    var branches = [];
    var branchColors = ['rgba(20,184,166,0.6)', 'rgba(139,92,246,0.5)', 'rgba(59,130,246,0.5)', 'rgba(99,102,241,0.4)'];
    var speed = 0.5;
    var spawnTimer = 0;
    var nextBranchId = 0;
    var stages = [
      { label: 'Build', x: 0.2, color: 'rgba(59,130,246,' },
      { label: 'Test', x: 0.4, color: 'rgba(139,92,246,' },
      { label: 'Scan', x: 0.6, color: 'rgba(245,158,11,' },
      { label: 'Deploy', x: 0.8, color: 'rgba(20,184,166,' },
    ];

    function resize() {
      var hero = document.getElementById('hero');
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      // Init branches spread evenly across full height
      if (branches.length === 0) {
        var padding = canvas.height * 0.12;
        var gap = (canvas.height - padding * 2) / 3;
        for (var i = 0; i < 4; i++) {
          branches.push({
            id: nextBranchId++,
            y: padding + i * gap,
            color: branchColors[i],
            active: true
          });
        }
      } else {
        var padding = canvas.height * 0.12;
        var gap = (canvas.height - padding * 2) / 3;
        for (var i = 0; i < branches.length; i++) {
          branches[i].y = padding + i * gap;
        }
      }
    }
    resize();
    window.addEventListener('resize', resize);

    var hero = document.getElementById('hero');
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    function spawnCommit() {
      var activeBranches = branches.filter(function(b) { return b.active; });
      if (activeBranches.length === 0) return;
      var branch = activeBranches[Math.floor(Math.random() * activeBranches.length)];
      var c = {
        x: -10,
        y: branch.y + (Math.random() - 0.5) * 4,
        branchId: branch.id,
        branchY: branch.y,
        color: branch.color,
        r: 2 + Math.random() * 1.5,
        speed: speed + Math.random() * 0.3,
        glow: 0,
        merge: false,
        mergeTarget: -1
      };
      // Random chance to branch or merge
      if (Math.random() < 0.08 && activeBranches.length > 1) {
        var other = activeBranches[Math.floor(Math.random() * activeBranches.length)];
        if (other.id !== branch.id) {
          c.merge = true;
          c.mergeTarget = other.y;
        }
      }
      commits.push(c);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw branch lines
      for (var i = 0; i < branches.length; i++) {
        var b = branches[i];
        ctx.beginPath();
        ctx.moveTo(0, b.y);
        ctx.lineTo(canvas.width, b.y);
        ctx.globalAlpha = 0.05;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw pipeline stage gates
      for (var s = 0; s < stages.length; s++) {
        var sx = stages[s].x * canvas.width;
        // Vertical dashed line through all branches
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(sx, branches[0].y - 20);
        ctx.lineTo(sx, branches[branches.length - 1].y + 20);
        ctx.strokeStyle = stages[s].color + '0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        // Stage label
        ctx.font = '500 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = stages[s].color + '0.15)';
        ctx.fillText(stages[s].label, sx, branches[0].y - 28);

        // Dots where stage crosses each branch
        for (var bi = 0; bi < branches.length; bi++) {
          var passing = false;
          for (var ci = 0; ci < commits.length; ci++) {
            if (commits[ci].branchId === branches[bi].id && Math.abs(commits[ci].x - sx) < 8) {
              passing = true;
              break;
            }
          }
          ctx.beginPath();
          ctx.arc(sx, branches[bi].y, passing ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = passing ? stages[s].color + '0.5)' : 'rgba(255, 255, 255, 0.06)';
          ctx.fill();
        }
      }

      // Spawn commits
      spawnTimer++;
      if (spawnTimer > 12) {
        spawnCommit();
        spawnTimer = 0;
      }

      // Update and draw commits
      for (var i = commits.length - 1; i >= 0; i--) {
        var c = commits[i];

        // Mouse attraction
        var dx = c.x - mouse.x;
        var dy = c.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          c.glow = Math.max(c.glow, (1 - dist / 150) * 0.8);
          // Slight attraction
          c.y += (mouse.y - c.y) * 0.01;
        } else {
          c.glow *= 0.95;
        }

        // Move
        c.x += c.speed;

        // Stay on branch line
        if (c.merge && c.x > canvas.width * 0.4 && c.x < canvas.width * 0.7) {
          var progress = (c.x - canvas.width * 0.4) / (canvas.width * 0.3);
          c.y = c.branchY + (c.mergeTarget - c.branchY) * Math.sin(progress * Math.PI * 0.5);
        } else {
          c.y += (c.branchY - c.y) * 0.1;
        }

        // Draw connection line to previous commit on same branch
        for (var j = i - 1; j >= Math.max(0, i - 8); j--) {
          var prev = commits[j];
          if (prev.branchId === c.branchId && c.x - prev.x < 80 && c.x - prev.x > 0) {
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = c.color;
            ctx.globalAlpha = 0.15 + c.glow * 0.3;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
            break;
          }
        }

        // Draw merge line
        if (c.merge && c.x > canvas.width * 0.35 && c.x < canvas.width * 0.75) {
          ctx.beginPath();
          ctx.moveTo(c.x, c.branchY);
          ctx.quadraticCurveTo(c.x, c.y, c.x, c.y);
          ctx.strokeStyle = c.color;
          ctx.globalAlpha = 0.2;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Draw commit dot
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = 0.3 + c.glow * 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Glow
        if (c.glow > 0.1) {
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r + 6, 0, Math.PI * 2);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = c.glow * 0.15;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Remove off-screen
        if (c.x > canvas.width + 20) {
          commits.splice(i, 1);
        }
      }

      // Draw cursor node if in canvas
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#14b8a6';
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Lines to nearby commits
        for (var i = 0; i < commits.length; i++) {
          var c = commits[i];
          var d = Math.sqrt((c.x - mouse.x) * (c.x - mouse.x) + (c.y - mouse.y) * (c.y - mouse.y));
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = '#14b8a6';
            ctx.globalAlpha = 0.15 * (1 - d / 120);
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  }
})();
