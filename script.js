let randomNum = Math.floor(Math.random() * 100) + 1;

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
}