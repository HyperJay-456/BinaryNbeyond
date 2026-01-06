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
        // STEP 1: FROM BASE → DECIMAL
        const toDecimal = baseToDecimal(input, fromBase);

        // STEP 2: DECIMAL → TARGET BASE
        const fromDecimal = decimalToBase(toDecimal.result, toBase);

        // MERGE STEPS
        const allSteps = [
            `--- Step 1: Convert ${fromBase} to Decimal ---`,
            ...toDecimal.steps,
            "",
            `--- Step 2: Convert Decimal to ${toBase} ---`,
            ...fromDecimal.steps
        ];

        resultOutput.innerText = fromDecimal.result;

        allSteps.forEach(step => {
            const p = document.createElement("p");
            p.innerText = step;
            stepsOutput.appendChild(p);
        });

    } catch (error) {
        errorOutput.innerText = "Conversion error occurred.";
        console.error(error);
    }
}