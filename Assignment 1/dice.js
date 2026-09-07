import crypto from "crypto";

function rollDice() {
    return crypto.randomInt(1, 7);
}

for (let i = 1; i <= 5; i++) {
    console.log(`Roll ${i}: ${rollDice()}`);
}