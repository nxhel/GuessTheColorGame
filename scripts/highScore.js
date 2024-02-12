/**
 * @author Felicia Luu
 * @date version 2023-11-04 by Felicia
 */

"use strict";
/**
 * @function getScore
 * @param {numCorrect}
 * @param {numSelected}
 * @param {boardSize}
 * @param {difficulty}
 * @return {number}
 * This function calculates the score. Retrieved from project description document.
 */
function getScore(numCorrect, numSelected, boardSize, difficulty){
    const percent = ((2 * numCorrect - numSelected) / (boardSize * boardSize));
    return Math.floor(percent * 100 * boardSize * (difficulty + 1));
}

/**
 * @function clearButton
 * This function is initiated when the "Clear" button is clicked. Whenever the submit
 * guess button is clicked, a clear button is created so to avoid duplicates, the button and
 * its functionality creation is only initialized if there isn't already a button.
 */
function clearButton(){
    const parentDiv = document.getElementById("scoreInfo");

    if (parentDiv.lastChild.tagName !== "BUTTON"){
        const clearButton = document.createElement("button");
        clearButton.textContent = "Clear";
        const tbody = document.querySelector("#scoreTable").children[1];
        parentDiv.appendChild(clearButton);

        clearButton.addEventListener("click", function(e){
            localStorage.clear();

            while (tbody.rows.length > 0){
                tbody.deleteRow(0);
            }
            clearButton.remove();
        });
    }
}

/** 
 * @function createHighScoreRow
 * @param {player}
 * This funtction creates the rows that are then added to High Scores table.
*/
function createHighScoreRow(player){
    const table = document.getElementById("scoreTable");
    const tbody = table.children[1];
    const newRow = document.createElement("tr");
    newRow.classList.add("highScoreRow");
    tbody.appendChild(newRow);

    const playerNameTd = document.createElement("td");
    playerNameTd.textContent = player.username;
    newRow.appendChild(playerNameTd);

    const playerScoreTd = document.createElement("td");
    playerScoreTd.textContent = player.score;
    newRow.appendChild(playerScoreTd);
}

/**
 * @function displayHighScores
 * This function retrieves the information from the local storage and sends each player
 * object to another function, that will create the rows using each player's information.
 * 
 */
function displayHighScores(){
    const arrayPlayers = JSON.parse(localStorage.getItem("PlayerScores"));
    arrayPlayers.forEach(player => {
        createHighScoreRow(player);
    });
}



/**
 * @function addLocalStorage
 * @param {playerName}
 * @param {playerScore}
 * @param {method}
 * @param {index}
 * This function takes in a player name (String), a score (number), a method (string) 
 * and an optional index. The optional parameter is used for the insert only. It
 * uses array.splice to insert scores that are smaller than some and bigger than others. 
 */
function addLocalStorage(playerName, playerScore, method, index = 0){
    let arrayPlayers;
    let newPlayer;
    if (method === "insert"){
        arrayPlayers = JSON.parse(localStorage.getItem("PlayerScores"));
        newPlayer = createPlayerObj(playerName, playerScore);
        arrayPlayers.splice(index, 0, newPlayer);
        arrayPlayers.pop();
        localStorage.setItem("PlayerScores", JSON.stringify(arrayPlayers));
    } else if (method === "push"){
        arrayPlayers = JSON.parse(localStorage.getItem("PlayerScores")) || [];
        newPlayer = createPlayerObj(playerName, playerScore);
        arrayPlayers.push(newPlayer);
        localStorage.setItem("PlayerScores", JSON.stringify(arrayPlayers));
        return arrayPlayers;
    } else{
        var console = console.log("not a valid method.");
    }
  
}

/**
 * @function insertInfo
 * @param {playerName}  
 * @param {playerScore}  
 * This function like the "main" function that interacts with most functions.
 * It takes a player name and a player score to store it in local storage, insert
 * the information inside High Scores, and to store them in descendant order. As long
 * as the number of rows present in High Scores table is under 10, the block of code will
 * be executed.
 */
function insertInfo(playerName, playerScore){
    const table = document.getElementById("scoreTable");
    const numTr = countNumTBodyRows(table);

    //when the table has 9 rows, it will execute the follow code and insert the 10th row.
    if (numTr < 10){
        //inserts data into localStorage and also returns an object to arrayPlayers
        const arrayPlayers = addLocalStorage(playerName, playerScore, "push");
        //last player of the array of player objects
        const currentPlayer = arrayPlayers[arrayPlayers.length - 1];  
        descOrder(currentPlayer, arrayPlayers);
    } else{
        var console = console.log("top 10 scores already present.");
        return;
    }
  
}

/**
 * @function createPlayerObj
 * @param {playerName}
 * @param {playerScore}
 * @returns {player}
 * 
 * Ths function takes a player name and their score to create an object with two fields.
 */
function createPlayerObj(playerName, playerScore){
    const player = {
        username: playerName,
        score: playerScore
    };
    return player;
}

/**
 * @function countNumTBodyRows
 * @param {table}
 * @returns {numTr}
 * This function counts the number of rows in the table that is received as input, and
 * returns the length, so the number of rows that are present.
 */
function countNumTBodyRows(table){
    const tbody = table.children[1];
    const numTr = tbody.rows.length;
    return numTr;
}

/**
 * @function descOrder
    @param {currentPlayer}
    @param {arrayPlayers} 
     * This function inserts the score of a player that has a higher score than another. It will be 
     * added to the local storage through the function addLocalStorage.
     */

function descOrder(currentPlayer, arrayPlayers){
    const table = document.getElementById("scoreTable");
      
    for (let i = 0; i < arrayPlayers.length; ++i){
        const otherPlayerScore = arrayPlayers[i].score;
        if (currentPlayer.score > otherPlayerScore){
            addLocalStorage(currentPlayer.username, currentPlayer.score, "insert", i);
            break;
        }
    }

  
    //this displays in the High Scores
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    displayHighScores();
}

/**
 * @function sortAscending
 * This function's purpose is so sort the players' scores from smallest to biggest, 
 * and display it in High Scores, as long as there are rows. If not there will be a message
 * in the console.
 */
function sortAscending(){
    const tbody = document.querySelector("#scoreTable").children[1];
    if (tbody.childElementCount !== 0){
        const allData = JSON.parse(localStorage.getItem("PlayerScores"));
        // Create a copy of sortedScores
        const sortedScores = allData.slice().sort((a, b) => a.score - b.score);
        //this displays in the High Scores
        for (let i = 0; i < tbody.children.length; ++i){
            tbody.children[i].children[0].textContent = sortedScores[i].username;
            tbody.children[i].children[1].textContent = sortedScores[i].score;
        }
    } else{
        var console = console.log("nothing to sort!");
    }
  
}


