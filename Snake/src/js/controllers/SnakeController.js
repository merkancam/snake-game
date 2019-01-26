import * as base from '../views/Base'
import * as board from '../controllers/BoardController';

export let snakePositions = [];
let positionHeadOfSnake;
export let positionNext = { x: -1, y: -1 };


export const resetSnakePosition = (boardCols, boardRows) => {
    snakePositions = [];
    for (let i = 0; i < 3; i++) {
        let c = (boardCols / 2) + i;
        let r = (boardRows / 2);
        snakePositions.push({
            x: c,
            y: r
        });

        var found = board.boardLocations.find(function (element) {
            return element.x == c && element.y == r;
        });

        found.isAvailable = false;
    }
    positionHeadOfSnake = snakePositions[snakePositions.length - 1];
    board.putNewFood();
}



export const setNewPosition = (direction) => {
    positionHeadOfSnake = snakePositions[snakePositions.length - 1];
    positionNext = { x: -1, y: -1 }
    let haveMatched = true;

    switch (direction) {
        case 'Up':
            positionNext = { x: positionHeadOfSnake.x, y: positionHeadOfSnake.y - 1 };

            break;
        case 'Down':
            positionNext = { x: positionHeadOfSnake.x, y: positionHeadOfSnake.y + 1 };

            break;
        case 'Left':
            positionNext = { x: positionHeadOfSnake.x - 1, y: positionHeadOfSnake.y };

            break;
        case 'Right':
            positionNext = { x: positionHeadOfSnake.x + 1, y: positionHeadOfSnake.y };

            break;
        case 'Pause':
            haveMatched = false;
            break;
        default:
            haveMatched = false;
            break;
    }

    keepSnakeInsideBoard(positionNext);
    return haveMatched;
}

export const moveSnake = () => {

    snakePositions.push(positionNext);
    var found = board.findLocation(positionNext);
    found.isAvailable = false;
    board.fillCell(positionNext);
    if (board.isFoodExists(positionNext)) {
        board.increaseScore();
        board.putNewFood();
    }
    else {
        let removedItem = snakePositions.shift();
        var found = board.findLocation(removedItem);
        found.isAvailable = true;
        board.clearCell(removedItem);
    }

};

export const showSnake = () => {
    snakePositions.forEach(function (e) {
        let column = `${e.x}.${e.y}`;
        document.getElementById(column).style.backgroundColor = "white";
    });
}



const keepSnakeInsideBoard = (positionNext) => {
    if (positionNext.y > board.rows) {
        positionNext.y = 0;
    }

    if (positionNext.y < 0) {
        positionNext.y = board.rows;
    }

    if (positionNext.x > board.cols) {
        positionNext.x = 0;
    }

    if (positionNext.x < 0) {
        positionNext.x = board.cols;
    }
}





