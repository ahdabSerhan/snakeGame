import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnackHead, snackIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js'
import { outSideGrid } from './grid.js'
// game loop 
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
    if (gameOver) {
        if (confirm('You Lost Press Ok To Restart!!')) {
            window.location = '/';
        }
        return;
    }
    window.requestAnimationFrame(main); // requesting frame to animate the game

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime;
    update();
    draw();
}
window.requestAnimationFrame(main);

function update() {
    gameBoard.innerHTML = '';
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    drawSnake(gameBoard);
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outSideGrid(getSnackHead()) || snackIntersection();
}