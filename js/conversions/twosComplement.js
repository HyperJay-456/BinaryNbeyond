function twosComplement(binary, bitWidth = null) {
    let clean = String(binary ?? "").trim();
    let isNeg = clean.startsWith("-");
    if (isNeg) clean = clean.substring(1);
    clean = clean.replace(/[^01]/g, "");

    if (!clean) clean = "0";

    // If bitWidth is specified and larger than string length, pad with leading zeroes
    if (bitWidth && bitWidth > clean.length) {
        clean = clean.padStart(bitWidth, "0");
    }

    let steps = [];
    steps.push(`Original binary number: ${clean}`);

    // Step 1: 1's complement (invert bits)
    let onesComp = clean
        .split("")
        .map(bit => (bit === "0" ? "1" : "0"))
        .join("");

    steps.push(`Step 1: 1's Complement (invert bits): ${onesComp}`);

    // Step 2: Add 1
    const fnAdd = typeof binaryAddition !== "undefined" ? binaryAddition : (typeof require !== "undefined" ? require("./binaryAddition.js").binaryAddition : null);
    let addOneResult = fnAdd ? fnAdd(onesComp, "1") : { result: "1", steps: [] };
    let rawResult = addOneResult.result;

    steps.push(`Step 2: Add 1 to 1's complement`);
    steps.push(...addOneResult.steps);

    // If fixed bitWidth specified, keep lowest bitWidth bits
    let finalResult = rawResult;
    if (bitWidth && finalResult.length > bitWidth) {
        finalResult = finalResult.slice(-bitWidth);
        steps.push(`Preserve ${bitWidth} bits (discard overflow carry): ${finalResult}`);
    }

    steps.push(`2's Complement = ${finalResult}`);

    return {
        result: finalResult,
        steps
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { twosComplement };
}
