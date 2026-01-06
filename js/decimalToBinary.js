function decimalToBinary(decimal) {
    let steps = [];
    let number = decimal;
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

    steps.push(`Final Binary Value = ${binary}`);

    return {
        result: binary,
        steps: steps
    };
}
