// js/index.js — small micro-interactions for index page
document.addEventListener('DOMContentLoaded', () => {
  // rotating phrases
  const phrases = [
    'Arithmetic Calculations',
    'Bitwise Operations',
    'Number Conversions',
    'Step-by-step explanations',
    'Interactive practice mode'
  ];
  const rotEl = document.getElementById('rotatingText');
  let idx = 0;
  const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rotateOnce() {
    if (!rotEl) return;
    if (prefersReduce) {
      rotEl.textContent = phrases[0];
      return;
    }
    rotEl.style.opacity = 0;
    rotEl.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      idx = (idx + 1) % phrases.length;
      rotEl.textContent = phrases[idx];
      rotEl.style.opacity = 1;
      rotEl.style.transform = 'translateY(0)';
    }, 280);
  }
  // start after small delay and rotate every 2200ms
  setTimeout(() => { rotateOnce(); setInterval(rotateOnce, 2200); }, 600);

  // reveal animations using IntersectionObserver
  const reveals = document.querySelectorAll('.hero-card, .tiles .tile');
  if (!prefersReduce && window.IntersectionObserver) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal', 'show');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('show'));
  }

  // ripple effect for elements with [data-ripple]
  document.addEventListener('pointerdown', (ev) => {
    const btn = ev.target.closest?.('[data-ripple]');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const r = document.createElement('span');
    r.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 1.8;
    r.style.width = r.style.height = size + 'px';
    const left = (ev.clientX || rect.left + rect.width/2) - rect.left - size/2;
    const top = (ev.clientY || rect.top + rect.height/2) - rect.top - size/2;
    r.style.left = left + 'px';
    r.style.top = top + 'px';
    r.style.background = btn.getAttribute('data-ripple-color') || getComputedStyle(btn).getPropertyValue('--ripple-color') || 'rgba(255,255,255,0.12)';
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove(), { once: true });
  });

  // tile click / keyboard accessible
  document.querySelectorAll('.tile[data-href]').forEach(tile => {
    tile.addEventListener('click', () => { const href = tile.dataset.href; if (href) location.href = href; });
    tile.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tile.click(); } });
    // tilt effect
    if (!prefersReduce) {
      tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const dx = (e.clientX - rect.left) / rect.width - 0.5;
        const dy = (e.clientY - rect.top) / rect.height - 0.5;
        const tx = dx * 6; const ty = -dy * 6;
        tile.style.transform = `perspective(800px) rotateX(${ty}deg) rotateY(${tx}deg) translateZ(6px)`;
      });
      tile.addEventListener('mouseleave', () => { tile.style.transform = ''; });
    }
  });

  // update year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});