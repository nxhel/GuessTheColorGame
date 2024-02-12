
"use strict";
/**
 * @author Nihel Madani-Fouatih - Felicia Luu
 * @date version 2023-10-31
 */
/**
     * @function GenerateTdColors
     * @param {*} difficulty
     * @returns a string RGB({x,y,z}) x,y,z are numbers
     * @description This function takes as a parameter the difficulty 
     * chosen by the user and based on it, generate radom colors within 
     * a certain range. The color is then returned
*/
//eslint-disable-next-line no-unused-vars
function GenerateTdColors(difficulty){

    /**
    * @function random
    * @param {#} theRange 
    * @returns a Number 
    */
    function rand(theRange) {
        return Math.floor(Math.random() * theRange);
    }

    let range;
    let range2;
        
    if(difficulty === 0){
        range = 256;
        range2 = 256;
    }else if (difficulty === 1){
        range = 176;
        range2 = 80;
    } else if(difficulty === 2){
        range = 216;
        range2 = 40;
    }else if(difficulty === 3){
        range = 246;
        range2 = 10;
    }else{
        console.error("Invalid Difficulty Level");
    }
    /*eslint max-len: ["error", { "ignoreTemplateLiterals": true }]*/
    const baseColor = rand(range - range2);
    const finalColor = `rgb(${baseColor + rand(range2)}, ${baseColor + rand(range2)}, ${baseColor + rand(range2)})`;
    return finalColor;
}

