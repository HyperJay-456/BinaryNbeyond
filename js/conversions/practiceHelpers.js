function generateRandomNumber(base) {
    switch (base) {
        case "binary":
            return Math.floor(Math.random() * 64).toString(2);
        case "decimal":
            return Math.floor(Math.random() * 100).toString();
        case "octal":
            return Math.floor(Math.random() * 64).toString(8);
        case "hexadecimal":
            return Math.floor(Math.random() * 255).toString(16).toUpperCase();
    }
}

function checkPracticeAnswer() {
    const studentAnswer = document.getElementById("practiceAnswer").value.trim();

    if (!currentQuestion) return;

    const toDecimal = baseToDecimal(
        currentQuestion.number,
        currentQuestion.fromBase
    );

    const correct = decimalToBase(
        toDecimal.result,
        currentQuestion.toBase
    ).result;

    if (studentAnswer.toUpperCase() === correct.toUpperCase()) {
        document.getElementById("practiceResult").innerText = "✅ Correct!";
    } else {
        document.getElementById("practiceResult").innerText =
            `❌ Incorrect. Correct Answer: ${correct}`;
    }
}
