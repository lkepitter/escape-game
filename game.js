//RENDER CANVAS
const gameField = document.getElementById("gameField");
const ctx = gameField.getContext("2d");
let gameOn = 1;

//UI
const textDisplay = document.getElementById("textDisplay");
const restartBtn = document.getElementById("restartBtn");
restartBtn.style.visibility = "hidden";

//PLAYER
let playerWidth = 10;
let playerHeight = 10;
let playerX = 25;
let playerY = 75;
let playerDirX = 2;
let playerDirY = -2;
let playerSpeed = 0.7;

let player = { health: 1, items: [] };
function drawPlayer() {
  if (player.health > 0) {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = `rgba(0, 100, 200, 1)`;
    ctx.fill();
    ctx.closePath();
  }
}

//OBSTACLES
let wallsCount = 9;
//Vertical wall
let vWallWidth = 20;
let vWallHeight = 45;
let vWallPadding = 0;
let vWallX = 70;
let vWallY = 0;
let vWallFarX = gameField.width - vWallWidth;
let vWallBtmY = gameField.height - vWallHeight;

//Horizontal wall
let hWallWidth = 50;
let hWallHeight = 20;
let hWallPadding = 0;
let hWallX = 70;
let hWallY = 0;
let hWallFarX = gameField.width - hWallWidth;
let hWallBtmY = gameField.height - hWallHeight;

let obstacles = [];
let newWall = 0;

function drawWall(posX, posY, obWidth, obHeight) {
  //store wall position in a variable for collision
  if (obstacles.length < wallsCount) {
    newWall = {
      x: posX,
      y: posY,
      width: obWidth,
      height: obHeight,
      // left: posX - obWidth / 2,
      // right: posX + obWidth / 2,
      // bottom: posY + obHeight / 2,
      // top: posY - obHeight / 2,
      left: posX,
      right: posX + obWidth * 2,
      bottom: posY + obHeight,
      top: posY,
    };
    obstacles.push(newWall);
  }
  ctx.beginPath();
  ctx.rect(posX, posY, obWidth, obHeight);
  ctx.fillStyle = `rgba(0, 0, 0, 1)`;
  ctx.fill();
  ctx.closePath();
}

//INTERACTIVE
//Key
let keyRadius = 3;
let keyX = 230;
let keyY = 80;
let key = { status: 0 };

//Door
let doorHeight = 5;
let doorWidth = 15;
let doorX = 25;
let doorY = 15;
let door = { status: 0 };

function drawInteractive() {
  if (key.status < 1) {
    ctx.beginPath();
    ctx.arc(keyX, keyY, keyRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220, 220, 0, 1)`;
    ctx.fill();
    ctx.closePath();
  }
  if (door.status < 1) {
    ctx.beginPath();
    ctx.rect(doorX, doorY, doorWidth, doorHeight);
    ctx.fillStyle = `rgba(220, 220, 0, 1)`;
    ctx.fill();
    ctx.closePath();
  }
}

//ENEMIES
//Basic enemy
let enemyWidth = 10;
let enemyHeight = 10;
let enemyRadius = 15;
let enemyX = 100;
let enemyY = 100;
let enemyDirX = 2;
let enemyDirY = 0;
let enemySpeed = 0.7;
//enemyMove - 1 = up, 2 = right, 3 = down, 4 = left
let enemyMove = 2;

function drawEnemyPositionTopLeft() {
  if (enemy.health > 0) {
    ctx.beginPath();
    ctx.rect(enemyX, enemyY, 1, 1);
    ctx.fillStyle = `rgba(0, 100, 200, 1)`;
    ctx.fill();
    ctx.closePath();
  }
}

function drawEnemyPositionTopRight() {
  if (enemy.health > 0) {
    ctx.beginPath();
    ctx.rect(enemyX + enemyWidth, enemyY, 1, 1);
    ctx.fillStyle = `rgba(0, 200, 200, 1)`;
    ctx.fill();
    ctx.closePath();
  }
}

function drawEnemyPositionBottomLeft() {
  if (enemy.health > 0) {
    ctx.beginPath();
    ctx.rect(enemyX, enemyY + enemyHeight, 1, 1);
    ctx.fillStyle = `rgba(400, 000, 200, 1)`;
    ctx.fill();
    ctx.closePath();
  }
}

function drawEnemyPositionBottomRight() {
  if (enemy.health > 0) {
    ctx.beginPath();
    ctx.rect(enemyX + enemyWidth, enemyY + enemyHeight, 1, 1);
    ctx.fillStyle = `rgba(300, 300, 10, 1)`;
    ctx.fill();
    ctx.closePath();
  }
}

//PLAN
//First, draw static walls/obstacles in the playing field that the player can't pass through
//Walls should touch each other or the gamefield wall
function drawObstacles() {
  drawWall(vWallX, vWallY, vWallWidth, vWallHeight);
  drawWall(vWallX + 50, vWallY, vWallWidth - 5, vWallHeight + 50);
  drawWall(hWallX - 70, hWallY, hWallWidth + 200, hWallHeight);
  drawWall(hWallX + 50, hWallY + 50, hWallWidth, hWallHeight);
  drawWall(vWallX, vWallBtmY, vWallWidth, vWallHeight);
  drawWall(vWallX + 50, vWallBtmY + 10, vWallWidth - 5, vWallHeight - 10);
  drawWall(hWallX, hWallBtmY + 5, hWallWidth + 100, hWallHeight - 5);
  drawWall(hWallX + 100, hWallY + 90, hWallWidth + 50, hWallHeight + 5);
  drawWall(vWallX + 130, vWallY + 50, vWallWidth, vWallHeight);
}
//Then, draw an enemy sprite that moves around, bouncing off walls
let enemy = { health: 1, x: enemyX, y: enemyY };
function drawEnemies() {
  if (enemy.health > 0) {
    ctx.beginPath();
    ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
    ctx.fillStyle = `rgba(150, 10, 0, 1)`;
    ctx.fill();
    ctx.closePath();
  }
}
//if moving 2, move 1, 3 or 4
function enemyMovement(direction) {
  let directions = [1, 2, 3, 4];
  const index = directions.indexOf(direction);
  if (index > -1) {
    directions.splice(index, 1);
  }
  let newDirection = parseInt(Math.random() * 4 + 1);
  while (newDirection === direction) {
    newDirection = parseInt(Math.random() * 4 + 1);
  }
  if (newDirection === 1) {
    enemyDirX = 0;
    enemyDirY = -2;
  }
  if (newDirection === 2) {
    enemyDirX = 2;
    enemyDirY = 0;
  }
  if (newDirection === 3) {
    enemyDirX = 0;
    enemyDirY = 2;
  }
  if (newDirection === 4) {
    enemyDirX = -2;
    enemyDirY = 0;
  }
  return newDirection;
}

function enemyCollision() {
  if (enemy.health > 0) {
    enemy.x = enemyX;
    enemy.y = enemyY;
    //If any x key in our obstacles array = enemy.X
    if (
      obstacles.some((obstacle) => obstacle.x === Math.floor(enemyX)) ||
      obstacles.some((obstacle) => obstacle.y === Math.floor(enemyY))
    ) {
      for (let i = 0; i < obstacles.length - 1; i++) {
        if (
          enemyX + enemyDirX >= obstacles[i].x &&
          enemyY + enemyDirY >= obstacles[i].y
        ) {
          if (
            (enemyMove === 2 &&
              enemyX + enemyDirX >= obstacles[i].left &&
              enemyY + enemyDirY >= obstacles[i].top &&
              enemyY + enemyDirY <= obstacles[i].bottom) ||
            (enemyMove === 4 && enemyX + enemyDirX <= obstacles[i].right) ||
            (enemyMove === 1 && enemyY + enemyDirY <= obstacles[i].bottom) ||
            (enemyMove === 3 && enemyY + enemyDirY >= obstacles[i].top)
          ) {
            enemyMove = enemyMovement(enemyMove);
            console.log("I hit ", obstacles[i], "at ", enemyX, enemyY);
            console.log("I am changing direction to ", enemyMove);
          }
        }
      }
    }
    //If the enemy hits the top of the gamefield
    else if (enemyY + enemyDirY < enemyHeight) {
      enemyMove = 3;
      enemyDirY = 2;
    }
    //if it hits the bottom of the gamefield
    else if (enemyY + enemyDirY > gameField.height - enemyHeight) {
      enemyMove = 1;
      enemyDirY = -2;
    }
    //If it hits the left of the gamefield
    else if (enemyX + enemyDirX < enemyWidth) {
      enemyMove = 2;
      enemyDirX = 2;
    }
    //If it hits the right of the gamefield
    else if (enemyX + enemyDirX > gameField.width - enemyWidth) {
      enemyMove = 4;
      enemyDirX = -2;
    }
  }
} //I should compare the logic in this to the logic in v2

function isColliding(mover, obstacle) {
  let bottomOfMover = mover.y + mover.height;
  let topOfMover = mover.y;

  let topOfObstacle = obstacle.y;
  let leftSideOfObstacle = obstacle.x;
  let rightSideOfObstacle = obstacle.x + obstacle.width;
  let bottomOfObstacle = obstacle.y + obstacle.height;
  console.log("Testing ", mover, "vs", obstacle);
  if (
    bottomOfMover >= topOfObstacle &&
    topOfMover <= bottomOfObstacle &&
    mover.x >= leftSideOfObstacle &&
    mover.x + mover.width <= rightSideOfObstacle
  ) {
    console.log("Collision at", mover.x, mover.y);
    return true;
  } else {
    return false;
  }
} //this takes up way too much processing power

function enemyCollision2() {
  if (enemy.health > 0) {
    if (
      obstacles.some((element) => {
        isColliding(enemy, element);
      })
    ) {
      console.log("Enemy collision loop");
      enemyMove = enemyMovement(enemyMove);
      console.log("I hit ", obstacles[i], "at ", enemyX, enemyY);
      console.log("I am changing direction to ", enemyMove);
    }
    //If the enemy hits the top of the gamefield
    if (enemyY + enemyDirY < enemyHeight) {
      enemyMove = 3;
      enemyDirY = 2;
    }
    //if it hits the bottom of the gamefield
    else if (enemyY + enemyDirY > gameField.height - enemyHeight) {
      enemyMove = 1;
      enemyDirY = -2;
    }
    //If it hits the left of the gamefield
    else if (enemyX + enemyDirX < enemyWidth) {
      enemyMove = 2;
      enemyDirX = 2;
    }
    //If it hits the right of the gamefield
    else if (enemyX + enemyDirX > gameField.width - enemyWidth) {
      enemyMove = 4;
      enemyDirX = -2;
    }
  }
} //this takes up way too much processing power

function enemyCollision3() {
  if (enemy.health > 0) {
    enemy.x = enemyX;
    enemy.y = enemyY;
    for (let i = 0; i < obstacles.length - 1; i++) {
      if (
        enemyX + enemyDirX >= obstacles[i].x &&
        enemyY + enemyDirY >= obstacles[i].y
      ) {
        if (
          enemyX + enemyDirX >= obstacles[i].left &&
          enemyX + enemyWidth + enemyDirX <= obstacles[i].right &&
          enemyY + enemyHeight + enemyDirY >= obstacles[i].top &&
          enemyY + enemyDirY <= obstacles[i].bottom
        ) {
          enemyMove = enemyMovement(enemyMove);
          console.log("I hit ", obstacles[i], "at ", enemyX, enemyY);
          console.log("I am changing direction to ", enemyMove);
        }
      }
    }
    //If the enemy hits the top of the gamefield
    if (enemyY + enemyDirY < enemyHeight) {
      enemyMove = 3;
      enemyDirY = 2;
    }
    //if it hits the bottom of the gamefield
    if (enemyY + enemyDirY > gameField.height - enemyHeight) {
      enemyMove = 1;
      enemyDirY = -2;
    }
    //If it hits the left of the gamefield
    if (enemyX + enemyDirX < enemyWidth) {
      enemyMove = 2;
      enemyDirX = 2;
    }
    //If it hits the right of the gamefield
    if (enemyX + enemyDirX > gameField.width - enemyWidth) {
      enemyMove = 4;
      enemyDirX = -2;
    }
  }
}

//KEY VARIABLES
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

//GAME START
function gameStart() {
  //Before we begin drawing, clear the gameField each frame.
  ctx.clearRect(0, 0, gameField.width, gameField.height);
  drawObstacles();
  drawInteractive();
  drawEnemies();
  drawPlayer();
  enemyCollision3();
  drawEnemyPositionTopLeft();
  drawEnemyPositionTopRight();
  drawEnemyPositionBottomLeft();
  drawEnemyPositionBottomRight();
  //redraw enemies to simulate movement
  enemyX += enemyDirX * enemySpeed;
  enemy.x = enemyX;
  enemyY += enemyDirY * enemySpeed;
  enemy.y = enemyY;

  //Enemy touches player
  let enemyHitPlayerFromBelowOrRight = Boolean(
    playerX + playerWidth / 2 >= enemyX - enemyWidth &&
      playerX <= enemyX + enemyWidth &&
      playerY + playerHeight / 2 >= enemyY - enemyHeight * 2 &&
      playerY <= enemyY + enemyHeight &&
      enemy.health > 0 &&
      player.health > 0
  );
  let enemyHitPlayerFromAboveOrLeft = Boolean(
    playerX - playerWidth / 2 >= enemyX - enemyWidth &&
      playerX <= enemyX + enemyWidth &&
      playerY - playerHeight / 2 >= enemyY - enemyHeight &&
      playerY <= enemyY + enemyHeight &&
      enemy.health > 0 &&
      player.health > 0
  );
  if (enemyX >= playerX || enemyY >= playerY) {
    if (enemyHitPlayerFromAboveOrLeft) {
      player.health = player.health - 1;
    }
  } else if (enemyX < playerX || enemyY < playerY) {
    if (enemyHitPlayerFromBelowOrRight) {
      player.health = player.health - 1;
    }
  }
  //redraw player to move
  if (rightPressed) {
    playerX += playerDirX * playerSpeed;
    if (playerX + playerWidth > gameField.width) {
      playerX = gameField.width - playerWidth;
    }
  }
  //Movement buttons
  if (leftPressed) {
    playerX -= playerDirX * playerSpeed;
    if (playerX < 0) {
      playerX = 0;
    }
  }
  if (upPressed) {
    playerY += playerDirY * playerSpeed;
    if (playerY < 0) {
      playerY = 0;
    }
  }
  if (downPressed) {
    playerY -= playerDirY * playerSpeed;
    if (playerY + playerHeight > gameField.height) {
      playerY = gameField.height - playerHeight;
    }
  }
  //Collecting the key
  if (
    playerX + playerWidth / 2 >= keyX - keyRadius &&
    playerX <= keyX + keyRadius &&
    playerY + playerHeight / 2 >= keyY - keyRadius * 2 &&
    playerY <= keyY + keyRadius &&
    key.status === 0
  ) {
    console.log("You picked up a key.");
    textDisplay.innerText = "You picked up a key.";
    key.status = 1;
    player.items.push("key");
  }
  //The door
  if (
    playerX + playerWidth / 2 >= doorX - doorWidth &&
    playerX <= doorX + doorWidth &&
    playerY + playerHeight / 2 >= doorY - doorHeight * 2 &&
    playerY <= doorY + doorHeight &&
    door.status === 0 &&
    key.status === 1 &&
    player.items.includes("key")
  ) {
    textDisplay.innerText = "You unlocked the door!";
    console.log("You unlocked the door!");
    door.status = 1;
  }
  //WIN
  if (door.status === 1 && player.health > 0) {
    textDisplay.innerText = "You escaped! GAME OVER";
    restartBtn.style.visibility = "visible";
    player.health = 0;
    enemy.health = 0;
    gameOn = 0;
  }
  //GAME OVER
  if (player.health < 1 && gameOn === 1) {
    textDisplay.innerText = "You were caught by the guard! GAME OVER";
    restartBtn.style.visibility = "visible";
    enemy.health = 0;
    gameOn = 0;
  }
}

//KEY PRESSES
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
restartBtn.addEventListener("onclick", restartGame);

function keyDownHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "Up" || event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "Down" || event.key === "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "Up" || event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "Down" || event.key === "ArrowDown") {
    downPressed = false;
  }
}

function restartGame() {
  restartBtn.style.visibility = "hidden";
  //reload the page to restart
  document.location.reload();
  clearInterval(interval); // Needed for Chrome to end game
}

console.log(
  "Escape through the gold door. You'll need the key. Don't get caught by the guard!"
);

//SET FRAMERATE
setInterval(gameStart, 10);
