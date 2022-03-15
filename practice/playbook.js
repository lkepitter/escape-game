//RENDER CANVAS
const gameField = document.getElementById("gameField");
//We have to establish the rendering context in order to draw to the canvas. In this case, we want to render 2D objects.
const ctx = gameField.getContext("2d");

//SPRITE
//define x and y axis starting positions, to use for calculating movement positions
let spriteX = gameField.width / 2; //let paddleX = (gameField.width - paddleWidth) / 2;
let spriteY = gameField.height - 30;

//define updates for x and y to be called later
let spriteDirectionX = 2;
let spriteDirectionY = -2;

//define sprite radius / height and width for positioning and collision detection
let spriteRadius = 10;
let spriteHeight = 10;
let spriteWidth = 50;
let spriteR = 0;
let spriteG = 149;
let spriteB = 221;
let spriteRChange = 30;
let spriteGChange = 30;
let spriteSpeed = 1;

function drawSprite() {
  ctx.beginPath();
  //circle
  ctx.arc(spriteX, spriteY, spriteRadius, 0, Math.PI * 2);
  //rectangle
  ctx.rect(spriteX, gameField.height - spriteHeight, spriteWidth, spriteHeight);
  ctx.fillStyle = `rgba(${spriteR}, ${spriteG}, ${spriteB}, 1)`;
  ctx.fill();
  ctx.closePath();
}

//OBSTACLES
let obstacleRowCount = 3;
let obstacleColumnCount = 5;
let obstacleWidth = 45;
let obstacleHeight = 10;
//padding between the obstacles so they won't touch each other
let obstaclePadding = 5;
//a top and left offset so they won't start being drawn right from the edge of the Canvas.
let obstacleOffsetTop = 5;
let obstacleOffsetLeft = 20;

//TABLE OF OBSTACLES
//To create the obstacles, we're going to use a 2D array
let obstacles = [];
//We're going to loop through until we have the same number of columns, defined by our ColumnCount variable.
for (let column = 0; column < obstacleColumnCount; column++) {
  //Each column is also an array.
  obstacles[column] = [];
  //Then for each column, we're also going to loop through until we have our given number of rows.
  for (let row = 0; row < obstacleRowCount; row++) {
    //And each row is going to contain an object with the property for our X and Y axes, representing the obstacle position.
    //The status property represents if the obstacle is on or off (i.e. if it's been destroyed by the ball or not)
    obstacles[column][row] = { x: 0, y: 0, status: 1 };
  }
}

//Now we need to draw each obstacle with a function.
function drawObstacles() {
  for (let column = 0; column < obstacleColumnCount; column++) {
    for (let row = 0; row < obstacleRowCount; row++) {
      //Check if the current obstacle is destroyed or not. If it's not (status 1), draw it.
      if (obstacles[column][row].status === 1) {
        //declare two variables to calculate the new obstacle position, based on the previous one.
        //times the current position by the size and padding (and offset) of the obstacle so we know it's the next one along.
        let obstacleX =
          column * (obstacleWidth + obstaclePadding) + obstacleOffsetLeft;
        let obstacleY =
          row * (obstacleHeight + obstaclePadding) + obstacleOffsetTop;
        //loop through each column and each row and set X and Y to new obstacle position.
        obstacles[column][row].x = obstacleX;
        obstacles[column][row].y = obstacleY;
        //draw a obstacle at the current array position
        ctx.beginPath();
        ctx.rect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//COLLISION DETECTION - OBSTACLES
//A function to calculate collision detection for the obstacles
function collisionDetection() {
  // for each position in our obstacles table
  for (let column = 0; column < obstacleColumnCount; column++) {
    for (let row = 0; row < obstacleRowCount; row++) {
      //declare a current obstacle variable for better readability
      let obstacle = obstacles[column][row];
      //check if the obstacle should have collision (i.e. if its status is 1)
      if (obstacle.status === 1) {
        //If the sprite touches an obstacle, i.e. in the centre
        if (
          spriteX > obstacle.x &&
          spriteX < obstacle.x + obstacleWidth &&
          spriteY > obstacle.y &&
          spriteY < obstacle.y + obstacleHeight
        ) {
          // Do something
        }
      }
    }
  }
}
// COLLISION DETECTION - GAMEFIELD
//Vertical - Top
if (spriteY + spriteDirectionY < spriteRadius) {
  //Do something
}
//Vertical - Bottom
if (spriteY + spriteDirectionY > gameField.height - spriteRadius) {
  //Do something
}
//Horizontal - Left and right
if (
  spriteX + spriteDirectionX < spriteRadius ||
  spriteX + spriteDirectionX > gameField.width - spriteRadius
) {
  //Do something
}
//COLLISION DETECTION - PLAYER
//If the sprite touches the player
//Check if its X position is between the player's X position and the player's width
if (
  playerX + playerWidth / 2 >= spriteX - spriteRadius &&
  playerX <= spriteX + spriteRadius &&
  playerY + playerHeight / 2 >= spriteY - spriteRadius * 2 &&
  playerY <= spriteY + spriteRadius
) {
  // do something
}
//GAME OVER STATE
if (condition === true) {
  alert("GAME OVER");
  //reload the page to restart
  document.location.reload();
  clearInterval(interval); // Needed for Chrome to end game
}

//KEY VARIABLES
// Two variables for storing information on whether the left or right control button is pressed.
let rightPressed = false;
let leftPressed = false;

//GAMESTART
//In order to simulate movement, we have to redraw our sprites repeatedly, which we can do using setInterval.
function draw() {
  //Before we begin drawing, clear the gameField each frame.
  ctx.clearRect(0, 0, gameField.width, gameField.height);
  drawSprite();
  drawObstacles();
  collisionDetection();
  //Auto-movement
  spriteX += spriteDirectionX * spriteSpeed;
  spriteY += spriteDirectionY * spriteSpeed;
  // handle the player movement where the edge of the gameField is solid
  //If right key is pressed, move the player by speed pixels to the right. If it hits the full width minus the player width, stop.
  if (rightPressed) {
    spriteX += spriteSpeed;
    if (spriteX + spriteWidth > gameField.width) {
      spriteX = gameField.width - spriteWidth;
    }
  }
  //Do the same for the left key, but move to the left. If we hit X 0 we're at the left edge and stop.
  else if (leftPressed) {
    spriteX -= spriteSpeed;
    if (spriteX < 0) {
      spriteX = 0;
    }
  }
}

//KEY PRESSES
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

//SET FRAMERATE
setInterval(draw, 10);

//----------------
//BACKUP
//COLLISION
//loop through each obstacle in our array and check its position vs enemy position
//     for (let i = 0; i < obstacles.length - 1; i++) {
//       if (
//         enemyX > obstacles[i].x - enemyWidth &&
//         enemyY > obstacles[i].y + enemyHeight
//         //enemyX < obstacles[i].x + obstacles[i].width - enemyWidth
//       ) {
//         // bounce if it touches a wall
//         enemyDirX = -enemyDirX;
//         //enemyDirY = -enemyDirY;
//       }
//       if (
//         enemyY > obstacles[i].y &&
//         enemyY < obstacles[i].y + obstacles[i].height - enemyHeight
//       ) {
//         enemyDirY = -enemyDirY;
//       }
//     }
//   }
// }
