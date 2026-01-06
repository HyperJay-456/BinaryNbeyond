function binaryAddition(bin1, bin2) {
    let steps = [];
    let carry = 0;
    let result = "";

    // Pad shorter number
    let maxLen = Math.max(bin1.length, bin2.length);
    bin1 = bin1.padStart(maxLen, "0");
    bin2 = bin2.padStart(maxLen, "0");

    steps.push(`Align both binary numbers`);
    steps.push(`${bin1}`);
    steps.push(`+ ${bin2}`);
    steps.push(`----------------`);

    // Right to left addition
    for (let i = maxLen - 1; i >= 0; i--) {
        let bit1 = parseInt(bin1[i]);
        let bit2 = parseInt(bin2[i]);
        let sum = bit1 + bit2 + carry;

        let resultBit = sum % 2;
        let newCarry = Math.floor(sum / 2);

        steps.push(
            `Position ${maxLen - i}: ${bit1} + ${bit2} + Carry(${carry}) = ${sum} → Result=${resultBit}, Carry=${newCarry}`
        );

        result = resultBit + result;
        carry = newCarry;
    }

    if (carry) {
        result = carry + result;
        steps.push(`Final carry ${carry} added to MSB`);
    }

    steps.push(`Final Binary Sum = ${result}`);

    return {
        result,
        steps
    };
}
