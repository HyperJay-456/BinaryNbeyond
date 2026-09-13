function binaryToDecimal(binary) {
    let steps = [];
    let isNegative = binary.startsWith('-');
    let binNum = isNegative ? binary.substring(1) : binary;
    
    let decimal = 0;
    let power = binNum.length - 1;

    steps.push(`Binary number: ${binary}`);

    for (let i = 0; i < binNum.length; i++) {
        let bit = parseInt(binNum[i]);
        let value = bit * Math.pow(2, power);

        steps.push(
            `${binNum[i]} × 2^${power} = ${value}`
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
    module.exports = { binaryToDecimal };
}
