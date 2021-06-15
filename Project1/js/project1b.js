// Nivedita Rao
// I399 - Project 1
// PART B : function generates a random hex value
'use strict';
console.log('js working');

// Defining variables that pull data from the HTML using CSS selectors
const button = document.querySelector('.change-color');
const colorCode= document.querySelector('h2');
const body = document.querySelector('body');

// Setting new text on h1 selector on the HTML page
document.querySelector('h1').innerHTML = "Hex Color Code:";

// Initializing a function that sets a random color to the background using hex code
function changeColor(){
    let hexCode = "";
    // Array containing all the possible values to generate a valid hex code
    let hexCodeValue =["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    // loop to create a hex code of 6 values from the hex values list
    for (let i=0; i<6; i++){
        // Using the random function to get a random choice from the hex code values list
        hexCode += hexCodeValue[Math.floor(Math.random() * 16)];
    }
    // ALTERNATIVE METHOD
    // let hexCodeValue = ['0123456789abcdef'].toString;
    // for (let i=0; i<6; i++) {
    //     hexCode += hexCodeValue[Math.floor(Math.random() * hexCodeValue.length)];
    // }

    /* Setting the new hex code value as the background color and changing the text showing the hex 
    code itself */
    body.style.backgroundColor = "#" + hexCode;
    colorCode.textContent = "#" + hexCode;
}
// Adding event Listener to the button so that the specified function is called each time you click it
button.addEventListener('click', changeColor);