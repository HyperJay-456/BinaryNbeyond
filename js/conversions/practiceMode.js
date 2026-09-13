/**************************************************
 * PRACTICE MODE – GLOBAL STATE
 **************************************************/
let currentQuestion = null;

/**************************************************
 * GENERATE A NEW PRACTICE QUESTION
 **************************************************/
function generatePracticeQuestion() {
    const bases = ["binary", "decimal", "octal", "hexadecimal"];

    // Randomly choose FROM and TO bases
    const fromBase = bases[Math.floor(Math.random() * bases.length)];
    let toBase;

    do {
        toBase = bases[Math.floor(Math.random() * bases.length)];
    } while (toBase === fromBase);

    // Generate a number valid for the FROM base
    const number = generateRandomNumber(fromBase);

    // Store current question globally
    currentQuestion = {
        number: number,
        fromBase: fromBase,
        toBase: toBase
    };

    // Update UI
    document.getElementById("practiceQuestion").innerText =
        `Convert (${number}) from ${fromBase.toUpperCase()} to ${toBase.toUpperCase()}`;

    document.getElementById("practiceAnswer").value = "";
    document.getElementById("practiceResult").innerText = "";
    document.getElementById("practiceSteps").innerHTML = "";
}

/**************************************************
 * CHECK STUDENT ANSWER
 **************************************************/
function checkPracticeAnswer() {
    if (!currentQuestion) {
        document.getElementById("practiceResult").innerText =
            "Please generate a question first.";
        return;
    }

    const studentAnswer =
        document.getElementById("practiceAnswer").value.trim();

    if (studentAnswer === "") {
        document.getElementById("practiceResult").innerText =
            "Please enter your answer.";
        return;
    }

    // Convert FROM base → Decimal
    const toDecimal = baseToDecimal(
        currentQuestion.number,
        currentQuestion.fromBase
    );

    // Convert Decimal → TO base
    const correctResult = decimalToBase(
        toDecimal.result,
        currentQuestion.toBase
    ).result;

    if (studentAnswer.toUpperCase() === correctResult.toUpperCase()) {
        document.getElementById("practiceResult").innerText = "✅ Correct!";
    } else {
        document.getElementById("practiceResult").innerText =
            `❌ Incorrect. Correct Answer: ${correctResult}`;
    }
}

/**************************************************
 * SHOW STEP-BY-STEP SOLUTION
 **************************************************/
function showPracticeSteps() {
    if (!currentQuestion) return;

    const stepsContainer = document.getElementById("practiceSteps");
    stepsContainer.innerHTML = "";

    const toDecimal = baseToDecimal(
        currentQuestion.number,
        currentQuestion.fromBase
    );

    const fromDecimal = decimalToBase(
        toDecimal.result,
        currentQuestion.toBase
    );

    const steps = [
        `--- Convert ${currentQuestion.fromBase.toUpperCase()} to Decimal ---`,
        ...toDecimal.steps,
        "",
        `--- Convert Decimal to ${currentQuestion.toBase.toUpperCase()} ---`,
        ...fromDecimal.steps
    ];

    animateSteps(steps, "practiceSteps", 600);
}
