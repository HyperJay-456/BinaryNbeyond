function octalToDecimal(octal) {
    let steps = [];
    let decimal = 0;
    let power = octal.length - 1;

    steps.push(`Octal number: ${octal}`);

    for (let i = 0; i < octal.length; i++) {
        let digit = parseInt(octal[i]);
        let value = digit * Math.pow(8, power);

        steps.push(
            `${digit} × 8^${power} = ${value}`
        );

        decimal += value;
        power--;
    }

    steps.push(`Final Decimal Value = ${decimal}`);

    return {
        result: decimal,
        steps: steps
    };
}
