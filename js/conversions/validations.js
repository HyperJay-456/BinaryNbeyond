function validateInput(input, base) {
    switch (base) {
        case "binary":
            return /^-?[01]+$/.test(input);

        case "octal":
            return /^-?[0-7]+$/.test(input);

        case "decimal":
            return /^-?[0-9]+$/.test(input);

        case "hexadecimal":
            return /^-?[0-9A-Fa-f]+$/.test(input);

        default:
            return false;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateInput };
}
