// Nivedita Rao
// I399 - Project 1
// PART A : function generates a random color selected from an array
"use strict";
console.log("js working");
// Defining variables that pull data from the HTML using CSS selectors
const button = document.querySelector(".change-color");
const colorCode = document.querySelector("h2");
const body = document.querySelector("body");

/* Initializing a function that chooses and sets a random color to the background from a given array 
of color codes. */
function changeColor() {
  let randomColor = ["#F9C80E", "#F86624", "#EA3546", "#662E9B", "#43BCCD"]; // array of random colors
  // Using the random function to get a random choice from the color array
  let color = randomColor[Math.floor(Math.random() * randomColor.length)];
  // Setting the new color code value as the background and changing the text showing the color code itself
  colorCode.textContent = color;
  body.style.backgroundColor = color;
}
// Adding event Listener to the button so that the specified function is called each time you click it
button.addEventListener("click", changeColor);
