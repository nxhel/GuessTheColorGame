"use strict";
/**
 * @author Nihel Madani-Fouatih 
 * @date version 2023-11-04
 */
document.addEventListener("DOMContentLoaded", function (){
    const theBody = document.getElementsByTagName("BODY")[0];
    document.children[0].addEventListener("keydown", (e) =>{ 
        const theTagName = e.target.tagName;
        if (theTagName !== "INPUT" && e.shiftKey && e.keyCode === 67){
            theBody.classList.toggle("cheatmode"); 
            CheatActivated(theBody.classList.contains("cheatmode"));
        }
    });
}); 

/**
     * @function CheatActivated
     * @param {*} displayTheColor
     * @description This function take a boolean; true if the body has CheatMode as a class 
     * and will display the color of the RGB value; false if the body class doesn not 
     * have Cheatmode class.
     */
function CheatActivated(displayTheColor){
    const gameTable = document.getElementById("tableHere");
    gameTable.querySelectorAll("td").forEach(td => {
        if (displayTheColor) {
            DisplayColorDiv(td);
        } else {
            td.textContent = "";
        }
        
    });    
}
/**
     * @function DisplayColorDiv
     * @param {*} TD
     * @description this function displays the RGB color of the TD and
     * its Color Name;
     */

function DisplayColorDiv (TD){
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const color = TD.style.backgroundColor;
    const dominantColor = rgbColorName(color);

    div1.textContent = color;
    div2.textContent = dominantColor;

    TD.appendChild(div1);
    TD.appendChild(div2);
}


/**
     * @function rgbColorName
     * @param {*} color
     * @returns a String of the dominant color present in the RGB() form.
     * @description this functions determines the Domincant color inside RGB(R,G,B) . If statements
     * are required to handle a situation where R, G ,B are equal.
     */
function rgbColorName(rgbcolor){
    const userColor = document.getElementById("colour").value;
    const colorValues = rgbcolor.substring(4, rgbcolor.length - 1).split(",");
            
    const red = parseInt(colorValues[0]);
    const green = parseInt(colorValues[1]);
    const blue = parseInt(colorValues[2]);

    let theDominantColor = "";

    if(red > green && red > blue){
        theDominantColor = "Red";
    } else if(green > red && green > blue){
        theDominantColor = "Green";
    }else if(blue > red && blue > green){
        theDominantColor = "Blue";
    }else if(blue === red && (userColor.startsWith("B") || userColor.startsWith("R")) ){
        theDominantColor = userColor;
    }else if(blue === green && (userColor.startsWith("B") || userColor.startsWith("G")) ){
        theDominantColor = userColor;
    }else if(red === green && (userColor.startsWith("R") || userColor.startsWith("G")) ){
        theDominantColor = userColor;
    }else{ 
        theDominantColor = userColor;
    }
    return theDominantColor;

}
    
        
