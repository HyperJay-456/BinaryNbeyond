function hexadecimalToDecimal(hex) {
    let steps = [];
    let isNegative = hex.startsWith('-');
    let hexNum = isNegative ? hex.substring(1) : hex;
    let decimal = 0;
    let power = hexNum.length - 1;

    steps.push(`Hexadecimal number: ${hex}`);

    for (let i = 0; i < hexNum.length; i++) {
        let digit = parseInt(hexNum[i], 16);
        let value = digit * Math.pow(16, power);

        steps.push(
            `${hexNum[i]} × 16^${power} = ${value}`
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
    module.exports = { hexadecimalToDecimal };
}
