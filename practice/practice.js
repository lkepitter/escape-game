const gameField = document.getElementById("gameField");
//We have to establish the rendering context in order to draw to the canvas. In this case, we want to render 2D objects.
const ctx = gameField.getContext("2d");

//Defines a path to draw
ctx.beginPath();
//Now we define what we're drawing
//shape, co-ordinates of top left point in first 2 parameters, then width and height.
ctx.rect(20, 40, 20, 20);
//set the colour to be used with the fill method
ctx.fillStyle = "#FF0000";
//fill with the set color
ctx.fill();
//end drawing this path
ctx.closePath();

ctx.beginPath();
//This time, use .arc to draw a circle. Parameters: x and y coordinates of the arc's center, arc radius, start angle and end angle (in radians).
// Finally, optional: direction of drawing. default (false) is clockwise. True is anti-clockwise.
ctx.arc(200, 100, 10, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
