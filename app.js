// Game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else if (guess === winningNum) {
    //Game over - won
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // Game continues - answer wrong
      guessInput.style.borderColor = "red";

      //Clear input
      guessInput.value = "";
      setMessage(`${guess} not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  // Set msg
  setMessage(msg);

  // Play again
  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

// setMessage func
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
