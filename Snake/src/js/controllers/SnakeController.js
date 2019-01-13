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

        var found = board.boardLocations.find(function (element) {
            return element.x == c && element.y == r;
        });

        found.isAvailable = false;
    }

    putNewFood();
}


export const moveSnakePosition = (direction) => {
    let positionHeadOfSnake = snakePositions[snakePositions.length - 1];
    let positionNext = { x: -1, y: -1 }
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


    if (haveMatched) {
        snakePositions.push(positionNext);
        var found = board.boardLocations.find(function (element) {
            return element.x == positionNext.x && element.y == positionNext.y;
        });
        found.isAvailable = false;
        fillCell(positionNext);

        if (isFoodExists(positionNext)) {
            putNewFood();
        }
        else {
            let removedItem = snakePositions.shift();
            var found = board.boardLocations.find(function (element) {
                return element.x == removedItem.x && element.y == removedItem.y;
            });
            found.isAvailable = true;
            clearCell(removedItem);
        }
    }

};

export const showSnake = () => {
    snakePositions.forEach(function (e) {
        let column = `${e.x}.${e.y}`;
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

const putNewFood = () => {
    let availablePoints = board.boardLocations.filter(x => x.isAvailable == true);
    let lengthOfArray = availablePoints.length;
    const rnd = Math.floor(Math.random() * lengthOfArray);
    board.foodLocation.x = availablePoints[rnd].x;
    board.foodLocation.y = availablePoints[rnd].y;
    let foodCell = `${board.foodLocation.x}.${board.foodLocation.y}`;
    document.getElementById(foodCell).style.backgroundColor = "green";
}




const isFoodExists = (location) => {
    if (board.foodLocation.x == location.x && board.foodLocation.y == location.y) {
        return true;
    }
    return false;
}

