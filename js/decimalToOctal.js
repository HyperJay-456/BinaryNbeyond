function decimalToOctal(decimal) {
    let steps = [];
    let number = decimal;
    let octal = "";

    steps.push(`Decimal number: ${decimal}`);

    // Special case
    if (decimal === 0) {
        return {
            result: "0",
            steps: ["0 in octal is 0"]
        };
    }

    // Repeated division by 8
    while (number > 0) {
        let remainder = number % 8;
        let quotient = Math.floor(number / 8);

        steps.push(
            `${number} ÷ 8 = ${quotient}, Remainder = ${remainder}`
        );

        octal = remainder + octal;
        number = quotient;
    }

    steps.push(`Final Octal Value = ${octal}`);

    return {
        result: octal,
        steps: steps
    };
}