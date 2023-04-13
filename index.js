const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
return new Promise((resolve, reject) => {
rl.question(questionText, resolve);
});
}

start();

async function start() {
console.log("Which game do you want to play?");

let gameChoice = await ask("Enter '1' to play 'Guess the Number' or '2' to play 'Guess My Number': ");
//icebox: choosing wich game to play
if (gameChoice === "1") {
console.log("Let's play a game where you make up a number and I try to guess it!");
let highRange = await ask("Please enter the highest number for the range: "); //correlates with the Extend the Guess Range story in Github
highRange = parseInt(highRange);

  while (isNaN(highRange) || highRange <= 1) {
    highRange = await ask("Invalid input. Please enter a number greater than 1 for the high range: ");
    highRange = parseInt(highRange);
  }

  console.log(`You have selected a range between 1 and ${highRange}.`); //correlates with the Extend the Guess Range story in Github
  
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  let min = 1;
  let max = highRange; //initally this had avalue of 100, but as i got further in the project, the new value shown correlates with the Extend the Guess Range story in Github
  let guess = Math.floor((min + max) / 2);
  let answer = await ask(`Is your number ${guess}? `);
  let tries = 1;
  const maxTries = Math.ceil(Math.log2(max)) + 1; // calculate maximum number of guesses allowed; correlates with the "Make it Smarter" story

  while (answer.toLowerCase() !== "yes" && tries <= maxTries) {
    if (answer.toLowerCase() === "no") { //"computer guessed wrong" story
      let hint = await ask("Is your number higher (h) or lower (l) than my guess? "); //correlates with "modify your guess range" story

      // If the hint contradicts the earlier response, complain and ask again
      if ((hint === "h" && guess >= max) || (hint === "l" && guess <= min)) {
        console.log(`You cheated! You said it was ${hint === "h" ? "higher" : "lower"} than ${hint === "h" ? guess - 1 : guess + 1}, so it can't also be ${hint === "h" ? "higher" : "lower"} than ${hint === "h" ? max : min}.`);
      }

      if (hint.toLowerCase() === "h") {
        min = guess + 1;
      } else if (hint.toLowerCase() === "l") {
        max = guess - 1;
      }
    } else {
      console.log("Invalid answer. Please enter 'yes' or 'no'.");
    }

    guess = Math.floor((min + max) / 2);
    answer = await ask(`Is your number ${guess}? `);
    tries++;
  } //the previous 'guess' and 'answer' on lines 32 & 32 are block-scoped and only accessible within the block of code where they are declared. in lines 54-56, I had it so they can be accessed anywhere in the code

  if (tries <= maxTries) {
    console.log(`I knew it! Your secret number is ${guess}. It took me ${tries} ${tries === 1 ? 'try' : 'tries'} to find it.`); //"victory message" + icebox "how many tries" section
  } else {
    console.log(`Sorry, I couldn't guess your number in ${maxTries} tries.`);
  }

  let playAgain = await ask("Do you want to play again? (yes/no) "); //icebox point #1
  if (playAgain.toLowerCase() === "yes") {
    start();
  } else {
    console.log("Thanks for playing! Goodbye.");
    process.exit();
  }
}

if (gameChoice === "2") {
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
}