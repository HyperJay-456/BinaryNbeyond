function binaryToOctal(binary) {
    let steps = [];
    let paddedBinary = binary;

    while (paddedBinary.length % 3 !== 0) {
        paddedBinary = "0" + paddedBinary;
    }

    steps.push(`Padded binary: ${paddedBinary}`);

    let groups = paddedBinary.match(/.{1,3}/g);
    steps.push(`Grouped binary digits: ${groups.join(" ")}`);

    let octal = "";

    groups.forEach(group => {
        let decimal = 0;
        for (let i = 0; i < 3; i++) {
            decimal += parseInt(group[i]) * Math.pow(2, 2 - i);
        }
        steps.push(`(${group})₂ = ${decimal}₈`);
        octal += decimal;
    });

    steps.push(`Final Octal Value = ${octal}`);

    return {
        result: octal,
        steps: steps
    };
}
