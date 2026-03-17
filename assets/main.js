// ── CURSOR GLOW ──────────────────────────────────────
const glow = document.getElementById('glow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── THEME TOGGLE ─────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.classList.toggle('light');
  const label = document.getElementById('themeLabel');
  const icon  = document.querySelector('.toggle-icon');
  if (label) label.textContent = isLight ? 'DARK MODE' : 'LIGHT MODE';
  if (icon)  icon.textContent  = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Restore saved theme immediately
(function() {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
    document.addEventListener('DOMContentLoaded', () => {
      const label = document.getElementById('themeLabel');
      const icon  = document.querySelector('.toggle-icon');
      if (label) label.textContent = 'DARK MODE';
      if (icon)  icon.textContent  = '☀️';
    });
  }
})();

// ── EXPERIENCE ACCORDION ─────────────────────────────
function toggleExp(header) {
  const card = header.closest('.exp-card');
  card.classList.toggle('open');
}

// ── SCROLL FADE-IN ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    '.skill-card, .exp-card, .project-card, .edu-card, .cert-card, .contact-card, .arch-card, .stat-row, .content-block'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Mark active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || a.getAttribute('href') === path.split('/').pop()) {
      a.classList.add('active');
    }
  });
});
