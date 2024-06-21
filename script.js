/*let randomNum = Math.floor(Math.random() * 100) + 1;

//if number is lower or higher
const lowhi = document.querySelector(".highlow");
// number which User guesses
const guessednumber = document.querySelector(".numberGuess");
// how many guesses are left
const guess = document.querySelector("remainingGuesses")
// submit the stuff
const submit = document.querySelector(".checkBtn");

console.log(randomNum)

if (randomNum == guessednumber) {
    lowhi.innerHTML = 'You guessed right!! the number was ';
    console.log("kakka1");
}
else if (randomNum < guessednumber) {
    lowhi.innerHTML = 'Too high';
    console.log("kakka2");
}
else if (randomNum > guessednumber) {
    lowhi.innerHTML = 'Too low';
    console.log("kakka3");
}*/

const minNum = 1;
const maxNum = 100;
const ranNum = Math.floor(Math.random() * (maxNum - minNum));
const checkBtn = document.getElementById("checkBtn");
const retryBtn = document.getElementById("retryBtn")

let guess = document.getElementById("guess");
let guesses = 10;
let remainingGuess = document.getElementById("remainingGuesses");
let highlow = document.getElementById("highlow");

let right = true;

console.log(ranNum);

checkBtn.addEventListener("click", function(){
    console.log("Button was pressed");
    if(guesses > 0) {
        guesses --;
        remainingGuess.innerHTML = guesses;
    }
    if(guesses == 0) {
        highlow.innerHTML = "Game Over";
    }
    
});

retryBtn.addEventListener("click", function(){
    
});