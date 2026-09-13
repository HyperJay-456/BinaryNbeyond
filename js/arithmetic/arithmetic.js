// js/arithmetic/arithmetic.js

function performArithmetic() {
    const systemEl = document.getElementById("numberSystem");
    const num1El = document.getElementById("num1");
    const num2El = document.getElementById("num2");
    const opEl = document.getElementById("operation");

    const resultDiv = document.getElementById("arithResult");
    const stepsDiv = document.getElementById("arithSteps");
    const errorDiv = document.getElementById("arithError");

    if (resultDiv) resultDiv.innerText = "";
    if (stepsDiv) stepsDiv.innerHTML = "";
    if (errorDiv) errorDiv.innerText = "";

    if (!num1El || !num2El || !systemEl || !opEl) return;

    const system = systemEl.value;
    const num1 = num1El.value.trim();
    const num2 = num2El.value.trim();
    const operation = opEl.value;

    if (num1 === "" || num2 === "") {
        if (errorDiv) errorDiv.innerText = "Please enter both numbers.";
        return;
    }

    if (typeof validateInput === "function") {
        if (!validateInput(num1, system) || !validateInput(num2, system)) {
            if (errorDiv) errorDiv.innerText = `Invalid ${system} number entered.`;
            return;
        }
    }

    try {
        let result;
        const steps = [];

        if (system === "decimal") {
            result = decimalArithmetic(num1, num2, operation, steps);
        } else {
            result = binaryArithmetic(num1, num2, operation, steps);
        }

        if (resultDiv) resultDiv.innerText = result;
        if (typeof animateSteps === "function") {
            animateSteps(steps, "arithSteps", 500);
        } else if (stepsDiv) {
            stepsDiv.innerHTML = steps.map(s => `<p>${s}</p>`).join("");
        }

    } catch (err) {
        const errMsg = String(err?.message || err);
        if (errorDiv) {
            if (errMsg.includes("❌")) {
                errorDiv.innerText = errMsg;
            } else {
                errorDiv.innerText = "Error during calculation: " + errMsg;
            }
        }
        console.error(err);
    }
}

function decimalArithmetic(a, b, op, steps = []) {
    const isFloat = String(a).includes(".") || String(b).includes(".");
    const numA = isFloat ? parseFloat(a) : parseInt(a, 10);
    const numB = isFloat ? parseFloat(b) : parseInt(b, 10);

    if (Number.isNaN(numA) || Number.isNaN(numB)) {
        throw new Error("Invalid decimal numbers provided.");
    }

    steps.push(`Given decimal numbers: ${numA} and ${numB}`);

    switch (op) {
        case "add": {
            const sum = isFloat ? +(numA + numB).toFixed(6) : numA + numB;
            steps.push(`${numA} + ${numB} = ${sum}`);
            return String(sum);
        }

        case "sub": {
            const diff = isFloat ? +(numA - numB).toFixed(6) : numA - numB;
            steps.push(`${numA} − ${numB} = ${diff}`);
            return String(diff);
        }

        case "mul": {
            const product = isFloat ? +(numA * numB).toFixed(6) : numA * numB;
            steps.push(`${numA} × ${numB} = ${product}`);
            return String(product);
        }

        case "div": {
            if (numB === 0) {
                throw new Error("❌ Cannot divide by zero. Please enter a non-zero divisor.");
            }

            if (isFloat) {
                const quotient = +(numA / numB).toFixed(6);
                steps.push(`${numA} ÷ ${numB} = ${quotient}`);
                return String(quotient);
            }

            const quotient = Math.trunc(numA / numB);
            const remainder = numA % numB;
            steps.push(`${numA} ÷ ${numB}:`);
            steps.push(`Quotient = ${quotient}`);
            if (remainder !== 0) {
                steps.push(`Remainder = ${remainder}`);
                return `${quotient} R ${remainder}`;
            }
            return String(quotient);
        }

        default:
            throw new Error(`Unknown operation: ${op}`);
    }
}

function binarySubtractionWithTwosComplement(a, b, steps = []) {
    let cleanA = String(a).trim().replace(/^0+(?!$)/, "") || "0";
    let cleanB = String(b).trim().replace(/^0+(?!$)/, "") || "0";

    steps.push(`Binary Subtraction using 2’s Complement: (${cleanA})₂ − (${cleanB})₂`);

    if (cleanA === cleanB) {
        steps.push(`Both numbers are equal: (${cleanA})₂ − (${cleanB})₂ = 0`);
        return "0";
    }

    const n = Math.max(cleanA.length, cleanB.length) + 1;
    const aPadded = cleanA.padStart(n, "0");
    const bPadded = cleanB.padStart(n, "0");

    steps.push(`Step 1: Pad both numbers to ${n} bits with leading sign bits`);
    steps.push(`A = ${aPadded}`);
    steps.push(`B = ${bPadded}`);

    const onesCompB = bPadded
        .split("")
        .map(bit => (bit === "0" ? "1" : "0"))
        .join("");
    steps.push(`Step 2: 1's Complement of B (invert bits): ${onesCompB}`);

    const addOneResult = (typeof binaryAddition === "function")
        ? binaryAddition(onesCompB, "1")
        : defaultBinaryAddition(onesCompB, "1");

    let twosCompB = addOneResult.result;
    if (twosCompB.length > n) {
        twosCompB = twosCompB.slice(-n);
    } else {
        twosCompB = twosCompB.padStart(n, "0");
    }
    steps.push(`Step 3: 2's Complement of B (add 1 to 1's complement): ${twosCompB}`);

    steps.push(`Step 4: Add A (${aPadded}) + 2's Complement of B (${twosCompB})`);
    const sumResult = (typeof binaryAddition === "function")
        ? binaryAddition(aPadded, twosCompB)
        : defaultBinaryAddition(aPadded, twosCompB);

    steps.push(...sumResult.steps);
    const sum = sumResult.result;

    if (sum.length > n) {
        const endCarry = sum[0];
        const rawMagnitude = sum.slice(1);
        const finalResult = rawMagnitude.replace(/^0+(?!$)/, "") || "0";
        steps.push(`Step 5: End carry = ${endCarry} (Carry of 1 indicates positive result).`);
        steps.push(`Discard end carry: ${sum} → ${rawMagnitude}`);
        steps.push(`Final Binary Result = ${finalResult} (Decimal: ${parseInt(finalResult, 2)})`);
        return finalResult;
    } else {
        steps.push(`Step 5: No end carry generated (indicates result is NEGATIVE in 2's complement form).`);
        const sumPadded = sum.padStart(n, "0");
        const onesCompSum = sumPadded
            .split("")
            .map(bit => (bit === "0" ? "1" : "0"))
            .join("");

        const magResult = (typeof binaryAddition === "function")
            ? binaryAddition(onesCompSum, "1")
            : defaultBinaryAddition(onesCompSum, "1");

        let magnitude = magResult.result;
        if (magnitude.length > n) magnitude = magnitude.slice(-n);
        magnitude = magnitude.replace(/^0+(?!$)/, "") || "0";

        const finalResult = "-" + magnitude;
        steps.push(`Magnitude = 2's complement of ${sumPadded} = ${magnitude}`);
        steps.push(`Final Binary Result = ${finalResult} (Decimal: -${parseInt(magnitude, 2)})`);
        return finalResult;
    }
}

function binaryArithmetic(a, b, op, steps = []) {
    let rawA = String(a).trim();
    let rawB = String(b).trim();

    const isNegA = rawA.startsWith("-");
    const isNegB = rawB.startsWith("-");

    const cleanA = isNegA ? rawA.substring(1) : rawA;
    const cleanB = isNegB ? rawB.substring(1) : rawB;

    const decA = (isNegA ? -1 : 1) * parseInt(cleanA, 2);
    const decB = (isNegB ? -1 : 1) * parseInt(cleanB, 2);

    steps.push(`Inputs in Binary: A = ${rawA} (${decA}₁₀), B = ${rawB} (${decB}₁₀)`);

    switch (op) {
        case "add": {
            if (!isNegA && !isNegB) {
                const add = (typeof binaryAddition === "function")
                    ? binaryAddition(cleanA, cleanB)
                    : defaultBinaryAddition(cleanA, cleanB);
                steps.push(...add.steps);
                return add.result;
            } else if (isNegA && !isNegB) {
                return binarySubtractionWithTwosComplement(cleanB, cleanA, steps);
            } else if (!isNegA && isNegB) {
                return binarySubtractionWithTwosComplement(cleanA, cleanB, steps);
            } else {
                const add = (typeof binaryAddition === "function")
                    ? binaryAddition(cleanA, cleanB)
                    : defaultBinaryAddition(cleanA, cleanB);
                steps.push(...add.steps);
                const res = "-" + add.result;
                steps.push(`Both numbers are negative: Final Result = ${res}`);
                return res;
            }
        }

        case "sub": {
            if (!isNegA && !isNegB) {
                return binarySubtractionWithTwosComplement(cleanA, cleanB, steps);
            } else if (!isNegA && isNegB) {
                steps.push(`Subtracting negative is equivalent to addition: (${cleanA})₂ + (${cleanB})₂`);
                const add = (typeof binaryAddition === "function")
                    ? binaryAddition(cleanA, cleanB)
                    : defaultBinaryAddition(cleanA, cleanB);
                steps.push(...add.steps);
                return add.result;
            } else if (isNegA && !isNegB) {
                steps.push(`Both terms are negative: −((${cleanA})₂ + (${cleanB})₂)`);
                const add = (typeof binaryAddition === "function")
                    ? binaryAddition(cleanA, cleanB)
                    : defaultBinaryAddition(cleanA, cleanB);
                steps.push(...add.steps);
                return "-" + add.result;
            } else {
                steps.push(`−A − (−B) is equivalent to: (${cleanB})₂ − (${cleanA})₂`);
                return binarySubtractionWithTwosComplement(cleanB, cleanA, steps);
            }
        }

        case "mul": {
            const productDec = decA * decB;
            const sign = productDec < 0 ? "-" : "";
            const absProduct = Math.abs(productDec);
            const productBin = sign + absProduct.toString(2);

            steps.push(`Convert ${rawA}₂ to decimal → ${decA}`);
            steps.push(`Convert ${rawB}₂ to decimal → ${decB}`);
            steps.push(`Multiply in decimal: ${decA} × ${decB} = ${productDec}`);
            steps.push(`Convert ${productDec} to binary → ${productBin}₂`);

            return productBin;
        }

        case "div": {
            if (decB === 0) {
                throw new Error("❌ Cannot divide by zero. Please enter a non-zero divisor.");
            }

            const quotientDec = Math.trunc(decA / decB);
            const remainderDec = Math.abs(decA % decB);

            const sign = quotientDec < 0 ? "-" : "";
            const quotientBin = (quotientDec === 0 && sign ? "-" : "") + Math.abs(quotientDec).toString(2);
            const remainderBin = remainderDec.toString(2);

            steps.push(`Convert ${rawA}₂ to decimal → ${decA}`);
            steps.push(`Convert ${rawB}₂ to decimal → ${decB}`);
            steps.push(`Divide in decimal: ${decA} ÷ ${decB} = ${quotientDec}, Remainder = ${remainderDec}`);
            steps.push(`Convert quotient to binary: ${quotientDec} → ${quotientBin}₂`);

            if (remainderDec !== 0) {
                steps.push(`Convert remainder to binary: ${remainderDec} → ${remainderBin}₂`);
                const fullResult = `${quotientBin} R ${remainderBin}`;
                steps.push(`Final Result = ${fullResult}`);
                return fullResult;
            }

            steps.push(`Final Result = ${quotientBin}`);
            return quotientBin;
        }

        default:
            throw new Error(`Unknown operation: ${op}`);
    }
}

function defaultBinaryAddition(bin1, bin2) {
    let s1 = String(bin1).trim().replace(/[^01]/g, "") || "0";
    let s2 = String(bin2).trim().replace(/[^01]/g, "") || "0";
    const maxLen = Math.max(s1.length, s2.length);
    s1 = s1.padStart(maxLen, "0");
    s2 = s2.padStart(maxLen, "0");

    let carry = 0;
    let result = "";
    const steps = [`Align: ${s1} + ${s2}`];

    for (let i = maxLen - 1; i >= 0; i--) {
        const b1 = parseInt(s1[i], 10);
        const b2 = parseInt(s2[i], 10);
        const sum = b1 + b2 + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    if (carry) result = carry + result;
    return { result, steps };
}

let currentArithmeticQuestion = null;

function generateArithmeticPractice() {
    const systems = ["decimal", "binary"];
    const operations = ["add", "sub", "mul", "div"];

    const system = systems[Math.floor(Math.random() * systems.length)];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    const diffEl = document.getElementById("arithDifficulty");
    const difficulty = diffEl ? diffEl.value : "easy";

    const { num1, num2 } = generateArithmeticQuestionPair(system, difficulty, operation);

    currentArithmeticQuestion = {
        system,
        operation,
        difficulty,
        num1,
        num2
    };

    const opSymbol = {
        add: "+",
        sub: "−",
        mul: "×",
        div: "÷"
    };

    const qEl = document.getElementById("arithPracticeQuestion");
    if (qEl) {
        qEl.innerText = `[${difficulty.toUpperCase()}] (${num1}) ${opSymbol[operation]} (${num2}) in ${system.toUpperCase()}`;
    }

    const ansEl = document.getElementById("arithPracticeAnswer");
    const resEl = document.getElementById("arithPracticeResult");
    const stepsEl = document.getElementById("arithPracticeSteps");

    if (ansEl) ansEl.value = "";
    if (resEl) resEl.innerText = "";
    if (stepsEl) stepsEl.innerHTML = "";
}

function generateArithmeticQuestionPair(system, difficulty, operation) {
    let min = 1, max = 10;
    if (difficulty === "medium") { min = 10; max = 50; }
    if (difficulty === "hard") { min = 50; max = 200; }

    if (operation === "div") {
        const divisor = Math.floor(Math.random() * (max / 4 || 3)) + 2;
        const quotient = Math.floor(Math.random() * (max / 3 || 3)) + 1;
        const dividend = divisor * quotient;

        if (system === "decimal") {
            return { num1: String(dividend), num2: String(divisor) };
        } else {
            return { num1: dividend.toString(2), num2: divisor.toString(2) };
        }
    }

    let n1 = Math.floor(Math.random() * (max - min)) + min;
    let n2 = Math.floor(Math.random() * (max - min)) + min;

    if (operation === "sub" && n2 > n1) {
        [n1, n2] = [n2, n1];
    }

    if (system === "decimal") {
        return { num1: String(n1), num2: String(n2) };
    } else {
        return { num1: n1.toString(2), num2: n2.toString(2) };
    }
}

function checkArithmeticPractice() {
    if (!currentArithmeticQuestion) return;

    const ansEl = document.getElementById("arithPracticeAnswer");
    const resEl = document.getElementById("arithPracticeResult");
    if (!ansEl || !resEl) return;

    const answer = ansEl.value.trim();
    if (answer === "") {
        resEl.innerText = "Please enter an answer.";
        return;
    }

    const { system, operation, num1, num2 } = currentArithmeticQuestion;
    let correct;

    if (system === "decimal") {
        correct = decimalArithmetic(num1, num2, operation, []).trim();
    } else {
        correct = binaryArithmetic(num1, num2, operation, []).trim();
    }

    if (answer.toUpperCase() === correct.toUpperCase()) {
        resEl.innerText = "✅ Correct!";
    } else {
        resEl.innerText = `❌ Incorrect. Correct Answer: ${correct}`;
    }
}

function showArithmeticPracticeSteps() {
    if (!currentArithmeticQuestion) return;

    const { system, operation, num1, num2 } = currentArithmeticQuestion;
    const steps = [];

    if (system === "decimal") {
        decimalArithmetic(num1, num2, operation, steps);
    } else {
        binaryArithmetic(num1, num2, operation, steps);
    }

    if (typeof animateSteps === "function") {
        animateSteps(steps, "arithPracticeSteps", 500);
    } else {
        const s = document.getElementById("arithPracticeSteps");
        if (s) s.innerHTML = steps.map(p => `<p>${p}</p>`).join("");
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        decimalArithmetic,
        binaryArithmetic,
        binarySubtractionWithTwosComplement,
        generateArithmeticQuestionPair
    };
}
