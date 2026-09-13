function octalToDecimal(octal) {
    let steps = [];
    let isNegative = octal.startsWith('-');
    let octNum = isNegative ? octal.substring(1) : octal;
    let decimal = 0;
    let power = octNum.length - 1;

    steps.push(`Octal number: ${octal}`);

    for (let i = 0; i < octNum.length; i++) {
        let digit = parseInt(octNum[i]);
        let value = digit * Math.pow(8, power);

        steps.push(
            `${digit} × 8^${power} = ${value}`
        );

        decimal += value;
        power--;
    }

    if (isNegative) {
        decimal = -decimal;
        steps.push(`Apply negative sign: -${Math.abs(decimal)}`);
    }

    steps.push(`Final Decimal Value = ${decimal}`);

    return {
        result: decimal,
        steps: steps
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { octalToDecimal };
}
