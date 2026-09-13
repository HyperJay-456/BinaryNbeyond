// js/script.js
// Enhancements: inject navbar/footer, theme toggle, input validation, keyboard support,
// ripple microinteraction, result animations, data-action button wiring.
//
// Assumptions: your existing functions are globally available:
// - performArithmetic(), generateArithmeticPractice(), checkArithmeticPractice(), showArithmeticPracticeSteps()
// They come from js/arithmetic/arithmetic.js and related conversion files.

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------
     Navbar & Footer (injection)
     -------------------------- */
  const NAV_HTML = `
<nav class="navbar px-4 sm:px-6 py-2.5 bg-transparent border-none transition-all duration-300" aria-label="Main navigation">
        <div class="navbar-start gap-2">
            <button id="mobile-menu-button" class="lg:hidden btn btn-ghost btn-sm btn-circle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <a class="group flex items-center gap-3 px-2 py-1.5 rounded-xl transition-all duration-200" href="index.html" aria-label="BinaryNBeyond homepage">
                <div class="flex-shrink-0 flex items-center justify-center">
                    <img src="logo.webp" alt="BinaryNBeyond logo" class="w-8 h-8 rounded-lg object-contain" width="32" height="32" />
                </div>
                <div class="flex flex-col text-left leading-none select-none">
                    <span class="text-[17px] font-black tracking-tight flex items-center">
                        <span class="brand-text">Binary</span><span class="text-indigo-400 font-extrabold px-[1px]">N</span><span class="brand-text">Beyond</span>
                    </span>
                    <span class="text-[9px] font-mono font-semibold tracking-widest text-muted uppercase opacity-75 mt-0.5">Visual Computing</span>
                </div>
            </a>
        </div>

        <div id="mobile-menu" class="navbar-center hidden lg:flex flex-col lg:flex-row absolute lg:static top-16 left-0 right-0 bg-base-100/95 lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none p-4 lg:p-0 shadow-2xl lg:shadow-none z-40 border-b lg:border-none border-white/10">
            <ul class="menu menu-vertical lg:menu-horizontal px-1 w-full lg:w-auto font-medium gap-1" role="menu" aria-label="Primary navigation">
                <li><a id="nav-home" href="index.html" class="px-3.5 py-1.5 rounded-lg hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">Home</a></li>
                <li class="relative">
                    <button id="features-button" class="px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors" aria-expanded="false" aria-controls="features-menu" aria-haspopup="true">
                        <span>Calculators</span>
                        <svg class="w-3.5 h-3.5 opacity-70 transition-transform duration-200" id="features-caret" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <ul id="features-menu" class="p-2.5 bg-base-100/95 backdrop-blur-2xl w-64 z-50 hidden absolute mt-2 rounded-2xl shadow-2xl border border-white/10 space-y-1.5">
                        <li>
                            <a id="nav-arithmetic" href="arithmetic.html" class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                                <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                                <div>
                                    <div class="font-bold text-sm">Arithmetic Engine</div>
                                    <div class="text-[11px] text-muted font-normal">2's complement subtraction & division</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a id="nav-bitwise" href="bitwise.html" class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                                <div>
                                    <div class="font-bold text-sm">Bitwise Studio</div>
                                    <div class="text-[11px] text-muted font-normal">AND, OR, XOR, NOT, Shifts</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a id="nav-conversions" href="numberConversions.html" class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                                <span class="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                                <div>
                                    <div class="font-bold text-sm">Base Conversions</div>
                                    <div class="text-[11px] text-muted font-normal">Binary, Octal, Decimal, Hex</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li><a id="nav-about" href="about.html" class="px-3.5 py-1.5 rounded-lg hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">About</a></li>
                <li><a id="nav-services" href="webdevelopment.html" class="px-3.5 py-1.5 rounded-lg hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">Services</a></li>
                <li><a id="nav-team" href="team.html" class="px-3.5 py-1.5 rounded-lg hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">Team</a></li>
            </ul>
        </div>
        <div class="navbar-end gap-2">
          <a href="https://github.com/HyperJay-456/BinaryNbeyond" target="_blank" rel="noopener" class="hidden sm:inline-flex btn btn-ghost btn-sm btn-circle text-muted hover:text-indigo-400" title="GitHub Repository">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
          <label class="flex cursor-pointer gap-2 items-center px-2.5 py-1.5 rounded-full bg-base-200/50 hover:bg-base-200 border border-white/10 transition-colors" for="theme-toggle" title="Toggle Theme">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400">
              <circle cx="12" cy="12" r="5"></circle>
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
            </svg>
            <input id="theme-toggle" type="checkbox" class="toggle toggle-sm theme-controller" aria-label="Toggle theme">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
    </nav>
`;

const FOOTER_HTML = `
<footer class="bg-base-200/60 backdrop-blur-xl text-base-content pt-14 pb-8 px-6 mt-20 border-t border-white/10" aria-label="Site footer">
  <!-- Pre-Footer Banner -->
  <div class="max-w-6xl mx-auto mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
    <div class="space-y-1 text-center sm:text-left">
      <h4 class="text-lg font-extrabold tracking-tight">Accelerate your understanding of digital logic.</h4>
      <p class="text-xs text-muted">All calculation engines run 100% in-browser with zero latency and full privacy.</p>
    </div>
    <div class="flex items-center gap-3">
      <a href="arithmetic.html" class="btn btn-primary btn-sm">Open Arithmetic</a>
      <a href="https://github.com/HyperJay-456/BinaryNbeyond" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Star on GitHub</a>
    </div>
  </div>

  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    <div class="space-y-3.5">
      <div class="flex items-center gap-2.5">
        <div class="relative flex-shrink-0">
          <img src="logo.webp" alt="BinaryNBeyond logo" class="w-7 h-7 rounded-lg ring-1 ring-white/15" />
        </div>
        <div class="flex flex-col text-left leading-none">
          <span class="text-base font-black tracking-tight flex items-center">
            <span>Binary</span><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-extrabold px-[1px]">N</span><span>Beyond</span>
          </span>
          <span class="text-[8px] font-mono font-semibold tracking-widest text-muted uppercase opacity-75 mt-0.5">Visual Computing</span>
        </div>
      </div>
      <p class="text-sm opacity-75 leading-relaxed">Next-generation visual calculators for arithmetic, digital logic, and number systems with transparent step-by-step solutions.</p>
    </div>
    <nav class="flex flex-col gap-2.5 text-sm">
      <h6 class="font-bold uppercase tracking-wider text-xs text-indigo-400">Core Engines</h6>
      <a class="hover:text-indigo-400 transition-colors" href="arithmetic.html">Arithmetic Operations</a>
      <a class="hover:text-indigo-400 transition-colors" href="bitwise.html">Bitwise Operations Studio</a>
      <a class="hover:text-indigo-400 transition-colors" href="numberConversions.html">Base Conversions</a>
    </nav>
    <nav class="flex flex-col gap-2.5 text-sm">
      <h6 class="font-bold uppercase tracking-wider text-xs text-indigo-400">Resources</h6>
      <a class="hover:text-indigo-400 transition-colors" href="about.html">About BinaryNBeyond</a>
      <a class="hover:text-indigo-400 transition-colors" href="webdevelopment.html">Engineering Services</a>
      <a class="hover:text-indigo-400 transition-colors" href="team.html">Architects & Team</a>
    </nav>
    <nav class="flex flex-col gap-2.5 text-sm">
      <h6 class="font-bold uppercase tracking-wider text-xs text-indigo-400">Ecosystem</h6>
      <a class="hover:text-indigo-400 transition-colors flex items-center gap-2" href="https://x.com/BinaryNBeyond" target="_blank" rel="noopener" aria-label="X">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X (Twitter)
      </a>
      <a class="hover:text-indigo-400 transition-colors flex items-center gap-2" href="https://github.com/HyperJay-456/BinaryNbeyond" target="_blank" rel="noopener">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        GitHub
      </a>
      <a class="hover:text-indigo-400 transition-colors flex items-center gap-2" href="https://www.youtube.com/@binarynbeyond-b7f" target="_blank" rel="noopener" aria-label="YouTube">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        YouTube
      </a>
    </nav>
  </div>
  <div class="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs opacity-70 gap-3">
    <p>&copy; <span id="year"></span> BinaryNBeyond. Crafted for learners and engineers worldwide.</p>
    <button id="back-to-top" class="hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer">
      <span>Back to top</span>
      <span>&uarr;</span>
    </button>
  </div>
</footer>
`;

  const navContainer = document.getElementById('navbar');
  const footerContainer = document.getElementById('footer');
  if (navContainer) navContainer.innerHTML = NAV_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  // Auto-update copyright year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Back to top smooth scroll
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active page highlight in navigation
  (function highlightActivePage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const linkMap = {
      'index.html': 'nav-home',
      'arithmetic.html': 'nav-arithmetic',
      'bitwise.html': 'nav-bitwise',
      'numberConversions.html': 'nav-conversions',
      'about.html': 'nav-about',
      'webdevelopment.html': 'nav-services',
      'team.html': 'nav-team'
    };
    const activeId = linkMap[page];
    if (activeId) {
      const activeEl = document.getElementById(activeId);
      if (activeEl) {
        activeEl.classList.add('nav-active');
        // If in calculators menu, highlight parent button
        if (activeId.startsWith('nav-arithmetic') || activeId.startsWith('nav-bitwise') || activeId.startsWith('nav-conversions')) {
          const featBtn = document.getElementById('features-button');
          if (featBtn) featBtn.classList.add('nav-active');
        }
      }
    }
  })();

  /* --------------------------
     Global Theme Sync (ALL PAGES)
     -------------------------- */
  const THEME_KEY = 'theme';
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'synthwave';
  const themeCheckbox = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = (theme === DARK_THEME);
    document.documentElement.classList.toggle('dark', isDark);
    if (document.documentElement.style) {
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    }
  };

  /* Apply theme on page load */
  (function initTheme() {
    let savedTheme = DARK_THEME;
    try {
      savedTheme = localStorage.getItem(THEME_KEY) || DARK_THEME;
    } catch (e) { }

    applyTheme(savedTheme);

    if (themeCheckbox) {
      themeCheckbox.checked = (savedTheme === DARK_THEME);
    }
  })();

  /* Toggle affects ALL pages */
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', (e) => {
      const theme = e.target.checked ? DARK_THEME : LIGHT_THEME;
      applyTheme(theme);

      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) { }
    });
  }

  /* Cross-page / cross-tab sync */
  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_KEY) return;
    const newTheme = event.newValue || LIGHT_THEME;
    applyTheme(newTheme);
    if (themeCheckbox) {
      themeCheckbox.checked = (newTheme === DARK_THEME);
    }
  });

  /* --------------------------
     Accessibility: menu toggles
     -------------------------- */
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const featuresBtn = document.getElementById('features-button');
  const featuresMenu = document.getElementById('features-menu');

  const toggleElement = (btn, el) => {
    if (!btn || !el) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    el.classList.toggle('hidden');
  };

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => toggleElement(mobileBtn, mobileMenu));
  }
  if (featuresBtn && featuresMenu) {
    featuresBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleElement(featuresBtn, featuresMenu); });
  }
  document.addEventListener('pointerdown', (ev) => {
    const t = ev.target;
    if (featuresMenu && featuresBtn && !featuresMenu.contains(t) && !featuresBtn.contains(t)) {
      featuresBtn.setAttribute('aria-expanded', 'false'); featuresMenu.classList.add('hidden');
    }
    if (mobileMenu && mobileBtn && !mobileMenu.contains(t) && !mobileBtn.contains(t)) {
      mobileBtn.setAttribute('aria-expanded', 'false'); mobileMenu.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      mobileBtn?.setAttribute('aria-expanded', 'false'); mobileMenu?.classList.add('hidden');
      featuresBtn?.setAttribute('aria-expanded', 'false'); featuresMenu?.classList.add('hidden');
    }
  });

  /* --------------------------
     Microinteraction: ripple on .btn
     -------------------------- */
  function createRipple(ev, target) {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const r = document.createElement('span');
    r.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 1.8;
    r.style.width = r.style.height = size + 'px';

    const left = (ev.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const top = (ev.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    r.style.left = left + 'px';
    r.style.top = top + 'px';

    target.appendChild(r);
    r.addEventListener('animationend', () => r.remove(), { once: true });
  }

  document.addEventListener('pointerdown', (ev) => {
    const btn = ev.target.closest?.('.btn');
    if (btn) {
      createRipple(ev, btn);
    }
  });
});