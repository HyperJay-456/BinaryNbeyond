function baseToDecimal(input, fromBase) {
    switch (fromBase) {
        case "decimal":
            return {
                result: parseInt(input),
                steps: [`Decimal number: ${input}`]
            };

        case "binary":
            return binaryToDecimal(input);

        case "octal":
            return octalToDecimal(input);

        case "hexadecimal":
            return hexadecimalToDecimal(input.toUpperCase());

        default:
            throw new Error("Unsupported base");
    }
}