/**
 * @author Nihel Madani-Fouatih - Felicia Luu
 * @date version 2023-11-04 by Nihel 
 */
"use strict";

document.addEventListener("DOMContentLoaded", () =>{
    //displays the results from previous games in highscore as soon as page loads
    if(localStorage.getItem("PlayerScores") !== null){
        displayHighScores();
    }
       
    const theForm = document.forms[0];
    const fieldSet = theForm.children[0];
    const startButton = document.getElementById("startButton");
    const tableContainer = document.getElementById("tableHere");
    const submitGuess = document.getElementById("submitButton");
    const formElements = document.querySelectorAll("input, select, button");
    const ascButton = document.getElementById("ascButton");

    let nameValue;
    let boardColorValue;
    let boardSizeValue;
    let difficultyValue;

    document.querySelectorAll("button").forEach(button => button.disabled = true);

    //make users be able to click on "Scores" the moment the page is loaded.
    ascButton.addEventListener("click", onAsc);

    /**
    *@function startGame
    * @param {*} boardColorValue 
    * It set the background color of the Header to the color chosen by the user (in the form)
    * and disables the form Elements until the round is finished
    */
    function startGame(boardColorValue){
        startButton.style.backgroundColor = boardColorValue;
        formElements.forEach(element => { 
            element.disabled = true; 
        });
        submitGuess.disabled = false;
    }
       
    fieldSet.addEventListener("input", function (){
        const usernameInput = fieldSet.querySelector("#userInputName input");
        const validityState = usernameInput.validity;

        if(validityState.patternMismatch){
            usernameInput.setCustomValidity("Username must be 5 characters alphanumeric long");
        } else{
            usernameInput.setCustomValidity("");
            theForm.checkValidity() ? startButton.disabled = false : startButton.disabled = true;
        }
        usernameInput.reportValidity();
    });

    theForm.addEventListener("submit", function (e){
        e.preventDefault();
        nameValue = e.target.username.value;
        boardSizeValue = e.target.boardSize.valueAsNumber;
        boardColorValue = e.target.colour.value;
        difficultyValue = e.target.difficulty.valueAsNumber;

        const theTable = createTable(boardSizeValue, difficultyValue, tableContainer);
        startGame(boardColorValue);
        onSelect(theTable);
    });

    /*global countUserSelectedRight,countRightColoredTds,countSelectedTds,statusText */
    submitGuess.addEventListener("click", function(){ 
        const userSelectedRight = countUserSelectedRight(boardColorValue);
        const CorrectTiles = countRightColoredTds(boardColorValue);
        const SelectedTds = countSelectedTds().length;
        const percentage = Math.round((userSelectedRight / CorrectTiles) * 100).toFixed(2);
        const selectedTooMany = "selected more than needed 0";
        let percentWon;

        SelectedTds <= CorrectTiles ? percentWon = percentage : percentWon = selectedTooMany;
        statusText.textContent = `You have ${percentWon}%`;
            

        const playerScore = getScore(CorrectTiles, SelectedTds, boardSizeValue, difficultyValue);
            
           
        insertInfo(nameValue, playerScore);
        clearButton(); 
        formElements.forEach(element => {
            element.disabled = false;
        });

        this.disabled = true;   

        if (ascButton.classList.contains("ascClicked")){
            sortAscending();
        }
    });

    function onAsc(){
        ascButton.classList.add("ascClicked");
        sortAscending();
    }
});


