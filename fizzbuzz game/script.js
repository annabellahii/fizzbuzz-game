// Declare game variables
let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;  // Get high score from localStorage
let timerElement = document.getElementById('timer');
let timeRemaining = 30;
let randomNumberElement = document.querySelector('.rand-num h3');

// Random number generator function
function generateRandomNumber() {
  let number = Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
  // Make sure it's divisible by 3, 5, or both
  while (number % 3 !== 0 && number % 5 !== 0) {
    number = Math.floor(Math.random() * 100) + 1;
  }
  return number;
}

// Update the game box with a new random number
function updateRandomNumber() {
  let number = generateRandomNumber();
  randomNumberElement.textContent = number;
  return number;
}

// Check answer and update score
function checkAnswer(number, answer) {
  let correctAnswer = '';
  if (number % 3 === 0 && number % 5 === 0) {
    correctAnswer = 'fizzbuzz';
  } else if (number % 3 === 0) {
    correctAnswer = 'fizz';
  } else if (number % 5 === 0) {
    correctAnswer = 'buzz';
  }

  if (answer === correctAnswer) {
    currentScore += 10; // Increment score by 10 for correct answer
  }
}

// Handle button click
document.getElementById('fizz').addEventListener('click', function () {
  let number = parseInt(randomNumberElement.textContent);
  checkAnswer(number, 'fizz');
  updateRandomNumber(); // Update number after each click
});

document.getElementById('buzz').addEventListener('click', function () {
  let number = parseInt(randomNumberElement.textContent);
  checkAnswer(number, 'buzz');
  updateRandomNumber();
});

document.getElementById('fizzbuzz').addEventListener('click', function () {
  let number = parseInt(randomNumberElement.textContent);
  checkAnswer(number, 'fizzbuzz');
  updateRandomNumber();
});

// Start the countdown timer
const countdownTimer = setInterval(function () {
  timerElement.textContent = timeRemaining;
  timeRemaining--;

  // When the timer reaches 0, stop the timer and redirect to final.html
  if (timeRemaining < 0) {
    clearInterval(countdownTimer);
    // Store score if it's higher than the current high score
    if (currentScore > highScore) {
      localStorage.setItem('highScore', currentScore); // Update high score
    }
    // Store current score in localStorage for final.html
    localStorage.setItem('score', currentScore);
    window.location.href = 'final.html';  // Redirect to final page
  }
}, 1000);

// Initial number display
updateRandomNumber();

