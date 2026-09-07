function calc(method) {
    const num1 = Number(process.argv[3]);
    const num2 = Number(process.argv[4]);

    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Please enter valid numbers";
    }

    if (method === "add") {
        return num1 + num2;
    }

    if (method === "subtract") {
        return num1 - num2;
    }

    if (method === "multiply") {
        return num1 * num2;
    }

    if (method === "divide") {
        if (num2 === 0) {
            return "Cannot divide by 0";
        }

        return num1 / num2;
    }

    return "Invalid operation";
}

console.log(calc(process.argv[2]));