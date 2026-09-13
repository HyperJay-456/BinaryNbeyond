document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("number-system-form");
  const errorOutput = document.getElementById("errorOutput");

  // Prevent form submit refresh
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof convertNumber === "function") convertNumber();
    });
  }

  // Enter key on conversion input
  const inputNumber = document.getElementById("inputNumber");
  if (inputNumber) {
    inputNumber.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof convertNumber === "function") convertNumber();
      }
    });
  }

  // Simultaneous all-bases glance row updater
  function updateAllBasesGlance() {
    const input = document.getElementById("inputNumber")?.value.trim();
    const fromBase = document.getElementById("fromBase")?.value;
    const allBasesRow = document.getElementById("allBasesRow");
    const gBin = document.getElementById("glanceBin");
    const gOct = document.getElementById("glanceOct");
    const gDec = document.getElementById("glanceDec");
    const gHex = document.getElementById("glanceHex");

    if (!allBasesRow) return;

    if (!input || !fromBase || (typeof validateInput === "function" && !validateInput(input, fromBase))) {
      allBasesRow.classList.add("hidden");
      return;
    }

    try {
      if (typeof baseToDecimal === "function" && typeof decimalToBase === "function") {
        const toDec = baseToDecimal(input, fromBase);
        if (toDec && toDec.result !== undefined && toDec.result !== null) {
          const decVal = toDec.result;
          const bin = decimalToBase(decVal, "binary").result;
          const oct = decimalToBase(decVal, "octal").result;
          const hex = decimalToBase(decVal, "hexadecimal").result;

          if (gBin) gBin.innerText = bin;
          if (gOct) gOct.innerText = oct;
          if (gDec) gDec.innerText = String(decVal);
          if (gHex) gHex.innerText = hex;
          allBasesRow.classList.remove("hidden");
          return;
        }
      }
      allBasesRow.classList.add("hidden");
    } catch (e) {
      allBasesRow.classList.add("hidden");
    }
  }

  function hideAllBasesGlance() {
    const allBasesRow = document.getElementById("allBasesRow");
    const gBin = document.getElementById("glanceBin");
    const gOct = document.getElementById("glanceOct");
    const gDec = document.getElementById("glanceDec");
    const gHex = document.getElementById("glanceHex");
    if (allBasesRow) allBasesRow.classList.add("hidden");
    if (gBin) gBin.innerText = "";
    if (gOct) gOct.innerText = "";
    if (gDec) gDec.innerText = "";
    if (gHex) gHex.innerText = "";
  }

  // Hook into controller's convertNumber and clearAll if present
  const origConvert = window.convertNumber;
  if (typeof origConvert === "function") {
    window.convertNumber = function () {
      origConvert.apply(this, arguments);
      updateAllBasesGlance();
    };
  }

  const origClear = window.clearAll;
  if (typeof origClear === "function") {
    window.clearAll = function () {
      origClear.apply(this, arguments);
      hideAllBasesGlance();
    };
  }

  // Converter buttons
  const convertBtn = document.querySelector('[data-action="convert"]');
  const clearBtn = document.querySelector('[data-action="clear"]');
  const swapBasesBtn = document.querySelector('[data-action="swap-bases"]');

  if (convertBtn) {
    convertBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof convertNumber === "function") {
        convertNumber();
      } else {
        console.error("convertNumber() not found. Check controller.js load.");
        if (errorOutput) errorOutput.innerText = "Conversion error: controller not loaded.";
      }
      updateAllBasesGlance();
    });
  }

  if (swapBasesBtn) {
    swapBasesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const fb = document.getElementById("fromBase");
      const tb = document.getElementById("toBase");
      if (fb && tb) {
        const temp = fb.value;
        fb.value = tb.value;
        tb.value = temp;
        // If result was present and input exists, re-run conversion
        const res = document.getElementById("resultOutput")?.innerText.trim();
        if (res) {
          const inputEl = document.getElementById("inputNumber");
          if (inputEl) inputEl.value = res;
          if (typeof convertNumber === "function") convertNumber();
        } else if (document.getElementById("inputNumber")?.value.trim()) {
          if (typeof convertNumber === "function") convertNumber();
        }
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof clearAll === "function") {
        clearAll();
      }
      hideAllBasesGlance();
    });
  }

  // Quick Preset buttons
  const presetButtons = document.querySelectorAll("[data-conv-preset]");
  const presetMap = {
    "dec-hex": { from: "decimal", to: "hexadecimal", val: "255" },
    "bin-dec": { from: "binary", to: "decimal", val: "101101" },
    "oct-bin": { from: "octal", to: "binary", val: "77" },
    "hex-dec": { from: "hexadecimal", to: "decimal", val: "1A3" }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const key = btn.dataset.convPreset;
      const preset = presetMap[key];
      if (preset) {
        const inputEl = document.getElementById("inputNumber");
        const fb = document.getElementById("fromBase");
        const tb = document.getElementById("toBase");
        if (inputEl) inputEl.value = preset.val;
        if (fb) fb.value = preset.from;
        if (tb) tb.value = preset.to;
        if (typeof convertNumber === "function") convertNumber();
        updateAllBasesGlance();
      }
    });
  });

  // 2's complement buttons & enter key
  const twosInput = document.getElementById("twosInput");
  if (twosInput) {
    twosInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof calculateTwosComplement === "function") calculateTwosComplement();
      }
    });
  }

  const twosCalcBtn = document.querySelector('[data-action="twos-calc"]');
  const twosClearBtn = document.querySelector('[data-action="twos-clear"]');

  if (twosCalcBtn) {
    twosCalcBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof calculateTwosComplement === "function") {
        calculateTwosComplement();
      }
    });
  }

  if (twosClearBtn) {
    twosClearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const ti = document.getElementById("twosInput");
      const tr = document.getElementById("twosResult");
      const ts = document.getElementById("twosSteps");
      const te = document.getElementById("twosError");
      if (ti) ti.value = "";
      if (tr) tr.innerText = "";
      if (ts) ts.innerHTML = "";
      if (te) te.innerText = "";
    });
  }

  // Practice buttons & enter key
  const practiceAnswer = document.getElementById("practiceAnswer");
  if (practiceAnswer) {
    practiceAnswer.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof checkPracticeAnswer === "function") checkPracticeAnswer();
      }
    });
  }

  const practiceNewBtn = document.querySelector('[data-action="practice-new"]');
  const practiceCheckBtn = document.querySelector('[data-action="practice-check"]');
  const practiceStepsBtn = document.querySelector('[data-action="practice-steps"]');

  if (practiceNewBtn) {
    practiceNewBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof generatePracticeQuestion === "function") generatePracticeQuestion();
    });
  }

  if (practiceCheckBtn) {
    practiceCheckBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof checkPracticeAnswer === "function") checkPracticeAnswer();
    });
  }

  if (practiceStepsBtn) {
    practiceStepsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof showPracticeSteps === "function") showPracticeSteps();
    });
  }
});