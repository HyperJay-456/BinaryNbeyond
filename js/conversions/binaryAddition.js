function binaryAddition(bin1, bin2) {
    let s1 = String(bin1 ?? "").trim();
    let s2 = String(bin2 ?? "").trim();

    // Remove any leading + or non-binary chars
    s1 = s1.replace(/[^01]/g, "");
    s2 = s2.replace(/[^01]/g, "");

    if (!s1) s1 = "0";
    if (!s2) s2 = "0";

    let steps = [];
    let carry = 0;
    let result = "";

    // Pad shorter number
    let maxLen = Math.max(s1.length, s2.length);
    let p1 = s1.padStart(maxLen, "0");
    let p2 = s2.padStart(maxLen, "0");

    steps.push(`Align both binary numbers`);
    steps.push(`${p1}`);
    steps.push(`+ ${p2}`);
    steps.push(`----------------`);

    // Right to left addition
    for (let i = maxLen - 1; i >= 0; i--) {
        let bit1 = parseInt(p1[i], 10);
        let bit2 = parseInt(p2[i], 10);
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

if (typeof module !== "undefined" && module.exports) {
    module.exports = { binaryAddition };
}
