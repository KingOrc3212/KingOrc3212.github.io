// number guessing game code

const checkBtn = document.getElementById("checkBtn");
const retryBtn = document.getElementById("retryBtn");

let ranNum = randomNumberGenerator();
let guess = document.getElementById("guess");
let guesses = 10;
let remainingGuess = document.getElementById("remainingGuesses");
let highlow = document.getElementById("highlow");
let text = document.getElementById("guessedNum");

function randomNumberGenerator() {
    const num = Math.floor(Math.random() * (100 - 1));
    return num;
}

checkBtn.addEventListener("click", function(){
    const inputValue = guess.value;
    const value = parseInt(inputValue);

    if(isNaN(value) == false){
        prevGuesses = guesses;

        if(inputValue > ranNum) {
            highlow.innerHTML = "Your guess is too high";
        }
        if(inputValue < ranNum) {
            highlow.innerHTML = "Your guess is too low";
        }
        if(inputValue == ranNum) {
            highlow.innerHTML = "Your Guess is correct! You win";
        }
    
        if(guesses > 0) {
            guesses --;
            remainingGuess.innerHTML = guesses;
        }
        if(prevGuesses > 0) {
            text.textContent += guess.value + " ";
        }
        if(guesses == 0) {
            highlow.innerHTML = "Game Over";
        }

    } else if(isNaN(value) == true) {
        highlow.innerHTML = "Add a number to the input field";
    }
    
});

retryBtn.addEventListener("click", function(){
    guess.value = "";
    guesses = 10;
    remainingGuess.innerHTML = "10";
    text.innerHTML = ""
    highlow.innerHTML = "Hints are shown here";
    ranNum = randomNumberGenerator();
});