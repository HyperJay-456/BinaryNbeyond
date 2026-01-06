function binaryToDecimal(binary) {
    let steps = [];
    let decimal = 0;
    let power = binary.length - 1;

    steps.push(`Binary number: ${binary}`);

    for (let i = 0; i < binary.length; i++) {
        let bit = parseInt(binary[i]);
        let value = bit * Math.pow(2, power);

        steps.push(
            `${binary[i]} × 2^${power} = ${value}`
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
