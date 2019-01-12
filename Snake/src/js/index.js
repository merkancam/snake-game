import * as boardView from './views/BoardView';
import * as snakeView from './views/SnakeView';
import * as snakeController from './controllers/SnakeController';


boardView.createBoard();
snakeController.resetSnakePosition(boardView.cols, boardView.rows);
snakeController.showSnake();


let direction = "";
document.addEventListener("keydown", function (key) {
    switch (key.keyCode) {
        case 38:
            if (direction != "Down")
                direction = "Up";
            break;
        case 40:
            if (direction != "Up")
                direction = "Down";
            break;
        case 37:
            if (direction != "Right")
                direction = "Left";
            break;
        case 39:
        if (direction != "Left")
            direction = "Right";
            break;
        default:
            break;
    }
    console.log(direction);

});


setInterval(() => {
    snakeController.moveSnakePosition(direction);
}, 100);





