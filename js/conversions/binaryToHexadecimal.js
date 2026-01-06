function binaryToHexadecimal(binary) {
    let steps = [];
    let paddedBinary = binary;

    while (paddedBinary.length % 4 !== 0) {
        paddedBinary = "0" + paddedBinary;
    }

    steps.push(`Padded binary: ${paddedBinary}`);

    let groups = paddedBinary.match(/.{1,4}/g);
    steps.push(`Grouped binary digits: ${groups.join(" ")}`);

    const hexMap = "0123456789ABCDEF";
    let hex = "";

    groups.forEach(group => {
        let decimal = 0;
        for (let i = 0; i < 4; i++) {
            decimal += parseInt(group[i]) * Math.pow(2, 3 - i);
        }
        steps.push(`(${group})₂ = ${hexMap[decimal]}₁₆`);
        hex += hexMap[decimal];
    });

    steps.push(`Final Hexadecimal Value = ${hex}`);

    return {
        result: hex,
        steps: steps
    };
}
