function performArithmetic() {
    const system = document.getElementById("numberSystem").value;
    const num1 = document.getElementById("num1").value.trim();
    const num2 = document.getElementById("num2").value.trim();
    const operation = document.getElementById("operation").value;

    const resultDiv = document.getElementById("arithResult");
    const stepsDiv = document.getElementById("arithSteps");
    const errorDiv = document.getElementById("arithError");

    resultDiv.innerText = "";
    stepsDiv.innerHTML = "";
    errorDiv.innerText = "";

    if (num1 === "" || num2 === "") {
        errorDiv.innerText = "Please enter both numbers.";
        return;
    }

    if (!validateInput(num1, system) || !validateInput(num2, system)) {
        errorDiv.innerText = `Invalid ${system} number entered.`;
        return;
    }

    try {
        let result, steps = [];

        if (system === "decimal") {
            result = decimalArithmetic(num1, num2, operation, steps);
        } else {
            result = binaryArithmetic(num1, num2, operation, steps);
        }

        resultDiv.innerText = result;
        animateSteps(steps, "arithSteps", 600);

    } catch (err) {
        errorDiv.innerText = "Error during calculation.";
        console.error(err);
    }
}


function decimalArithmetic(a, b, op, steps) {
    a = parseInt(a);
    b = parseInt(b);

    steps.push(`Given numbers: ${a} and ${b}`);

    switch (op) {
        case "add":
            steps.push(`${a} + ${b} = ${a + b}`);
            return a + b;

        case "sub":
            steps.push(`${a} - ${b} = ${a - b}`);
            return a - b;

        case "mul":
            steps.push(`${a} × ${b} = ${a * b}`);
            return a * b;

        case "div":
            if (b === 0) throw "Division by zero";
            steps.push(`${a} ÷ ${b} = ${Math.floor(a / b)} (Quotient)`);
            return Math.floor(a / b);
    }
}

function binaryArithmetic(a, b, op, steps) {

    switch (op) {
        case "add":
            const add = binaryAddition(a, b);
            steps.push(...add.steps);
            return add.result;

        case "sub":
            steps.push("Binary subtraction using 2’s complement");

            const comp = twosComplement(b);
            steps.push(...comp.steps);

            const sub = binaryAddition(a, comp.result);
            steps.push(...sub.steps);

            return sub.result;

        case "mul":
            let decA = parseInt(a, 2);
            let decB = parseInt(b, 2);
            let product = decA * decB;

            steps.push(`Convert ${a} to decimal → ${decA}`);
            steps.push(`Convert ${b} to decimal → ${decB}`);
            steps.push(`Multiply: ${decA} × ${decB} = ${product}`);
            steps.push(`Convert ${product} to binary`);

            return product.toString(2);

        case "div":
            let dividend = parseInt(a, 2);
            let divisor = parseInt(b, 2);

            if (divisor === 0) throw "Division by zero";

            let quotient = Math.floor(dividend / divisor);

            steps.push(`Convert ${a} → ${dividend}`);
            steps.push(`Convert ${b} → ${divisor}`);
            steps.push(`Divide: ${dividend} ÷ ${divisor} = ${quotient}`);
            steps.push(`Convert ${quotient} to binary`);

            return quotient.toString(2);
    }
}

let currentArithmeticQuestion = null;

function generateArithmeticPractice() {
    const systems = ["decimal", "binary"];
    const operations = ["add", "sub", "mul", "div"];

    const system =
        systems[Math.floor(Math.random() * systems.length)];

    const operation =
        operations[Math.floor(Math.random() * operations.length)];

    const difficulty =
        document.getElementById("arithDifficulty").value;

    const num1 =
        generateArithmeticNumber(system, difficulty, operation);

    const num2 =
        generateArithmeticNumber(system, difficulty, operation);

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

    document.getElementById("arithPracticeQuestion").innerText =
        `[${difficulty.toUpperCase()}] (${num1}) ${opSymbol[operation]} (${num2}) in ${system.toUpperCase()}`;

    document.getElementById("arithPracticeAnswer").value = "";
    document.getElementById("arithPracticeResult").innerText = "";
    document.getElementById("arithPracticeSteps").innerHTML = "";
}


function generateArithmeticNumber(system, difficulty, operation = null) {

    let min, max;

    if (difficulty === "easy") {
        min = 1; max = 10;
    } else if (difficulty === "medium") {
        min = 10; max = 50;
    } else {
        min = 50; max = 200;
    }

    if (system === "decimal") {
        if (operation === "div") {
            return Math.floor(Math.random() * (max - min)) + min || 1;
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // binary
    let number =
        Math.floor(Math.random() * (max - min)) + min;

    return number.toString(2);
}


function checkArithmeticPractice() {
    if (!currentArithmeticQuestion) return;

    const answer =
        document.getElementById("arithPracticeAnswer").value.trim();

    if (answer === "") {
        document.getElementById("arithPracticeResult").innerText =
            "Please enter an answer.";
        return;
    }

    const { system, operation, num1, num2 } = currentArithmeticQuestion;

    let correct;

    if (system === "decimal") {
        correct = decimalArithmetic(
            num1.toString(),
            num2.toString(),
            operation,
            []
        ).toString();
    } else {
        correct = binaryArithmetic(num1, num2, operation, []).toString();
    }

    if (answer === correct) {
        document.getElementById("arithPracticeResult").innerText = "✅ Correct!";
    } else {
        document.getElementById("arithPracticeResult").innerText =
            `❌ Incorrect. Correct Answer: ${correct}`;
    }
}

function showArithmeticPracticeSteps() {
    if (!currentArithmeticQuestion) return;

    const { system, operation, num1, num2 } = currentArithmeticQuestion;
    const steps = [];

    let result;

    if (system === "decimal") {
        result = decimalArithmetic(
            num1.toString(),
            num2.toString(),
            operation,
            steps
        );
    } else {
        result = binaryArithmetic(num1, num2, operation, steps);
    }

    animateSteps(steps, "arithPracticeSteps", 600);
}
