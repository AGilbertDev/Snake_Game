import { update as updateSnake,
        draw as drawSnake,
        getSnakeHead,
        snakeIntersection,
        snakeSpeed } from "./snake.js";
import { update as updateFood, 
        draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameboard = document.getElementById("gameboard");

function main(currentTime) {
    if (gameOver) {
        gameboard.removeChild[0];
        if (confirm("You lost. Press ok to restart.")) {
           window.location = './' ;
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender >= 1 / snakeSpeed) {

        lastRenderTime = currentTime;

        update();
        draw();
    }     
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameboard.innerHTML = "";
    drawSnake(gameboard);
    drawFood(gameboard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}