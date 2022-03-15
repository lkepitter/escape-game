const gameField = document.getElementById("gameField");
//We have to establish the rendering context in order to draw to the canvas. In this case, we want to render 2D objects.
const ctx = gameField.getContext("2d");

//BALL
//define x and y axis starting positions, to use for calculating movement positions
let x = gameField.width / 2;
let y = gameField.height - 30;

//define updates for x and y to be called later
let directionX = 2;
let directionY = -2;

//define ball radius for collision detection
let ballRadius = 10;
let ballR = 0;
let ballG = 149;
let ballB = 221;
let ballRChange = 30;
let ballGChange = 30;
let ballSpeed = 1;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${ballR}, ${ballG}, ${ballB}, 1)`;
  ctx.fill();
  ctx.closePath();
}

//PADDLE
let paddleHeight = 10;
let paddleWidth = 50;
let paddleX = (gameField.width - paddleWidth) / 2;
let paddleSpeed = 6;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, gameField.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//BRICKS
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 45;
let brickHeight = 10;
//padding between the bricks so they won't touch each other
let brickPadding = 5;
//a top and left offset so they won't start being drawn right from the edge of the Canvas.
let brickOffsetTop = 5;
let brickOffsetLeft = 20;

//To create the bricks, we're going to use a 2D array
let bricks = [];
//We're going to loop through until we have the same number of columns, defined by our ColumnCount variable.
for (let column = 0; column < brickColumnCount; column++) {
  //Each column is also an array.
  bricks[column] = [];
  //Then for each column, we're also going to loop through until we have our given number of rows.
  for (let row = 0; row < brickRowCount; row++) {
    //And each row is going to contain an object with the property for our X and Y axes, representing the brick position.
    //The status property represents if the brick is on or off (i.e. if it's been destroyed by the ball or not)
    bricks[column][row] = { x: 0, y: 0, status: 1 };
  }
}

//Now we need to draw each brick with a function.
function drawBricks() {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      //Check if the current brick is destroyed or not. If it's not (status 1), draw it.
      if (bricks[column][row].status === 1) {
        //declare two variables to calculate the new brick position, based on the previous one.
        //times the current position by the size and padding (and offset) of the brick so we know it's the next one along.
        let brickX = column * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
        //loop through each column and each row and set X and Y to new brick position.
        bricks[column][row].x = brickX;
        bricks[column][row].y = brickY;
        //draw a brick at the current array position
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//A function to calculate collision detection for the bricks
function collisionDetection() {
  // for each position in our bricks table
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      //declare a current brick variable for better readability
      let brick = bricks[column][row];
      //check if the brick should have collision (i.e. if its status is 1)
      if (brick.status === 1) {
        // calculate if the centre of the ball is inside the coordinates of the brick
        //This is true if the ball x is greater than brick x (i.e. it has passed the brick's x), but less than brick x + brick's width (i.e. it's inside the brick's width)
        //It also has to have the ball y greater than the brick y, but less than brick y plus it's height
        if (
          x > brick.x &&
          x < brick.x + brickWidth &&
          y > brick.y &&
          y < brick.y + brickHeight
        ) {
          //Then make the ball bounce downwards
          directionY = -directionY;
          //And set the hit brick's status to 0 (destroyed)
          brick.status = 0;
        }
      }
    }
  }
}

// Two variables for storing information on whether the left or right control button is pressed.
let rightPressed = false;
let leftPressed = false;

//In order to simulate movement, we have to redraw our sprites repeatedly, which we can do using setInterval.
function draw() {
  //Before we begin drawing, clear the gameField each frame.
  ctx.clearRect(0, 0, gameField.width, gameField.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  //set what happens if the ball collides with each wall
  //If the current Y position plus the movement position would reach 0 (the top), or if it's greater than the height of the field, change direction.
  //We use the ball's radius so that the movement changes direction when the edge of the ball hits the outside, rather than the centre.
  //   if (
  //     y + directionY < ballRadius ||
  //     y + directionY > gameField.height - ballRadius
  //   )
  //Now we're adding a game over state, where if the ball touches the bottom, you lose. So it should only bounce at the top of Y
  if (y + directionY < ballRadius) {
    directionY = -directionY;
    //As a bonus challenge, change the colour of the ball when it touches a side
    if (ballR >= 255 || ballR < 0) {
      ballRChange = -ballRChange;
    }
    ballR = ballR + ballRChange;
  } else if (y + directionY > gameField.height - ballRadius) {
    //If the ball gets to the bottom
    //Check if its X position is between the paddle's X position and the paddle's width
    if (x > paddleX && x < paddleX + paddleWidth) {
      //If it is, bounce it.
      directionY = -directionY;
      //bonus challenge: make the speed of the ball increase with each paddle bounce
      //ballSpeed = ballSpeed + 0.1;
    } else {
      //if it's not in position with the paddle, it's game over
      alert("GAME OVER");
      //reload the page to restart
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
    }
  }
  //do the same for x
  if (
    x + directionX < ballRadius ||
    x + directionX > gameField.width - ballRadius
  ) {
    directionX = -directionX;
    if (ballG >= 255 || ballG < 0) {
      ballGChange = -ballGChange;
    }
    ballG = ballG + ballGChange;
  }

  //Paint a new ball sprite on each frame, using our variables.
  x += directionX * ballSpeed;
  y += directionY * ballSpeed;
  // handle the player Paddle movement
  //If right key is pressed, move the paddle paddleSpeed pixels to the right. If it hits the full width minus the paddle width, stop.
  if (rightPressed) {
    paddleX += paddleSpeed;
    if (paddleX + paddleWidth > gameField.width) {
      paddleX = gameField.width - paddleWidth;
    }
  }
  //Do the same for the left key, but move to the left. If we hit X 0 we're at the left edge and stop.
  else if (leftPressed) {
    paddleX -= paddleSpeed;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
// Two functions handling the keydown and keyup events  the code that will be run when the buttons are pressed.
// When right or left are pressed, change those variables to TRUE
//ArrowRight and ArrowLeft are used in most browsers, but IE/Edge use Left and Right
function keyDownHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = true;
  }
}
//When the keys are released, change the variables to FALSE
function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = false;
  }
}

setInterval(draw, 10);
