// js/bitwise/bitwise.js
// Self-contained bitwise logic that updates DOM and exposes practice helpers.
// Supports AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), and Right Shift (>>).

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

  /* --- Core Bitwise Calculation (Pure) --- */
  function computeBitwise(op, aNum, bNum = 0, wordSize = 8) {
    const a32 = (aNum >>> 0);
    const b32 = (bNum >>> 0);
    let raw;
    let desc;

    switch (op) {
      case 'and':
        raw = (a32 & b32) >>> 0;
        desc = `${a32} & ${b32}`;
        break;
      case 'or':
        raw = (a32 | b32) >>> 0;
        desc = `${a32} | ${b32}`;
        break;
      case 'xor':
        raw = (a32 ^ b32) >>> 0;
        desc = `${a32} ^ ${b32}`;
        break;
      case 'not': {
        const mask = (1 << wordSize) - 1;
        raw = ((~a32) & mask) >>> 0;
        desc = `~${a32} (${wordSize}-bit mask: ${mask})`;
        break;
      }
      case 'shl': {
        const shiftAmt = b32 & 31;
        raw = (a32 << shiftAmt) >>> 0;
        desc = `${a32} << ${shiftAmt}`;
        break;
      }
      case 'shr': {
        const shiftAmt = b32 & 31;
        raw = (a32 >>> shiftAmt) >>> 0;
        desc = `${a32} >>> ${shiftAmt}`;
        break;
      }
      default:
        throw new Error(`Unknown bitwise operation: ${op}`);
    }

    return { raw, desc, a32, b32 };
  }

  /* --- Main calculation UI Handler --- */
  function performBitwise() {
    setErrorText('');
    const system = document.getElementById('bitwiseSystem')?.value || 'binary';
    const op = document.getElementById('bitwiseOperation')?.value || 'and';
    const aRaw = document.getElementById('bitwiseNum1')?.value ?? '';
    const bRaw = document.getElementById('bitwiseNum2')?.value ?? '';

    const steps = [];
    let aNum, bNum = 0;

    if (system === 'binary') {
      aNum = parseBinary(aRaw);
      if (Number.isNaN(aNum)) {
        setErrorText('Enter a valid first binary number (only 0 and 1).');
        writeStepsHtml([]);
        setResultText('');
        return;
      }
      if (op !== 'not') {
        bNum = parseBinary(bRaw);
        if (Number.isNaN(bNum)) {
          setErrorText('Enter a valid second binary number (only 0 and 1).');
          writeStepsHtml([]);
          setResultText('');
          return;
        }
        steps.push(`Interpret inputs as binary: ${esc(aRaw)}₂ → ${aNum}₁₀, ${esc(bRaw)}₂ → ${bNum}₁₀`);
      } else {
        steps.push(`Interpret input as binary: ${esc(aRaw)}₂ → ${aNum}₁₀`);
      }
    } else {
      aNum = parseDecimalInt(aRaw);
      if (Number.isNaN(aNum)) {
        setErrorText('Enter a valid first decimal integer.');
        writeStepsHtml([]);
        setResultText('');
        return;
      }
      if (op !== 'not') {
        bNum = parseDecimalInt(bRaw);
        if (Number.isNaN(bNum)) {
          setErrorText('Enter a valid second decimal integer.');
          writeStepsHtml([]);
          setResultText('');
          return;
        }
        steps.push(`Inputs (decimal): ${aNum}, ${bNum}. Convert to binary for bitwise operation.`);
      } else {
        steps.push(`Input (decimal): ${aNum}. Convert to binary for bitwise NOT operation.`);
      }
    }

    const aBin = toBinary32(aNum);
    const wordSize = Math.max(8, aBin.length);
    const { raw, desc, a32, b32 } = computeBitwise(op, aNum, bNum, wordSize);
    steps.push(`Operation: ${desc}`);

    if (op === 'not') {
      const aPad = aBin.padStart(wordSize, '0');
      const resBin = raw.toString(2).padStart(wordSize, '0');

      steps.push('<strong>Binary representation (inverting each bit):</strong>');
      steps.push(`<div class="bit-row"><span class="bit-badge">A</span> ${esc(aPad)}</div>`);
      steps.push(`<div class="bit-row"><span class="bit-badge">~A</span> ${esc(resBin)}</div>`);

      const perBitParts = [];
      for (let i = 0; i < wordSize; i++) {
        perBitParts.push(`<code style="margin-right:8px">${aPad[i]}→${resBin[i]}</code>`);
      }
      steps.push(`<div><strong>Per bit inversion (A → ~A):</strong></div><div>${perBitParts.join('')}</div>`);
      steps.push(`Decimal result: ${raw}`);
      steps.push(`Binary result: ${resBin}₂`);

      writeStepsHtml(steps);
      setResultText(`${raw} (decimal) — ${resBin}₂`);
      return { raw, resBin, steps };
    }

    if (op === 'shl' || op === 'shr') {
      const shiftAmt = b32 & 31;
      const aPad = aBin.padStart(Math.max(8, aBin.length), '0');
      const resBin = raw.toString(2).padStart(Math.max(8, aBin.length), '0');

      steps.push(`<strong>Binary Shift (${op === 'shl' ? 'Left' : 'Right'} by ${shiftAmt} positions):</strong>`);
      steps.push(`<div class="bit-row"><span class="bit-badge">A</span> ${esc(aPad)}</div>`);
      steps.push(`<div class="bit-row"><span class="bit-badge">R</span> ${esc(resBin)}</div>`);
      steps.push(`Decimal result: ${raw}`);
      steps.push(`Binary result: ${resBin}₂`);

      writeStepsHtml(steps);
      setResultText(`${raw} (decimal) — ${resBin}₂`);
      return { raw, resBin, steps };
    }

    // AND, OR, XOR
    const bBin = toBinary32(b32);
    const [aPad, bPad] = padBits(aBin, bBin, 8);
    const resBin = raw.toString(2).padStart(Math.max(aPad.length, bPad.length), '0');

    steps.push('<strong>Binary representation:</strong>');
    steps.push(`<div class="bit-row"><span class="bit-badge">A</span> ${esc(aPad)}</div>`);
    steps.push(`<div class="bit-row"><span class="bit-badge">B</span> ${esc(bPad)}</div>`);
    steps.push(`<div class="bit-row"><span class="bit-badge">R</span> ${esc(resBin)}</div>`);

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

    const a = rnd(1, max);
    const b = rnd(1, Math.min(max, 15));
    const ops = ['AND', 'OR', 'XOR', 'NOT', '<<', '>>'];
    const op = ops[Math.floor(Math.random() * ops.length)];

    const qEl = document.getElementById('bitwisePracticeQuestion');
    const stepsEl = document.getElementById('bitwisePracticeSteps');
    const resEl = document.getElementById('bitwisePracticeResult');

    let questionText = `Question: ${a} ${op} ${b}`;
    let answer;

    if (op === 'NOT') {
      questionText = `Question: NOT (${a}) [8-bit representation]`;
      answer = ((~a) & 0xFF) >>> 0;
    } else if (op === '<<') {
      const shift = Math.min(b, 4);
      questionText = `Question: ${a} << ${shift}`;
      answer = (a << shift) >>> 0;
    } else if (op === '>>') {
      const shift = Math.min(b, 4);
      questionText = `Question: ${a} >> ${shift}`;
      answer = (a >>> shift) >>> 0;
    } else if (op === 'AND') {
      answer = (a & b) >>> 0;
    } else if (op === 'OR') {
      answer = (a | b) >>> 0;
    } else {
      answer = (a ^ b) >>> 0;
    }

    if (qEl) qEl.textContent = questionText;
    if (stepsEl) stepsEl.innerHTML = '';
    if (resEl) resEl.textContent = '';

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
    const parsed = Number(usr.trim());
    const ok = !Number.isNaN(parsed) && parsed === correct;
    if (resEl) resEl.textContent = ok ? 'Correct ✅' : `Incorrect — correct answer is ${correct}`;
    if (stepsEl) {
      const { a, b, op } = window.__bitwisePractice;
      stepsEl.innerHTML = `<p>Result for ${a} ${op} ${op === 'NOT' ? '' : b} = <strong>${correct}</strong> (binary: ${(correct >>> 0).toString(2)}₂)</p>`;
    }
  }

  function showBitwisePracticeSteps() {
    if (!window.__bitwisePractice) return;
    const stepsEl = document.getElementById('bitwisePracticeSteps');
    if (!stepsEl) return;
    const { a, b, op, answer } = window.__bitwisePractice;
    const aBin = (a >>> 0).toString(2).padStart(8, '0');
    const resBin = (answer >>> 0).toString(2).padStart(8, '0');

    const steps = [
      `Evaluate: ${a} ${op} ${op === 'NOT' ? '' : b}`,
      `<div class="bit-row"><span class="bit-badge">A</span> ${esc(aBin)}</div>`,
      `<div class="bit-row"><span class="bit-badge">R</span> ${esc(resBin)}</div>`,
      `Decimal result: ${answer}`,
      `Binary result: ${resBin}₂`
    ];
    stepsEl.innerHTML = steps.map(s => `<p>${s}</p>`).join('');
  }

  /* --- Event wiring --- */
  function onActionClick(ev) {
    const btn = ev.target.closest?.('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    switch (action) {
      case 'bitwise-calc': performBitwise(); break;
      case 'bitwise-clear':
        const n1 = document.getElementById('bitwiseNum1');
        const n2 = document.getElementById('bitwiseNum2');
        const res = document.getElementById('bitwiseResult');
        const steps = document.getElementById('bitwiseSteps');
        const err = document.getElementById('bitwiseError');
        if (n1) n1.value = '';
        if (n2) n2.value = '';
        if (res) res.textContent = '';
        if (steps) steps.innerHTML = '';
        if (err) err.textContent = '';
        break;
      case 'bitwise-swap': {
        const n1 = document.getElementById('bitwiseNum1');
        const n2 = document.getElementById('bitwiseNum2');
        if (n1 && n2 && !n2.disabled) {
          const temp = n1.value;
          n1.value = n2.value;
          n2.value = temp;
          if (n1.value || n2.value) performBitwise();
        }
        break;
      }
      case 'bitwise-new-question': generateBitwisePractice(); break;
      case 'bitwise-check-answer': checkBitwisePractice(); break;
      case 'bitwise-show-steps': showBitwisePracticeSteps(); break;
      default: break;
    }
  }

  /* --- Event wiring --- */
  if (typeof document !== 'undefined') {
    document.addEventListener('click', onActionClick);

    // Quick presets handler
    document.querySelectorAll('[data-bit-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = btn.getAttribute('data-bit-preset');
        const sys = document.getElementById('bitwiseSystem');
        const op = document.getElementById('bitwiseOperation');
        const n1 = document.getElementById('bitwiseNum1');
        const n2 = document.getElementById('bitwiseNum2');
        if (!sys || !op || !n1 || !n2) return;
        sys.value = 'decimal';
        if (p === 'and') { op.value = 'and'; n1.value = '12'; n2.value = '10'; }
        else if (p === 'or') { op.value = 'or'; n1.value = '12'; n2.value = '10'; }
        else if (p === 'xor') { op.value = 'xor'; n1.value = '12'; n2.value = '10'; }
        else if (p === 'not') { op.value = 'not'; n1.value = '5'; n2.value = ''; }
        else if (p === 'shl') { op.value = 'shl'; n1.value = '5'; n2.value = '2'; }
        op.dispatchEvent(new Event('change'));
        performBitwise();
      });
    });

    // Toggle second number input when operation is 'not'
    const opSelect = document.getElementById('bitwiseOperation');
    if (opSelect) {
      opSelect.addEventListener('change', () => {
        const num2Container = document.getElementById('bitwiseNum2')?.closest('div');
        const num2Input = document.getElementById('bitwiseNum2');
        const swapBtn = document.getElementById('bitwiseSwapBtn');
        if (opSelect.value === 'not') {
          if (num2Input) num2Input.disabled = true;
          if (num2Container) num2Container.style.opacity = '0.4';
          if (swapBtn) swapBtn.disabled = true;
        } else {
          if (num2Input) num2Input.disabled = false;
          if (num2Container) num2Container.style.opacity = '1';
          if (swapBtn) swapBtn.disabled = false;
        }
      });
    }

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
  }

  /* --- Expose for testing & global use --- */
  if (typeof window !== 'undefined') {
    window.performBitwise = performBitwise;
    window.computeBitwise = computeBitwise;
    window.generateBitwisePractice = generateBitwisePractice;
    window.checkBitwisePractice = checkBitwisePractice;
    window.showBitwisePracticeSteps = showBitwisePracticeSteps;
  }
})();

if (typeof module !== 'undefined' && module.exports) {
  // Pure compute helper for node tests
  function computeBitwise(op, aNum, bNum = 0, wordSize = 8) {
    const a32 = (aNum >>> 0);
    const b32 = (bNum >>> 0);
    switch (op) {
      case 'and': return { raw: (a32 & b32) >>> 0 };
      case 'or': return { raw: (a32 | b32) >>> 0 };
      case 'xor': return { raw: (a32 ^ b32) >>> 0 };
      case 'not': return { raw: ((~a32) & ((1 << wordSize) - 1)) >>> 0 };
      case 'shl': return { raw: (a32 << (b32 & 31)) >>> 0 };
      case 'shr': return { raw: (a32 >>> (b32 & 31)) >>> 0 };
      default: throw new Error(`Unknown operation ${op}`);
    }
  }
  module.exports = { computeBitwise };
}