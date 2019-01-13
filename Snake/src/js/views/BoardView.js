import {
    elements
} from './Base';


export const rows = 30;
export const cols = 30;
export let foodLocation = {};
export let boardLocations = [];

export const createBoard = () => {
    let tableRows = '';
    for (let r = 0; r <= rows; r++) {
        tableRows += '<tr>'
        for (let c = 0; c <= cols; c++) {
            tableRows += `<td id="${c}.${r}"></td>`;
            boardLocations.push({ x: c, y: r, isAvailable : true });
        }
        tableRows += '</tr>';
    }
    elements.boardTable.innerHTML = tableRows;
}