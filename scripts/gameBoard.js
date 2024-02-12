"use strict";
/**
 * @author Nihel Madani-Fouatih
 * @date version 2023-11-04
 */
/**
     * @function createTable
     * @param {*} boardSize
     * @param {*} difficulty
     * @returns {object} Table 
     * @description This function creates a table based on the requirements of the User
     * This functions calls 2 helper methods which will set the BackgroundColor od the Tds
     * as well as update the StatusMessage as soon as the table is created and update it 
     */
//eslint-disable-next-line no-unused-vars
function createTable(boardSize, difficulty, tableContainer) {
    const table = document.createElement("table");
    tableContainer.textContent = "";

    for (let i = 0; i < boardSize; i++) {
        const newRow = document.createElement("tr");
        for (let j = 0; j < boardSize; j++){
            const newTd = document.createElement("td");
            newTd.style.backgroundColor = GenerateTdColors(difficulty);
            newRow.appendChild(newTd);
        }
        table.appendChild(newRow);
    }
    tableContainer.appendChild(table);
    appendMessage(table);
    return table;
}

/**
    * @function appendMessage
    * @param {*} table
    * @description This function set a message with the color chosen by the User,
    * the number he has to select and how many he has selected.
     */
function appendMessage(table){
    const statusText = document.getElementById("statusText");
    const colorChosen = document.forms[0].colour.value;
    const numCorrect = countRightColoredTds(colorChosen);
    const numSelected = countSelectedTds(table).length;

    if(table.children[0]){
        const initialMessage = `Searching for ${colorChosen}. Your target is ${numCorrect} tiles.`;
        statusText.textContent = `${initialMessage} Selected ${numSelected}.`;
    }
}

/**
     * @function onSelect
     * @param {*} table
     * @description this function toggles on and off the class for the Tds as they are Clicked.
     */
//eslint-disable-next-line no-unused-vars
function onSelect(table){
    Array.from(table.querySelectorAll("td")).forEach(td =>{
        td.addEventListener("click", () =>{ 
            td.classList.toggle("selected");
        });
    });
}

/**
     * @function countSelectedTds
     * @param {*} table
     * @returns {array} of Tds selected by the user.
     */
function countSelectedTds(){
    return Array.from(document.querySelectorAll("td.selected"));
    
}

/**
    * @function countUserSelectedRighnumber 
    * @param {*} userColor
    * @returns {number}
    * This functions calls another function that will return a number of correctTile 
    */
//eslint-disable-next-line no-unused-vars
function countUserSelectedRight(userColor) {

    return countMatchingTiles(userColor, countSelectedTds);
}

/**
    * @function countRightColoredTds
    * @param {*} userColor
    * @returns {number} 
    * This functions calls another function while passing a node array of all the tds.
    */

function countRightColoredTds(userColor) {
    return countMatchingTiles(userColor, () => tableHere.querySelectorAll("td"));
}

/**
    * @function countMatchingTiles
    * @param {*}userColor
    * @param {*} function
    * @returns {number} 
    * This function being called by other functions simply literate over an array of tds and return 
    * a number when the condition is match (userColor matches the Tile Color)
    */

function countMatchingTiles(userColor, tdFunction) {
    const selectedTiles = tdFunction();
    let correctCount = 0;
    
    selectedTiles.forEach((td) => {
        const tileColor = td.style.backgroundColor;
        const dominantColor = rgbColorName(tileColor);

        if (dominantColor.toLowerCase() === userColor.toLowerCase()) {
            correctCount++;
        }
    });
    return correctCount;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("js is loaded gameBoard");

    tableHere.addEventListener("click",  () => {
        if(tableHere.children[0]){
            appendMessage(tableHere);
        }
    });
});
    
    
