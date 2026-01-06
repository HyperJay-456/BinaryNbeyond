function hexadecimalToDecimal(hex) {
    let steps = [];
    let decimal = 0;
    let power = hex.length - 1;

    steps.push(`Hexadecimal number: ${hex}`);

    for (let i = 0; i < hex.length; i++) {
        let digit = parseInt(hex[i], 16);
        let value = digit * Math.pow(16, power);

        steps.push(
            `${hex[i]} × 16^${power} = ${value}`
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
