let currentQuestion = null;

function generatePracticeQuestion() {
    const bases = ["binary", "decimal", "octal", "hexadecimal"];
    const fromBase = bases[Math.floor(Math.random() * bases.length)];
    let toBase;

    do {
        toBase = bases[Math.floor(Math.random() * bases.length)];
    } while (toBase === fromBase);

    const number = generateRandomNumber(fromBase);

    currentQuestion = { number, fromBase, toBase };

    document.getElementById("practiceQuestion").innerText =
        `Convert (${number}) from ${fromBase.toUpperCase()} to ${toBase.toUpperCase()}`;

    document.getElementById("practiceAnswer").value = "";
    document.getElementById("practiceResult").innerText = "";
}
