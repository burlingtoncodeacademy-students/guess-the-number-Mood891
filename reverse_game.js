const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
    });
}

start();

async function start() {
    console.log(
    "Let's play a game where I pick a number and you try to guess it."
    );

  // Generate a random number between 1 and 100 for the user to guess
  let secretNumber = Math.floor(Math.random() * 100) + 1;
    console.log("I'm thinking of a number between 1 and 100. Try to guess it!");

    let guess = await ask("What is your guess? ");
    let tries = 1;

    while (parseInt(guess) !== secretNumber) {
    if (isNaN(parseInt(guess))) {
        console.log("Invalid input. Please enter a number.");
    } else if (parseInt(guess) < secretNumber) {
        guess = await ask("Too low. Guess again: ");
    } else {
        guess = await ask("Too high. Guess again: ");
    }
    tries++;
}

console.log(
    `Congratulations, you guessed it! The number was ${secretNumber}. It took you ${tries} ${
    tries === 1 ? "try" : "tries"
    } to find it.`
    );

  // Ask user if they want to play again
    let playAgain = await ask("Do you want to play again? (yes/no) ");
    if (playAgain.toLowerCase() === "yes") {
    console.log("\nRestarting game...\n");
    await playGame();
    } else {
    console.log("\nThanks for playing!");
    process.exit();
    }
}
