function convertNumber() {
  const input = document.getElementById("inputNumber").value.trim();
  const fromBase = document.getElementById("fromBase").value;
  const toBase = document.getElementById("toBase").value;

  const resultOutput = document.getElementById("resultOutput");
  const stepsOutput = document.getElementById("stepsOutput");
  const errorOutput = document.getElementById("errorOutput");

  resultOutput.innerText = "";
  stepsOutput.innerHTML = "";
  errorOutput.innerText = "";

  if (input === "") {
    errorOutput.innerText = "Please enter a number.";
    return;
  }

  if (!fromBase || !toBase) {
    errorOutput.innerText = "Please select both bases.";
    return;
  }

  if (!validateInput(input, fromBase)) {
    errorOutput.innerText = `Invalid number for ${fromBase} system.`;
    return;
  }

  try {
    // Step 1: Convert to Decimal
    const toDecimal = baseToDecimal(input, fromBase);

    // Step 2: Convert Decimal to Target Base
    const fromDecimal = decimalToBase(toDecimal.result, toBase);

    const allSteps = [
      `--- Step 1: Convert ${fromBase.toUpperCase()} to Decimal ---`,
      ...toDecimal.steps,
      "",
      `--- Step 2: Convert Decimal to ${toBase.toUpperCase()} ---`,
      ...fromDecimal.steps
    ];

    resultOutput.innerText = fromDecimal.result;

    // Render structured step-by-step table
    renderConversionSteps(toDecimal, fromDecimal, input, fromBase, toBase, stepsOutput);

  } catch (err) {
    console.error(err);
    errorOutput.innerText = "Conversion failed. Check console for errors.";
  }
}

function renderConversionSteps(toDecimal, fromDecimal, input, fromBase, toBase, container) {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "space-y-6 mt-3";

  // SECTION 1: Base to Decimal
  const sec1 = document.createElement("div");
  sec1.className = "step-section";

  const sec1Title = document.createElement("h4");
  sec1Title.className = "step-section-header";
  sec1Title.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> <span>Step 1: Convert ${fromBase.toUpperCase()} to Decimal</span>`;
  sec1.appendChild(sec1Title);

  if (fromBase.toLowerCase() === "decimal") {
    const box = document.createElement("div");
    box.className = "step-notice-box";
    box.innerHTML = `<span>✓</span> <span>Input <strong>${input}</strong> is already in Decimal system (Base 10). Value = <strong>${toDecimal.result}</strong></span>`;
    sec1.appendChild(box);
  } else {
    // Positional expansion steps (e.g. "1 × 2^3 = 8")
    const multPattern = /^([0-9A-Fa-f]+)\s*×\s*(\d+)\^(\d+)\s*=\s*(-?\d+)$/;
    const multSteps = toDecimal.steps.filter(s => multPattern.test(s.trim()));

    if (multSteps.length > 0) {
      let runningSum = 0;
      let rowsHtml = "";
      multSteps.forEach(s => {
        const match = s.trim().match(multPattern);
        if (match) {
          const digit = match[1];
          const base = match[2];
          const power = match[3];
          const val = parseInt(match[4], 10);
          runningSum += val;
          rowsHtml += `
            <tr>
              <td class="text-muted font-bold">${power}</td>
              <td class="font-bold text-cyan-400">${digit}</td>
              <td>${base}<sup>${power}</sup> (${Math.pow(parseInt(base, 10), parseInt(power, 10))})</td>
              <td class="text-indigo-300 font-medium">${digit} × ${base}<sup>${power}</sup></td>
              <td class="font-semibold text-emerald-400">${val}</td>
              <td class="text-muted font-mono">${runningSum}</td>
            </tr>`;
        }
      });

      const tableEl = document.createElement("div");
      tableEl.className = "step-table-wrapper";
      tableEl.innerHTML = `
        <table class="step-table">
          <thead>
            <tr>
              <th>Position (n)</th>
              <th>Digit</th>
              <th>Weight (Base<sup>n</sup>)</th>
              <th>Calculation</th>
              <th>Value</th>
              <th>Running Sum</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>`;
      sec1.appendChild(tableEl);

      const sumBox = document.createElement("div");
      sumBox.className = "step-notice-box";
      sumBox.innerHTML = `<span>=</span> <span>Total Positional Sum: <strong class="text-indigo-400 font-bold ml-1">${toDecimal.result}</strong> (Decimal)</span>`;
      sec1.appendChild(sumBox);
    } else {
      const list = document.createElement("div");
      list.className = "space-y-1.5 mt-2";
      toDecimal.steps.forEach(st => {
        if (!st) return;
        const p = document.createElement("div");
        p.className = "step-notice-box";
        p.innerText = st;
        list.appendChild(p);
      });
      sec1.appendChild(list);
    }
  }

  wrapper.appendChild(sec1);

  // SECTION 2: Decimal to Target Base
  const sec2 = document.createElement("div");
  sec2.className = "step-section";

  const sec2Title = document.createElement("h4");
  sec2Title.className = "step-section-header";
  sec2Title.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> <span>Step 2: Convert Decimal to ${toBase.toUpperCase()}</span>`;
  sec2.appendChild(sec2Title);

  if (toBase.toLowerCase() === "decimal") {
    const box = document.createElement("div");
    box.className = "step-notice-box";
    box.innerHTML = `<span>✓</span> <span>Target system is Decimal (Base 10). Final Result = <strong class="text-cyan-400">${fromDecimal.result}</strong></span>`;
    sec2.appendChild(box);
  } else {
    // Successive division steps (e.g. "1001 ÷ 2 = 500, Remainder = 1")
    const divPattern = /^(\d+)\s*÷\s*(\d+)\s*=\s*(\d+),\s*Remainder\s*=\s*([0-9A-Fa-f]+)$/;
    const divSteps = fromDecimal.steps.filter(s => divPattern.test(s.trim()));

    if (divSteps.length > 0) {
      let rowsHtml = "";
      divSteps.forEach((s, idx) => {
        const match = s.trim().match(divPattern);
        if (match) {
          const dividend = match[1];
          const divisor = match[2];
          const quotient = match[3];
          const remainder = match[4];
          rowsHtml += `
            <tr>
              <td class="text-muted font-mono font-semibold">#${idx + 1}</td>
              <td class="font-bold text-indigo-300">${dividend} ÷ ${divisor}</td>
              <td class="font-medium">${quotient}</td>
              <td class="font-bold text-cyan-400">${remainder}</td>
              <td class="font-bold text-emerald-400">${remainder}</td>
            </tr>`;
        }
      });

      const tableEl = document.createElement("div");
      tableEl.className = "step-table-wrapper";
      tableEl.innerHTML = `
        <table class="step-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Division</th>
              <th>Quotient</th>
              <th>Remainder</th>
              <th>Digit / Bit</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>`;
      sec2.appendChild(tableEl);

      const resultBox = document.createElement("div");
      resultBox.className = "step-notice-box";
      resultBox.innerHTML = `<span>↑</span> <span>Read remainders from bottom to top: <strong class="text-cyan-400 font-bold ml-1">${fromDecimal.result}</strong></span>`;
      sec2.appendChild(resultBox);
    } else {
      const list = document.createElement("div");
      list.className = "space-y-1.5 mt-2";
      fromDecimal.steps.forEach(st => {
        if (!st) return;
        const p = document.createElement("div");
        p.className = "step-notice-box";
        p.innerText = st;
        list.appendChild(p);
      });
      sec2.appendChild(list);
    }
  }

  wrapper.appendChild(sec2);
  container.appendChild(wrapper);
}

function clearAll() {
  document.getElementById("inputNumber").value = "";
  document.getElementById("fromBase").value = "";
  document.getElementById("toBase").value = "";

  document.getElementById("resultOutput").innerText = "";
  document.getElementById("stepsOutput").innerHTML = "";
  document.getElementById("errorOutput").innerText = "";
}

function calculateTwosComplement() {
  const input = document.getElementById("twosInput").value.trim();

  const resultDiv = document.getElementById("twosResult");
  const stepsDiv = document.getElementById("twosSteps");
  const errorDiv = document.getElementById("twosError");

  resultDiv.innerText = "";
  stepsDiv.innerHTML = "";
  errorDiv.innerText = "";

  if (input === "") {
    errorDiv.innerText = "Please enter a binary number.";
    return;
  }

  if (!validateInput(input, "binary")) {
    errorDiv.innerText = "Invalid binary number. Use only 0 and 1.";
    return;
  }

  try {
    const result = twosComplement(input);

    resultDiv.innerText = result.result;

    const list = document.createElement("div");
    list.className = "space-y-2 mt-2";
    result.steps.forEach((step, idx) => {
      const box = document.createElement("div");
      box.className = "step-notice-box";
      box.innerHTML = `<span class="text-cyan-400 font-bold">#${idx + 1}</span> <span>${step}</span>`;
      list.appendChild(box);
    });
    stepsDiv.appendChild(list);

  } catch (err) {
    console.error(err);
    errorDiv.innerText = "2's complement calculation failed.";
  }
}