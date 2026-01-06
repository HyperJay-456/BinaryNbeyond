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
<nav class="navbar shadow-sm p-3" aria-label="Main navigation">
  <div class="navbar-start">
    <button id="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu"
            class="btn btn-ghost lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    </button>
    <a class="btn btn-ghost text-xl" href="/" aria-label="ConverTo homepage">ConverTo</a>
  </div>

  <div id="mobile-menu" class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1" role="menubar" aria-label="Primary navigation">
      <li role="none"><a role="menuitem" href="/" class="px-2">Home</a></li>
      <li role="none"><a role="menuitem" href="/team.html" class="px-2">Team</a></li>
      <li role="none" class="relative">
        <button id="features-button" aria-expanded="false" aria-controls="features-menu" aria-haspopup="true">Features</button>
        <ul id="features-menu" role="menu" class="p-2 bg-base-100 w-40 z-50 hidden absolute mt-2 rounded-box shadow">
          <li role="none"><a role="menuitem" href="/arithmetic.html" class="block px-2 py-1">Arithmetic</a></li>
          <li role="none"><a role="menuitem" href="/bitwise.html" class="block px-2 py-1">Bitwise</a></li>
          <li role="none"><a role="menuitem" href="/numberConversions.html" class="block px-2 py-1">Number Conversions</a></li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="navbar-end">
    <label class="flex cursor-pointer gap-2 items-center" for="theme-toggle">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>

      <input id="theme-toggle" type="checkbox" class="toggle theme-controller" aria-label="Toggle theme" />
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  </div>
</nav>
`;

  const FOOTER_HTML = `
<footer class="footer sm:footer-horizontal bg-base-400 text-base-content p-6 mt-8" aria-label="Site footer">
  <nav>
    <h6 class="footer-title">Services</h6>
    <a class="link link-hover" href="/branding.html">Branding</a>
    <a class="link link-hover" href="/design.html">Design</a>
    <a class="link link-hover" href="/marketing.html">Marketing</a>
  </nav>
  <nav>
    <h6 class="footer-title">Company</h6>
    <a class="link link-hover" href="/about.html">About us</a>
    <a class="link link-hover" href="/contact.html">Contact</a>
  </nav>
  <nav>
    <h6 class="footer-title">Social</h6>
    <div class="grid grid-flow-col gap-4">
      <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter">Twitter</a>
      <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="YouTube">YouTube</a>
      <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
    </div>
  </nav>
</footer>
`;

  const navContainer = document.getElementById('navbar');
  const footerContainer = document.getElementById('footer');
  if (navContainer) navContainer.innerHTML = NAV_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;


  /* --------------------------
     Global Theme Sync (ALL PAGES)
     -------------------------- */
  const THEME_KEY = 'site-theme';
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'synthwave';
  const themeCheckbox = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  /* ✅ Apply theme on EVERY page load */
  (function initTheme() {
    let savedTheme = LIGHT_THEME;

    try {
      savedTheme = localStorage.getItem(THEME_KEY) || LIGHT_THEME;
    } catch (e) { }

    applyTheme(savedTheme);

    if (themeCheckbox) {
      themeCheckbox.checked = (savedTheme === DARK_THEME);
    }
  })();

  /* ✅ Toggle affects ALL pages */
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', (e) => {
      const theme = e.target.checked ? DARK_THEME : LIGHT_THEME;
      applyTheme(theme);

      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) { }
    });
  }


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

    // pointer coordinates -> position ripple so its center matches input
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
      // only ripple for primary/touchable buttons
      createRipple(ev, btn);
    }
  });

  /* --------------------------
     Result animation helper
     -------------------------- */
  function animateResult(el, text) {
    if (!el) return;
    // small bailout if same text
    if (el.textContent.trim() === String(text).trim()) {
      // still pulse a little
      el.classList.remove('result-pulse');
      void el.offsetWidth;
      el.classList.add('result-pulse');
      return;
    }

    // fade/scale replacement
    el.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      el.textContent = text;
      el.classList.remove('opacity-0', 'scale-95');
      el.classList.remove('result-pulse');
      void el.offsetWidth; // force reflow
      el.classList.add('result-pulse');
      // remove class after animation
      setTimeout(() => el.classList.remove('result-pulse'), 500);
    }, 80);
  }

  /* --------------------------
     Input validation + keyboard binding
     -------------------------- */
  const numberSystem = document.getElementById('numberSystem');
  const num1 = document.getElementById('num1');
  const num2 = document.getElementById('num2');
  const arithResult = document.getElementById('arithResult');
  const arithSteps = document.getElementById('arithSteps');
  const arithError = document.getElementById('arithError');

  function setError(msg) {
    if (arithError) arithError.textContent = msg || '';
  }

  function sanitizeBinaryString(s) {
    return (s || '').replace(/[^01]/g, '');
  }
  function sanitizeDecimalString(s) {
    return (s || '').replace(/[^\d\.\-]/g, '');
  }

  function validateInputs() {
    setError('');
    if (!num1 || !num2 || !numberSystem) return false;
    const system = numberSystem.value;
    let a = num1.value.trim();
    let b = num2.value.trim();

    if (system === 'binary') {
      a = sanitizeBinaryString(a);
      b = sanitizeBinaryString(b);
      if (a === '' || b === '') { setError('Please enter valid binary numbers.'); return null; }
      return { a, b, system };
    } else {
      // decimal: allow negative and decimal point
      a = sanitizeDecimalString(a);
      b = sanitizeDecimalString(b);
      if (a === '' || b === '') { setError('Please enter valid decimal numbers.'); return null; }
      return { a, b, system };
    }
  }

  // live input sanitization (avoid jarring behavior; only sanitize on input but keep caret default)
  if (num1) num1.addEventListener('input', (e) => {
    const v = num1.value;
    if (numberSystem.value === 'binary') {
      const cleaned = sanitizeBinaryString(v);
      if (cleaned !== v) num1.value = cleaned;
    } else {
      const cleaned = sanitizeDecimalString(v);
      if (cleaned !== v) num1.value = cleaned;
    }
  });
  if (num2) num2.addEventListener('input', (e) => {
    const v = num2.value;
    if (numberSystem.value === 'binary') {
      const cleaned = sanitizeBinaryString(v);
      if (cleaned !== v) num2.value = cleaned;
    } else {
      const cleaned = sanitizeDecimalString(v);
      if (cleaned !== v) num2.value = cleaned;
    }
  });

  // Enter key triggers calculation when focused in inputs
  [num1, num2].forEach((inp) => {
    if (!inp) return;
    inp.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        doCalculate();
      }
    });
  });

  /* --------------------------
     Wire up data-action buttons
     -------------------------- */
  function doCalculate() {
    // call existing performArithmetic() if it's present; otherwise perform a minimal fallback
    const validated = validateInputs();
    if (!validated) return;
    // call global function if present (your arithmetic.js should define this)
    if (typeof window.performArithmetic === 'function') {
      try {
        // The existing function likely sets arithResult and arithSteps itself.
        // But to ensure animation we intercept the result element after it runs.
        window.performArithmetic(); // expected to update #arithResult, #arithSteps
        // animate whatever got written
        setTimeout(() => {
          animateResult(arithResult, arithResult?.textContent ?? '');
        }, 40);
      } catch (err) {
        setError('Calculation failed.');
        console.error(err);
      }
    } else {
      // Minimal fallback implementation (decimal only)
      try {
        const op = document.getElementById('operation')?.value || 'add';
        let a = Number(validated.a);
        let b = Number(validated.b);
        let res;
        switch (op) {
          case 'add': res = a + b; break;
          case 'sub': res = a - b; break;
          case 'mul': res = a * b; break;
          case 'div': res = b === 0 ? '∞' : (a / b); break;
        }
        animateResult(arithResult, String(res));
      } catch (err) {
        setError('Calculation failed.');
      }
    }
  }

  function clearInputs() {
    if (num1) num1.value = '';
    if (num2) num2.value = '';
    if (arithResult) arithResult.textContent = '';
    if (arithSteps) arithSteps.innerHTML = '';
    setError('');
  }

  // Practice mode bindings (call into your global functions if present)
  function newQuestion() {
    if (typeof window.generateArithmeticPractice === 'function') {
      window.generateArithmeticPractice();
      const q = document.getElementById('arithPracticeQuestion');
      // small visual hint
      if (q) { q.classList.add('result-pulse'); setTimeout(() => q.classList.remove('result-pulse'), 450); }
    }
  }
  function checkAnswer() {
    if (typeof window.checkArithmeticPractice === 'function') {
      window.checkArithmeticPractice();
      const r = document.getElementById('arithPracticeResult');
      if (r) { r.classList.add('result-pulse'); setTimeout(() => r.classList.remove('result-pulse'), 500); }
    }
  }
  function showSteps() {
    if (typeof window.showArithmeticPracticeSteps === 'function') {
      window.showArithmeticPracticeSteps();
      const s = document.getElementById('arithPracticeSteps');
      if (s) { s.classList.add('result-pulse'); setTimeout(() => s.classList.remove('result-pulse'), 600); }
    }
  }

  // Delegated click listener for data-action
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest?.('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    if (!action) return;
    switch (action) {
      case 'calculate': doCalculate(); break;
      case 'clear-inputs': clearInputs(); break;
      case 'new-question': newQuestion(); break;
      case 'check-answer': checkAnswer(); break;
      case 'show-steps': showSteps(); break;
      default: break;
    }
  });

  // also support pressing Enter on practice answer input to check
  const practiceAnswer = document.getElementById('arithPracticeAnswer');
  if (practiceAnswer) {
    practiceAnswer.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') { ev.preventDefault(); checkAnswer(); }
    });
  }

  /* --------------------------
     Small polish: show placeholder state when awaiting result
     -------------------------- */
  const resultObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList') {
        // pulse when result changes
        const el = m.target;
        if (el && el.classList) {
          el.classList.remove('result-pulse');
          void el.offsetWidth;
          el.classList.add('result-pulse');
          setTimeout(() => el.classList.remove('result-pulse'), 600);
        }
      }
    }
  });
  if (arithResult) resultObserver.observe(arithResult, { childList: true });

  /* --------------------------
     End of script
     -------------------------- */
});
