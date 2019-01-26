import {
    elements
} from '../views/Base';


export const rows = 16;
export const cols = 32;
export let score = 0;
export let foodLocation = {};
export let boardLocations = [];
export const increaseScore = () => {
    score = score + timer;

    displayScore();
    timer = 10;
    clearInterval(timerInterVal);
    startTimer();
}

const displayScore = () => {
    document.getElementById("score").innerText = "Score : " + score;
}

displayScore();

export const createBoard = () => {
    let tableRows = '';
    for (let r = 0; r <= rows; r++) {
        tableRows += '<tr>'
        for (let c = 0; c <= cols; c++) {
            tableRows += `<td id="${c}.${r}"></td>`;
            boardLocations.push({ x: c, y: r, isAvailable: true });
        }
        tableRows += '</tr>';
    }
    elements.boardTable.innerHTML = tableRows;
}



export const fillCell = (cellPosition) => {
    let filledCell = `${cellPosition.x}.${cellPosition.y}`;
    document.getElementById(filledCell).style.backgroundColor = "white";
}


export const clearCell = (cellPosition) => {
    let clearedCell = `${cellPosition.x}.${cellPosition.y}`;
    document.getElementById(clearedCell).style.backgroundColor = "black";
}


export const putNewFood = () => {
    let availablePoints = boardLocations.filter(x => x.isAvailable == true);
    let lengthOfArray = availablePoints.length;
    const rnd = Math.floor(Math.random() * lengthOfArray);
    foodLocation.x = availablePoints[rnd].x;
    foodLocation.y = availablePoints[rnd].y;
    let foodCell = `${foodLocation.x}.${foodLocation.y}`;
    document.getElementById(foodCell).style.backgroundColor = "red";

}

const displayFoodPoint = () => {
    document.getElementById("timer").innerText = timer;
}

let timer = 10;
let timerInterVal;
let pausePointTimer;
export const pausePlayPointTimer = (status) => {
    pausePointTimer = status;
}

export const startTimer = () => {
    timerInterVal = setInterval(() => {
        displayFoodPoint();
        if (timer == 1 || pausePointTimer)
            return;
        timer--;
    }, 200);
}
displayFoodPoint();


export const findLocation = (location) => {
    var found = boardLocations.find(function (element) {
        return element.x == location.x && element.y == location.y;
    });

    return found;
}



export const isFoodExists = (location) => {
    if (foodLocation.x == location.x && foodLocation.y == location.y) {
        return true;
    }
    return false;
}

