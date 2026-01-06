function decimalToBase(decimal, toBase) {
    switch (toBase) {
        case "decimal":
            return {
                result: decimal.toString(),
                steps: [`Final Decimal Value = ${decimal}`]
            };

        case "binary":
            return decimalToBinary(decimal);

        case "octal":
            return decimalToOctal(decimal);

        case "hexadecimal":
            return decimalToHexadecimal(decimal);

        default:
            throw new Error("Unsupported base");
    }
}