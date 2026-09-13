function generateRandomNumber(base) {
    switch (base) {
        case "binary":
            return Math.floor(Math.random() * 64).toString(2);
        case "decimal":
            return Math.floor(Math.random() * 100).toString();
        case "octal":
            return Math.floor(Math.random() * 64).toString(8);
        case "hexadecimal":
            return Math.floor(Math.random() * 255).toString(16).toUpperCase();
        default:
            return "0";
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { generateRandomNumber };
}
