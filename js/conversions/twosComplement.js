function twosComplement(binary) {
    let steps = [];

    steps.push(`Original binary number: ${binary}`);

    // Step 1: 1's complement
    let onesComp = binary
        .split("")
        .map(bit => bit === "0" ? "1" : "0")
        .join("");

    steps.push(`Step 1: 1's Complement (invert bits): ${onesComp}`);

    // Step 2: Add 1
    let addOneResult = binaryAddition(onesComp, "1");

    steps.push(`Step 2: Add 1 to 1's complement`);
    steps.push(...addOneResult.steps);

    steps.push(`2's Complement = ${addOneResult.result}`);

    return {
        result: addOneResult.result,
        steps
    };
}
