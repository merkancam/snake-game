
import * as boardController from './controllers/BoardController';
import * as snakeController from './controllers/SnakeController';



function startNewGame() {
    boardController.createBoard();
    snakeController.resetSnakePosition(boardController.cols, boardController.rows);
    snakeController.showSnake();
}


startNewGame();




let directions = [];
let previousDirection = "Right";


document.addEventListener("keydown", function (key) {
    var length = directions.length - 1;

    switch (key.keyCode) {
        case 38:
            if (previousDirection != "Down") {
                directions.push("Up");
                previousDirection = "Up";
            }
            break;
        case 40:
            if (previousDirection != "Up") {
                directions.push("Down");
                previousDirection = "Down";
            }
            break;
        case 37:
            if (previousDirection != "Right") {
                directions.push("Left");
                previousDirection = "Left";
            }
            break;
        case 39:
            if (previousDirection != "Left") {
                directions.push("Right");
                previousDirection = "Right";
            }
            break;
        case 32:
            directions = [];
            break;
        default:
            break;
    }



});

let counter = 0;

const checkIsGameOver = (snakeHeadPosition) => {

    var found = snakeController.snakePositions.find(function (element) {
        return element.x == snakeHeadPosition.x && element.y == snakeHeadPosition.y;
    });

    if (found) {
        return true;
    }

    return false
}


var isPaused = false;
let isIntervalStarted = false;
let intervalId = setInterval(() => {
    if (directions.length == 0) {
        boardController.pausePlayPointTimer(true);
        return;
    }
    boardController.pausePlayPointTimer(false);
    if (!isIntervalStarted) {
        boardController.startTimer();
        isIntervalStarted = true;
    }
    var matched = snakeController.setNewPosition(directions[0]);
    if (matched) {
        if (checkIsGameOver(snakeController.positionNext)) {
            isPaused = true;
            if (counter > 0) {
                clearInterval(intervalId);
                alert("Your Score is " + boardController.score);
                document.getElementById("startMessage").style.visibility = 'visible';
            }
            counter++;
        }
        else {
            counter = 0;
            isPaused = false;
        }

        if (!isPaused) {
            snakeController.moveSnake();

        }

    }

    if (directions.length > 1) {
        directions.shift();
    }

}, 80);





