let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const playAgainBtn = document.querySelector("#play-again");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const checkGameEnd = () => {
  if (userScore === 10) {
    msg.innerText = "Congratulations! You won the game.";
    msg.style.backgroundColor = "blue";
    disableChoices(); // Disable user choices
    playAgainBtn.style.display = "block"; // Show "Play Again" button
  } else if (compScore === 10) {
    msg.innerText = "Sorry, you lost. Computer won the game.";
    msg.style.backgroundColor = "black";
    disableChoices(); // Disable user choices
    playAgainBtn.style.display = "block"; // Show "Play Again" button
  }
};

const disableChoices = () => {
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none"; // Disable pointer events (no clicking)
    choice.disabled = true; // Disable the buttons (for extra safety)
  });
};

const enableChoices = () => {
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto"; // Enable pointer events (allow clicking)
    choice.disabled = false; // Enable the buttons
  });
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
    checkGameEnd(); // Check if the game should end after each round
  }
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Game reset. Make your move!";
  msg.style.backgroundColor = "#081b31";
  playAgainBtn.style.display = "none"; // Hide "Play Again" button
  enableChoices(); // Re-enable user choices
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

playAgainBtn.addEventListener("click", resetGame); // Reset game when "Play Again" is clicked
