// js/bitwise/bitwise.js
// Self-contained bitwise logic that updates DOM and exposes practice helpers.
// Designed to match the arithmetic page theme and work alongside js/script.js.

(function () {
  /* --- Utilities --- */
  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function parseBinary(s) {
    const clean = String(s || '').replace(/[^01]/g, '');
    return clean === '' ? NaN : parseInt(clean, 2);
  }

  function parseDecimalInt(s) {
    const n = Number(String(s || '').trim());
    return Number.isFinite(n) ? Math.trunc(n) : NaN;
  }

  function toBinary32(n) {
    if (!Number.isFinite(n)) return String(n);
    return (n >>> 0).toString(2);
  }

  function padBits(a, b, min = 8) {
    const maxLen = Math.max(String(a).length, String(b).length, min);
    return [String(a).padStart(maxLen, '0'), String(b).padStart(maxLen, '0')];
  }

  function writeStepsHtml(htmlParts) {
    const el = document.getElementById('bitwiseSteps');
    if (!el) return;
    el.innerHTML = htmlParts.map(p => `<p>${p}</p>`).join('');
  }

  function setResultText(text) {
    const el = document.getElementById('bitwiseResult');
    if (!el) return;
    el.textContent = text;
    el.classList.remove('result-pulse');
    void el.offsetWidth;
    el.classList.add('result-pulse');
    setTimeout(() => el.classList.remove('result-pulse'), 600);
  }

  function setErrorText(msg) {
    const el = document.getElementById('bitwiseError');
    if (!el) return;
    el.textContent = msg || '';
  }

  /* --- Main calculation --- */
  function performBitwise() {
    setErrorText('');
    const system = document.getElementById('bitwiseSystem')?.value || 'binary';
    const op = document.getElementById('bitwiseOperation')?.value || 'and';
    const aRaw = document.getElementById('bitwiseNum1')?.value ?? '';
    const bRaw = document.getElementById('bitwiseNum2')?.value ?? '';

    const steps = [];

    let aNum, bNum;

    if (system === 'binary') {
      aNum = parseBinary(aRaw);
      bNum = parseBinary(bRaw);
      if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
        setErrorText('Enter valid binary numbers (only 0 and 1).');
        writeStepsHtml([]);
        setResultText('');
        return;
      }
      steps.push(`Interpret inputs as binary: ${esc(aRaw)}₂ → ${aNum}₁₀, ${esc(bRaw)}₂ → ${bNum}₁₀`);
    } else {
      aNum = parseDecimalInt(aRaw);
      bNum = parseDecimalInt(bRaw);
      if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
        setErrorText('Enter valid decimal integers.');
        writeStepsHtml([]);
        setResultText('');
        return;
      }
      steps.push(`Inputs (decimal): ${aNum}, ${bNum}. Convert to binary for bitwise operation.`);
    }

    // Use unsigned 32-bit semantics for predictable bitwise operations
    const a32 = aNum >>> 0;
    const b32 = bNum >>> 0;
    let raw;
    switch (op) {
      case 'and': raw = a32 & b32; steps.push(`Operation: ${a32} & ${b32}`); break;
      case 'or': raw = a32 | b32; steps.push(`Operation: ${a32} | ${b32}`); break;
      case 'xor': raw = a32 ^ b32; steps.push(`Operation: ${a32} ^ ${b32}`); break;
      default: setErrorText('Unknown operation'); return;
    }

    // Build binary explanation
    const aBin = toBinary32(a32);
    const bBin = toBinary32(b32);
    const [aPad, bPad] = padBits(aBin, bBin, 8);
    const resBin = raw.toString(2).padStart(Math.max(aPad.length, bPad.length), '0');

    steps.push('<strong>Binary representation:</strong>');
    steps.push(`<div class="bit-row"><span class="bit-badge">A</span> ${esc(aPad)}</div>`);
    steps.push(`<div class="bit-row"><span class="bit-badge">B</span> ${esc(bPad)}</div>`);
    steps.push(`<div class="bit-row"><span class="bit-badge">R</span> ${esc(resBin)}</div>`);

    // Per-bit mapping
    const perBitParts = [];
    for (let i = 0; i < resBin.length; i++) {
      const ai = aPad[i];
      const bi = bPad[i];
      const ri = resBin[i];
      perBitParts.push(`<code style="margin-right:8px">${ai}${bi}→${ri}</code>`);
    }
    steps.push(`<div><strong>Per bit (A B → R):</strong></div><div>${perBitParts.join('')}</div>`);

    steps.push(`Decimal result: ${raw}`);
    steps.push(`Binary result: ${resBin}₂`);

    writeStepsHtml(steps);
    setResultText(`${raw} (decimal) — ${resBin}₂`);
    return { raw, resBin, steps };
  }

  /* --- Practice helpers --- */
  function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  function generateBitwisePractice() {
    const diff = document.getElementById('bitwiseDifficulty')?.value || 'easy';
    let max = 15;
    if (diff === 'medium') max = 63;
    if (diff === 'hard') max = 255;

    const a = rnd(0, max);
    const b = rnd(0, max);
    const ops = ['AND', 'OR', 'XOR'];
    const op = ops[Math.floor(Math.random() * ops.length)];

    const qEl = document.getElementById('bitwisePracticeQuestion');
    const stepsEl = document.getElementById('bitwisePracticeSteps');
    const resEl = document.getElementById('bitwisePracticeResult');

    if (qEl) qEl.textContent = `Question: ${a} ${op} ${b}`;
    if (stepsEl) stepsEl.innerHTML = '';
    if (resEl) resEl.textContent = '';

    let answer;
    switch (op) {
      case 'AND': answer = (a & b) >>> 0; break;
      case 'OR': answer = (a | b) >>> 0; break;
      case 'XOR': answer = (a ^ b) >>> 0; break;
    }
    window.__bitwisePractice = { a, b, op, answer };
  }

  function checkBitwisePractice() {
    const usr = document.getElementById('bitwisePracticeAnswer')?.value ?? '';
    const resEl = document.getElementById('bitwisePracticeResult');
    const stepsEl = document.getElementById('bitwisePracticeSteps');

    if (!window.__bitwisePractice) {
      if (resEl) resEl.textContent = 'No active question. Click "New Question".';
      return;
    }

    const correct = window.__bitwisePractice.answer;
    const parsed = Number(usr);
    const ok = !Number.isNaN(parsed) && parsed === correct;
    if (resEl) resEl.textContent = ok ? 'Correct ✅' : `Incorrect — correct answer is ${correct}`;
    if (stepsEl) {
      const a = window.__bitwisePractice.a, b = window.__bitwisePractice.b, op = window.__bitwisePractice.op;
      const aBin = (a >>> 0).toString(2);
      const bBin = (b >>> 0).toString(2);
      const [aP, bP] = padBits(aBin, bBin, 8);
      const resBin = correct.toString(2).padStart(Math.max(aP.length, bP.length), '0');
      const steps = [
        `Compute ${a} ${op} ${b}`,
        `<div class="bit-row"><span class="bit-badge">A</span> ${esc(aP)}</div>`,
        `<div class="bit-row"><span class="bit-badge">B</span> ${esc(bP)}</div>`,
        `<div class="bit-row"><span class="bit-badge">R</span> ${esc(resBin)}</div>`,
        `Decimal result: ${correct}`,
        `Binary result: ${resBin}₂`
      ];
      stepsEl.innerHTML = steps.map(s => `<p>${s}</p>`).join('');
    }
  }

  function showBitwisePracticeSteps() {
    if (!window.__bitwisePractice) return;
    const stepsEl = document.getElementById('bitwisePracticeSteps');
    if (!stepsEl) return;
    const a = window.__bitwisePractice.a;
    const b = window.__bitwisePractice.b;
    const op = window.__bitwisePractice.op;
    const ans = window.__bitwisePractice.answer;
    const aBin = (a >>> 0).toString(2);
    const bBin = (b >>> 0).toString(2);
    const [aP, bP] = padBits(aBin, bBin, 8);
    const resBin = ans.toString(2).padStart(Math.max(aP.length, bP.length), '0');
    const steps = [
      `Evaluate: ${a} ${op} ${b}`,
      `<div class="bit-row"><span class="bit-badge">A</span> ${esc(aP)}</div>`,
      `<div class="bit-row"><span class="bit-badge">B</span> ${esc(bP)}</div>`,
      `<div class="bit-row"><span class="bit-badge">R</span> ${esc(resBin)}</div>`,
      `Decimal result: ${ans}`,
      `Binary result: ${resBin}₂`
    ];
    stepsEl.innerHTML = steps.map(s => `<p>${s}</p>`).join('');
  }

  /* --- Event wiring (delegated) --- */
  function onActionClick(ev) {
    const btn = ev.target.closest?.('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    switch (action) {
      case 'bitwise-calc': performBitwise(); break;
      case 'bitwise-clear':
        document.getElementById('bitwiseNum1').value = '';
        document.getElementById('bitwiseNum2').value = '';
        document.getElementById('bitwiseResult').textContent = '';
        document.getElementById('bitwiseSteps').innerHTML = '';
        document.getElementById('bitwiseError').textContent = '';
        break;
      case 'bitwise-new-question': generateBitwisePractice(); break;
      case 'bitwise-check-answer': checkBitwisePractice(); break;
      case 'bitwise-show-steps': showBitwisePracticeSteps(); break;
      default: break;
    }
  }

  document.addEventListener('click', onActionClick);

  // Enter key behavior for inputs
  ['bitwiseNum1', 'bitwiseNum2'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); performBitwise(); }
    });
  });
  const practiceAnswer = document.getElementById('bitwisePracticeAnswer');
  if (practiceAnswer) {
    practiceAnswer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); checkBitwisePractice(); }
    });
  }

  /* --- Expose for other scripts / testing --- */
  window.performBitwise = performBitwise;
  window.generateBitwisePractice = generateBitwisePractice;
  window.checkBitwisePractice = checkBitwisePractice;
  window.showBitwisePracticeSteps = showBitwisePracticeSteps;
})();