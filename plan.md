## PLAYBOOK

CONDITIONS

- When something touches something else
- When a key is pressed
- When a key is released

ACTIONS

- Draw something
  - in relation to another thing using arrays
  - change a colour
  - stop drawing something
  - move
    - speed up/slow down
    - change direction
- Change a variable
- Display something (alert/element)

## GAMEPLAN

Gauntlet

- V1. Avoid the bad guys, get a thing, get to an exit
  - V1.1 There's a start menu
- V2. You can attack the bad guys
- V3. Multiple screens (scrolling? Not? dunno)

## TO DO

Currently enemy collision is broken. I need to work out how to take
the whole wall into account to see if the enemy is touching it.
I need width and height of the wall, probably
Calculate that somehow
Might work better if I take the WHOLE co-ordinate of an obstacle.
So it's detection from the left = (x - width/2)
right detection = (x + width/2)
up detection = (y + height/2)
down detection = (y - height/2)

if enemy travelling right (enemyMove 2) AND enemyX + enemyWidth/2 = ANY obstacleX - obsWidth/2
