// Nivedita Rao
// I399 - Project 1
// PART C : function generates a random hsl value
'use strict';
console.log('js working');

// Defining variables that pull data from the HTML using CSS selectors
const button = document.querySelector('.change-color');
const colorCode= document.querySelector('h2');
const body = document.querySelector('body');
// Setting new text on h1 and h2 selectors on the HTML page
document.querySelector('h1').innerHTML = "Hsl Color Code:";
document.querySelector('h2').innerHTML = "hsl(0, 0%, 100%)";

// Initializing a function that sets a random color to the background using hsl codes
function changeColor(){
    // Using the random function to get a random choice from the color array
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 101);
    let lightness = Math.floor(Math.random() * 101);
    // Checks if the color is very dark or if the saturation is high, then sets text color to white else black
    if (lightness < 40 || saturation > 95) {
        body.style.color = "white";
        button.style.backgroundColor = "white";
        button.style.color = "black";
    }
    else{
        body.style.color = "black";
        button.style.backgroundColor = "black";
        button.style.color = "white";
    }
    /* Setting the new hsl value value as the background color and changing the text showing the hsl 
    value itself */
    body.style.backgroundColor = "hsl(" +hue+", "+saturation+"%, "+lightness+"%)";
    colorCode.textContent = "hsl(" +hue+", "+saturation+"%, "+lightness+"%)";

}
// Adding event Listener to the button so that the specified function is called each time you click it
button.addEventListener('click', changeColor);