function decimalToBase(decimal, toBase) {
    let fnBinary = typeof decimalToBinary !== "undefined" ? decimalToBinary : (typeof require !== "undefined" ? require("./decimalToBinary.js").decimalToBinary : null);
    let fnOctal = typeof decimalToOctal !== "undefined" ? decimalToOctal : (typeof require !== "undefined" ? require("./decimalToOctal.js").decimalToOctal : null);
    let fnHex = typeof decimalToHexadecimal !== "undefined" ? decimalToHexadecimal : (typeof require !== "undefined" ? require("./decimalToHexadecimal.js").decimalToHexadecimal : null);

    switch (toBase) {
        case "decimal":
            return {
                result: decimal.toString(),
                steps: [`Final Decimal Value = ${decimal}`]
            };

        case "binary":
            return fnBinary ? fnBinary(decimal) : { result: "", steps: [] };

        case "octal":
            return fnOctal ? fnOctal(decimal) : { result: "", steps: [] };

        case "hexadecimal":
            return fnHex ? fnHex(decimal) : { result: "", steps: [] };

        default:
            throw new Error("Unsupported base");
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { decimalToBase };
}