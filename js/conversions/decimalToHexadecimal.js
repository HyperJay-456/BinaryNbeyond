function decimalToHexadecimal(decimal) {
    let steps = [];
    let number = decimal;
    let hex = "";
    const hexMap = "0123456789ABCDEF";

    steps.push(`Decimal number: ${decimal}`);

    if (decimal === 0) {
        return {
            result: "0",
            steps: ["0 in hexadecimal is 0"]
        };
    }

    while (number > 0) {
        let remainder = number % 16;
        let hexDigit = hexMap[remainder];

        steps.push(
            `${number} ÷ 16 = ${Math.floor(number / 16)}, Remainder = ${remainder} (${hexDigit})`
        );

        hex = hexDigit + hex;
        number = Math.floor(number / 16);
    }

    steps.push(`Final Hexadecimal Value = ${hex}`);

    return {
        result: hex,
        steps: steps
    };
}
