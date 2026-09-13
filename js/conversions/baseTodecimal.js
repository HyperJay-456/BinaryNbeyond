function baseToDecimal(input, fromBase) {
  let fnBinary = typeof binaryToDecimal !== "undefined" ? binaryToDecimal : (typeof require !== "undefined" ? require("./binaryToDecimal.js").binaryToDecimal : null);
  let fnOctal = typeof octalToDecimal !== "undefined" ? octalToDecimal : (typeof require !== "undefined" ? require("./octalToDecimal.js").octalToDecimal : null);
  let fnHex = typeof hexadecimalToDecimal !== "undefined" ? hexadecimalToDecimal : (typeof require !== "undefined" ? require("./hexadecimalToDecimal.js").hexadecimalToDecimal : null);

  switch (fromBase) {
    case "decimal":
      return {
        result: parseInt(input, 10),
        steps: [`Decimal number: ${input}`]
      };

    case "binary":
      return fnBinary ? fnBinary(input) : { result: NaN, steps: [] };

    case "octal":
      return fnOctal ? fnOctal(input) : { result: NaN, steps: [] };

    case "hexadecimal":
      return fnHex ? fnHex(input.toUpperCase()) : { result: NaN, steps: [] };

    default:
      throw new Error("Unsupported base");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { baseToDecimal };
}
