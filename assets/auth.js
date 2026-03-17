// ── PRIVATE PAGE AUTH ─────────────────────────────────────────────────────
// NOTE: Client-side auth on a static site = security by obscurity.
// Credentials are visible in source. This keeps casual visitors out, not
// determined ones. Fine for personal tools on a personal static site.

(function () {
  const TOKEN_KEY = 'uk-auth';
  const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
  // stored as base64 just to avoid plaintext in a quick view
  const CREDS = { u: btoa('uk0430'), p: btoa('pakistan1@1') };

  function isAuthed() {
    try {
      const raw = localStorage.getItem(TOKEN_KEY);
      if (!raw) return false;
      const { exp } = JSON.parse(raw);
      return Date.now() < exp;
    } catch { return false; }
  }

  function setToken() {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ exp: Date.now() + EXPIRY_MS }));
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #auth-overlay {
        position: fixed;
        inset: 0;
        background: var(--bg, #07090f);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9000;
        font-family: 'IBM Plex Mono', monospace;
      }
      #auth-box {
        background: var(--bg2, #0d1117);
        border: 1px solid var(--border, #1e2a3a);
        border-radius: 10px;
        padding: 36px 40px;
        width: 340px;
        max-width: 90vw;
      }
      #auth-label {
        font-family: 'Syne', sans-serif;
        font-size: 22px;
        font-weight: 800;
        color: var(--text, #e2e8f0);
        margin-bottom: 6px;
        letter-spacing: -0.03em;
      }
      #auth-sublabel {
        font-size: 11px;
        color: var(--muted, #4b5563);
        margin-bottom: 28px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      .auth-field {
        width: 100%;
        background: var(--bg3, #111827);
        border: 1px solid var(--border, #1e2a3a);
        border-radius: 6px;
        color: var(--text, #e2e8f0);
        font-family: 'IBM Plex Mono', monospace;
        font-size: 13px;
        padding: 10px 14px;
        outline: none;
        margin-bottom: 12px;
        display: block;
        transition: border-color 0.2s;
      }
      .auth-field:focus { border-color: var(--accent, #38bdf8); }
      .auth-field::placeholder { color: var(--muted, #4b5563); }
      #auth-submit {
        width: 100%;
        background: var(--accent, #38bdf8);
        border: none;
        border-radius: 6px;
        color: #07090f;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        font-weight: 600;
        padding: 11px;
        cursor: pointer;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-top: 4px;
        transition: opacity 0.15s;
      }
      #auth-submit:hover { opacity: 0.85; }
      #auth-error {
        font-size: 11px;
        color: var(--red, #f87171);
        margin-top: 12px;
        text-align: center;
        min-height: 16px;
      }
      #auth-hint {
        font-size: 10px;
        color: var(--muted, #4b5563);
        margin-top: 20px;
        text-align: center;
        border-top: 1px solid var(--border, #1e2a3a);
        padding-top: 14px;
      }
    `;
    document.head.appendChild(style);
  }

  function showLogin() {
    // hide page content until authed
    document.body.style.visibility = 'hidden';

    injectStyles();

    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.innerHTML = `
      <div id="auth-box">
        <div id="auth-label">~/private</div>
        <div id="auth-sublabel">uk0430.github.io</div>
        <input id="auth-user" class="auth-field" type="text" placeholder="username" autocomplete="username" spellcheck="false">
        <input id="auth-pass" class="auth-field" type="password" placeholder="password" autocomplete="current-password">
        <button id="auth-submit">Access</button>
        <div id="auth-error"></div>
        <div id="auth-hint">session lasts 7 days</div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.visibility = 'visible';

    const userEl  = document.getElementById('auth-user');
    const passEl  = document.getElementById('auth-pass');
    const errorEl = document.getElementById('auth-error');
    const btn     = document.getElementById('auth-submit');

    userEl.focus();

    function attempt() {
      const u = userEl.value.trim();
      const p = passEl.value;
      if (btoa(u) === CREDS.u && btoa(p) === CREDS.p) {
        setToken();
        overlay.remove();
      } else {
        errorEl.textContent = 'invalid credentials';
        passEl.value = '';
        passEl.focus();
        setTimeout(() => { errorEl.textContent = ''; }, 2000);
      }
    }

    btn.addEventListener('click', attempt);
    [userEl, passEl].forEach(el => {
      el.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
    });
  }

  // expose logout for use in pages
  window.authLogout = function () {
    clearToken();
    window.location.reload();
  };

  // run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { if (!isAuthed()) showLogin(); });
  } else {
    if (!isAuthed()) showLogin();
  }
})();
