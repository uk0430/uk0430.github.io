// ── CURSOR GLOW ──────────────────────────────────────
const glow = document.getElementById('glow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── THEME SYSTEM ─────────────────────────────────────
const THEMES      = ['dark', 'warm', 'sepia', 'terminal', 'nord'];
const THEME_ICONS = { dark: '🌙', warm: '☀️', sepia: '📖', terminal: '>_', nord: '❄️' };
const THEME_LABEL = { dark: 'LIGHT MODE', warm: 'SEPIA MODE', sepia: 'TERMINAL', terminal: 'NORD MODE', nord: 'DARK MODE' };

// Block transitions during initial theme application to prevent FOUC.
(function () {
  const html  = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-no-transition', '');
  html.setAttribute('data-theme', saved);
  // Keep html.light class in sync for pages with legacy inline css
  if (saved === 'warm') html.classList.add('light');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      html.removeAttribute('data-no-transition');
    });
  });
})();

function updateThemeUI(theme) {
  const label = document.getElementById('themeLabel');
  const icon  = document.querySelector('.toggle-icon');
  if (label) label.textContent = THEME_LABEL[theme] || 'CYCLE THEME';
  if (icon)  icon.textContent  = THEME_ICONS[theme] || '◐';
}

function cycleTheme() {
  const html    = document.documentElement;
  const current = html.getAttribute('data-theme') || 'dark';
  const next    = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  html.setAttribute('data-theme', next);
  if (next === 'warm') html.classList.add('light');
  else                 html.classList.remove('light');
  localStorage.setItem('theme', next);
  updateThemeUI(next);
  const icon = document.querySelector('.toggle-icon');
  if (icon) {
    icon.classList.remove('icon-spin');
    void icon.offsetWidth; // reflow to restart animation
    icon.classList.add('icon-spin');
  }
}

// Backward-compat alias (index.html still calls toggleTheme())
const toggleTheme = cycleTheme;

// Sync label/icon after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(theme);
});

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
    '.skill-card, .exp-card, .project-card, .edu-card, .cert-card, .contact-card, .arch-card, .stat-row, .content-block, .activity-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || a.getAttribute('href') === path.split('/').pop()) {
      a.classList.add('active');
    }
  });
});

// ── SCROLL PROGRESS BAR ──────────────────────────────
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
});


// ── COPY CERT CODE ───────────────────────────────────
function copyCertCode() {
  navigator.clipboard.writeText('PJBBZTSS5ERQQ1GJ').then(() => {
    const btn = document.getElementById('copy-cert-btn');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓';
    btn.style.color = 'var(--green)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1800);
  });
}

// ── MOBILE NAV ───────────────────────────────────────
function toggleNav() {
  document.querySelector('.nav-links')?.classList.toggle('nav-open');
  document.getElementById('hamburger')?.classList.toggle('is-open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.remove('nav-open');
      document.getElementById('hamburger')?.classList.remove('is-open');
    });
  });
});

// ── GITHUB ACTIVITY ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('github-activity');
  if (!container) return;

  fetch('https://api.github.com/users/uk0430/events/public?per_page=30')
    .then(r => r.json())
    .then(events => {
      const pushes = events.filter(e => e.type === 'PushEvent').slice(0, 6);
      if (!pushes.length) {
        container.innerHTML = '<p class="activity-empty">No recent public activity.</p>';
        return;
      }
      container.innerHTML = pushes.map(e => {
        const repo = e.repo.name.replace('uk0430/', '');
        const msg  = e.payload.commits?.[0]?.message?.split('\n')[0] || 'pushed commits';
        const date = new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `<div class="activity-item">
          <span class="activity-date">${date}</span>
          <span class="activity-repo">${repo}</span>
          <span class="activity-msg">${msg}</span>
        </div>`;
      }).join('');
    })
    .catch(() => {
      container.innerHTML = '<p class="activity-empty">Activity unavailable.</p>';
    });
});

// ── TERMINAL ─────────────────────────────────────────
const CMDS = {
  help: () => [
    'commands:',
    '  whoami         · ls            · cat skills',
    '  cat experience · ping          · traceroute',
    '  cd ops         · cd noc        · cd tracker    · clear · exit',
    '',
  ],
  whoami: () => [
    'Uzair Khan — Network Operations Engineer',
    'Manassas, VA · linkedin.com/in/uk0430 · github.com/uk0430',
    '',
  ],
  ls: () => ['skills/  experience/  projects/  education/  contact/', ''],
  'cat skills': () => [
    'Networking:  OSPF · BGP · MPLS · VLANs · VPN',
    'Satellite:   iDirect · DVB-S2 · P1dB · ModCod · HTS/FSS',
    'Monitoring:  SolarWinds · Splunk SIEM · SNMP · NetFlow',
    'Endpoint:    Intune · SCCM · Azure AD · Autopilot',
    'Automation:  Python · PowerShell · RAG/LLM · SQLite',
    '',
  ],
  'cat experience': () => [
    '2024–2025  MDThink — IT Functional Analyst II',
    '2022–2024  SES Networks — Network Engineer (NOC)',
    '2021–2022  ViaPath — Enterprise Network Technician',
    '2017–2020  Carfax — Enterprise Operations Support',
    '2012–2016  AT&T Mobility — Retail Operations Manager',
    '',
  ],
  ping: () => [
    'PING opportunities.network (0.0.0.0)',
    '64 bytes: icmp_seq=1 ttl=64 time=1.2ms',
    '64 bytes: icmp_seq=2 ttl=64 time=0.9ms',
    '64 bytes: icmp_seq=3 ttl=64 time=1.1ms',
    '3 packets transmitted, 3 received, 0% packet loss',
    '',
  ],
  'cd ops': () => { setTimeout(() => { window.location.href = '/ops.html'; }, 300); return ['→ navigating to ops.html...', '']; },
  'cd noc': () => { setTimeout(() => { window.location.href = '/noc.html'; }, 300); return ['→ navigating to noc.html...', '']; },
  'cd tracker': () => { setTimeout(() => { window.location.href = '/tracker.html'; }, 300); return ['→ navigating to tracker.html...', '']; },
  traceroute: () => [
    'traceroute to next-role.career',
    ' 1  your-screen.local       0.1ms',
    ' 2  linkedin.com           12.4ms',
    ' 3  github.com             18.7ms',
    ' 4  uk0430.github.io       22.1ms',
    ' 5  hiring-manager.corp    31.0ms',
    ' 6  offer-letter.pdf         * *',
    '',
  ],
};

let tHistory = [], tHistIdx = -1;

function openTerminal() {
  const m = document.getElementById('terminal-modal');
  if (!m) return;
  m.style.display = 'flex';
  const o = document.getElementById('term-output');
  o.innerHTML = '';
  tLine(o, '┌─ uzair@portfolio ────────────────────────┐', 'tc-accent');
  tLine(o, '│  type "help" · ESC or ` to close         │', 'tc-muted');
  tLine(o, '└──────────────────────────────────────────┘', 'tc-accent');
  tLine(o, '', '');
  document.getElementById('term-input')?.focus();
  tHistory = []; tHistIdx = -1;
}

function closeTerminal() {
  const m = document.getElementById('terminal-modal');
  if (m) m.style.display = 'none';
}

function tLine(out, text, cls) {
  const d = document.createElement('div');
  d.className = 'tl' + (cls ? ' ' + cls : '');
  d.textContent = text;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}

function tEcho(out, cmd) {
  const d = document.createElement('div');
  d.className = 'tl';
  d.innerHTML = '<span class="tc-prompt">$ </span><span class="tc-cmd">' + cmd + '</span>';
  out.appendChild(d);
}

function runCmd(raw) {
  const cmd = raw.trim().toLowerCase();
  const o = document.getElementById('term-output');
  tEcho(o, raw.trim());
  if (!cmd) return;
  if (cmd === 'exit') { setTimeout(closeTerminal, 200); return; }
  if (cmd === 'clear') { o.innerHTML = ''; return; }
  const fn = CMDS[cmd];
  if (fn) fn().forEach(l => tLine(o, l, 'tc-out'));
  else { tLine(o, 'not found: ' + cmd + ' — try "help"', 'tc-err'); tLine(o, '', ''); }
}

document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('term-input');
  if (!inp) return;

  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = inp.value;
      if (v.trim()) tHistory.unshift(v);
      tHistIdx = -1;
      runCmd(v);
      inp.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (tHistIdx < tHistory.length - 1) inp.value = tHistory[++tHistIdx];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      tHistIdx > 0 ? (inp.value = tHistory[--tHistIdx]) : (tHistIdx = -1, inp.value = '');
    } else if (e.key === 'Escape') {
      closeTerminal();
    }
  });

  document.getElementById('terminal-modal')?.addEventListener('click', e => {
    if (e.target.id === 'terminal-modal') closeTerminal();
  });
});

// Backtick shortcut toggles terminal
document.addEventListener('keydown', e => {
  if (e.key !== '`' || e.ctrlKey || e.metaKey) return;
  const active = document.activeElement;
  if (active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA') return;
  const m = document.getElementById('terminal-modal');
  if (!m) return;
  m.style.display === 'flex' ? closeTerminal() : openTerminal();
});
