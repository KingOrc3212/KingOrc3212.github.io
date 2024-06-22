/*  flappy bird code  */


// board variables
let board;
let boardHeight = 640;
let boardWidth = 360;
let context;

// bastard stuff
let bastardWidth = 34; // width/height ratio = 408/228 = 17/12
let bastardHeight = 24;
let bastardX = boardWidth / 8;
let bastardY = boardHeight / 5  ;
let bastardImage;

let bastard = {
    x : bastardX,
    y : bastardY,
    width : bastardWidth,
    height : bastardHeight
}

// green poop
let poopArray = [];
let poopWidth = 64; // width/height ratio = 384/3072 = 1/8
let poopHeight = 512;
let poopX = boardWidth;
let poopY = 0;

let topPoopImg;
let bottomPoopImg;


// game physics stuff
let velocityX = -2 // pipe left moving speed
let velocityY = 0 // bird jump speed
let gravity = 0.4 // gravity at which the bird is pulled down

// game stuff
let gameOver = false;
let score = 0;
let highScore = document.cookie;

const retryBtn = document.getElementById("retryBtn");

//window stuff
window.onload = function() {
    board = document.getElementById("gameBoard");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    // drawing the bastard
    //context.fillStyle = "green";
    //context.fillRect(bastard.x, bastard.y, bastard.width, bastard.height);

    // loading the images
    bastardImage = new Image();
    bastardImage.src = "./src/flappybird.png";
    bastardImage.onload = function() {
        context.drawImage(bastardImage, bastard.x, bastard.y, bastard.width, bastard.height)
    }

    topPoopImg = new Image();
    topPoopImg.src = "./src/toppipe.png";

    bottomPoopImg = new Image();
    bottomPoopImg.src = "./src/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePoops, 1500); // every 1,5 seconds
    // input checker
    document.addEventListener("keydown", moveBastard);
    board.addEventListener("click", clickMove);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0,0, boardWidth, boardHeight)

    //bastard
    velocityY += gravity; 
    //bastard.y += velocityY;
    bastard.y = Math.max(bastard.y + velocityY, 0); // apply gravity to current y, limits the y axis  to the top of canvas size    
    context.drawImage(bastardImage, bastard.x, bastard.y, bastard.width, bastard.height);

    if (bastard.y > boardHeight) {
        gameOver = true; 
    }
    
    //poop
    for (let i = 0; i < poopArray.length; i++) {

        let poop = poopArray[i];
        poop.x += velocityX;
        context.drawImage(poop.img, poop.x, poop.y,poop.width, poop.height);;

        if (!poop.passed && bastard.x > poop.x + poop.width) {
            score += 0.5; // 0.5 because its one pipe is 0.5 points so then because it calculates two its gonna be 1
            poop.passed = true;
        }

        if (collision(bastard, poop)) {
            gameOver = true;
        }
    }

    // clearing poop
    while (poopArray.length > 0 && poopArray[0].x < -poopWidth  ) {
        poopArray.shift(); // removes first element from poopArray
    }

    //score
    context.fillStyle = "white";
    context.font="30px sans-serif";

    context.fillText("Best:",10,40);
    context.fillText(highScore,85,42);
    context.fillText("Score:",10,75);
    context.fillText(score,104,76);

    if (gameOver) {
        context.font="45px sans-serif";
        context.fillText("Game Over",60,150);
    }

    if (document.cookie  == 0){
        highScore = 0;
    }

    if (score > highScore) {
        highScore = score;
        scoreCookie(highScore);
    }
}

function placePoops() {

    if (gameOver) {
        return;
    }

    // (0-1) * poopHeight / 2
    // 0 -> -128 (poopHeight/4)
    // 1 -> -128 -256 (poopHeight/4 - poop/height/2) = -3/4 poopHeight
    let ranPoopY = poopY - poopHeight/4 - Math.random() * (poopHeight/2);
    let opening = board.height / 4;

    let topPoop = {
        img : topPoopImg,
        x : poopX,
        y : ranPoopY,
        width : poopWidth,
        height : poopHeight,
        passed : false
    }
    poopArray.push(topPoop);

    let bottomPoop = {
        img : bottomPoopImg,
        x : poopX,
        y : ranPoopY + poopHeight + opening,
        width : poopWidth,
        height : poopHeight,
    }
    poopArray.push(bottomPoop);
}

function moveBastard(e) {
    if  (e.code == "Space" || e.code == "ArrowUp") {
        // jump
        velocityY = -6;

        if (gameOver) {
            bastard.y = bastardY;
            poopArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function clickMove() {
    velocityY = -6;
    if (gameOver) {
        bastard.y = bastardY;
        poopArray = [];
        score = 0;
        gameOver = false;
    }
}

function collision(a, b) {
    return a.x < b.x + b.width && 
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

function scoreCookie(a) {
    document.cookie = a + "; samesite=strict; secure; path=/;"; // 
    let x = document.cookie; 
}