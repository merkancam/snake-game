import * as base from '../views/Base'
import * as board from '../views/BoardView';

export let snakePositions = [];
export const resetSnakePosition = (boardCols, boardRows) => {
    snakePositions = [];
    for (let i = 0; i < 4; i++) {
        let c = (boardCols / 2) + i;
        let r = (boardRows / 2);
        snakePositions.push({
            x: c,
            y: r
        });
    }
}


export const moveSnakePosition = (direction) => {
    switch (direction) {
        case 'Up':
            var removedItem = snakePositions.shift();
            clearCell(removedItem);
            var positionHeadOfSnake = snakePositions[snakePositions.length - 1];
            var positionNext = { x: positionHeadOfSnake.x, y: positionHeadOfSnake.y - 1 };
            snakePositions.push(positionNext);
            fillCell(positionNext);
            break;
        case 'Down':
            var removedItem = snakePositions.shift();
            clearCell(removedItem);
            var positionHeadOfSnake = snakePositions[snakePositions.length - 1];
            var positionNext = { x: positionHeadOfSnake.x, y: positionHeadOfSnake.y + 1 };
            snakePositions.push(positionNext);
            fillCell(positionNext);
            break;
        case 'Left':
            var removedItem = snakePositions.shift();
            clearCell(removedItem);
            var positionHeadOfSnake = snakePositions[snakePositions.length - 1];
            var positionNext = { x: positionHeadOfSnake.x - 1, y: positionHeadOfSnake.y };
            snakePositions.push(positionNext);
            fillCell(positionNext);
            break;
        case 'Right':
            var removedItem = snakePositions.shift();
            clearCell(removedItem);
            var positionHeadOfSnake = snakePositions[snakePositions.length - 1];
            var positionNext = { x: positionHeadOfSnake.x + 1, y: positionHeadOfSnake.y };
            snakePositions.push(positionNext);
            fillCell(positionNext);
            break;
        default:
            break;
    }
};

export const showSnake = () => {
    snakePositions.forEach(function (e) {
        var column = `${e.x}.${e.y}`;
        document.getElementById(column).style.backgroundColor = "black";
    });
}


const fillCell = (cellPosition) => {
    let filledCell = `${cellPosition.x}.${cellPosition.y}`;
    document.getElementById(filledCell).style.backgroundColor = "black";
}


const clearCell = (cellPosition) => {
    let clearedCell = `${cellPosition.x}.${cellPosition.y}`;
    document.getElementById(clearedCell).style.backgroundColor = "white";
}


