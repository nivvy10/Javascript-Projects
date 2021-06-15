"use strict";
console.log(`it's alive!`);
// Nivedita Rao
// Project 2

// code to read in the JSON
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "js/drugs.json", true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}

loadJSON(function(json) {
  // do something with data
  createPage(json);
  // addDrug(json);
});

// PART ONE
// Dynamically generate HTML for each drug from JSON-formatted content
// So, using the data in drugs.js, format HTML for each drug to look like the example
// and then insert that HTML into #drugs
const createPage = drug => {
  let htmlString = "";
  for (let i = 0; i < drug.length; i++) {
    htmlString += `<figure data-drug-name=${drug[i].name} data-drug-amount=${drug[i].amount}>
      <img src="images/${drug[i].slug}.jpg" alt="${drug[i].slug}">
      <figcaption>${drug[i].name};</figcaption>
  </figure>`;
  }

  let drug_data = document.querySelector("#drugs");
  drug_data.insertAdjacentHTML("afterbegin", htmlString);

  let selected_drugs = document.querySelectorAll("figure");
  selected_drugs.forEach(item => {
    item.addEventListener("click", function() {
      addDrug(item);
    });
  });
};

// NOTE: Each drug's daily limit of acetaminophen in mg

//   EXAMPLE OF WHAT THE HTML SHOULD LOOK LIKE:
//   <figure data-drug-name="Excedrin&reg;" data-drug-amount="2000">
//     	<img src="images/excedrin.jpg" alt="excedrin">
//      <figcaption>Excedrin&reg;</figcaption>
//   </figure>

// PART TWO - see css/styles.css

// PART THREE
// Connect each drug to an action:
// - updates total amount of acetaminophen taken so far (total dose)
// - select the drug visually - add a CSS class so drug appears to be selected (first column)
// - updates "lethal dose" bar's height (second column)
// - updates the bar's label (second column)
// - updates total dose and warning message (third column)

let totalDose = 0;
let heights = [];
let totals = [];
const addDrug = drug => {
  // - updates total amount of acetaminophen taken so far (total dose)
  totalDose += Number(drug.dataset.drugAmount);
  totals.push(drug.dataset.drugAmount);
  // - select the drug visually - add a CSS class so drug appears to be selected (first column)
  drug.classList.add("selected");

  // - updates "lethal dose" bar's height (second column)
  let val = Math.floor((totalDose / 15000) * 100);
  val = val < 101 ? val : 100;
  let barHeight = document.querySelector("span");
  heights.push(`${val}%`);
  barHeight.setAttribute("style", `height: ${val}%`);

  // - updates the bar's label (second column)
  let label = document.querySelector(".label");
  label.textContent = drug.dataset.drugName + " " + totalDose + "mg";
  label.setAttribute("style", `height:${val}%`);

  document.querySelector("#message p:nth-of-type(1)").textContent =
    totalDose + "mg";

  let textColor = "";
  // let numFontSize = "30px";
  let msg = "";
  if (totalDose < 4000) {
    textColor = "black";
  } else if (totalDose > 4000 && totalDose < 8000) {
    textColor = "#D5B612";
    msg = `You've exceeded the FDA’s recommended maximum daily limit of acetaminophen.`;
  } else if (totalDose >= 8000 && totalDose < 15000) {
    textColor = "#D17827";
    msg = `You've exceeded the level at which liver damage can occur if taken for several days, according to McNeil, the maker of Tylenol.`;
  } else if (totalDose >= 15000) {
    textColor = "#C20802";
    msg = `You've exceeded the threshold toxic dose of acetaminophen. A single dose at this level can result in death, according to medical experts and literature.`;
  }

  document
    .querySelector("#message")
    .setAttribute(`style`, `color:${textColor}`);
  // document.querySelector("#message p:nth-of-type(1)").setAttribute(`style`, `font-size: ${numFontSize}`);
  document.querySelector("#message p:nth-of-type(2)").textContent = msg;
};

// THRESHOLDS
// total < 4000
// text is black
// No message update

// total < 8000
// text is '#D5B612'
// `You've exceeded the FDA’s recommended maximum daily limit of acetaminophen.`

// total < 15000
// text is '#D17827'
// `You've exceeded the level at which liver damage can occur if taken for several days, according to McNeil, the maker of Tylenol.`

// total >= 15000
// text is '#C20802'
// `You've exceeded the threshold toxic dose of acetaminophen. A single dose at this level can result in death, according to medical experts and literature.`

// BONUS
// Create a way for the drug to be unselected
// and thus removed from the total / tally
