import { getInputDirection } from "./input.js";

export let snakeSpeed = 2; // Number of grid squares per second.
const snakeBody = [ // Positions in the grid for each segments of the snake body.
    {x: 11, y: 11}
];
let newSegments = 0;

export function update() {
    addSegments();

    const inputDirection = getInputDirection();
    for (var i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]};
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameboard) {
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        if (index === 0) {
            snakeElement.classList.add("snakeHead");
        } else {
            snakeElement.classList.add("snake");
        }
        gameboard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount;
    snakeSpeed += 0.5;
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPosition(segment, position);
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true});
}

function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length-1]})
    }
    newSegments = 0;
}