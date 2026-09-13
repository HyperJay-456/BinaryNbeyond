function decimalToBinary(decimal) {
    let steps = [];
    let isNegative = decimal < 0;
    let number = Math.abs(decimal);
    let binary = "";

    steps.push(`Decimal number: ${decimal}`);

    if (decimal === 0) {
        return {
            result: "0",
            steps: ["0 in binary is 0"]
        };
    }

    while (number > 0) {
        let remainder = number % 2;
        steps.push(`${number} ÷ 2 = ${Math.floor(number / 2)}, Remainder = ${remainder}`);
        binary = remainder + binary;
        number = Math.floor(number / 2);
    }

    if (isNegative) {
        binary = "-" + binary;
        steps.push(`Apply negative sign: -${binary.substring(1)}`);
    }

    steps.push(`Final Binary Value = ${binary}`);

    return {
        result: binary,
        steps: steps
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { decimalToBinary };
}
