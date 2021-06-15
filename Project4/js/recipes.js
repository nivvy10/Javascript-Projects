// Nivedita Rao
// I399 - P4 Recipes API

// initializing variables to store json values of random or search button
let data1 = "";
let data2 = "";
let data = "";
let dataContainer = document.querySelector(".dataContainer");
dataContainer.classList.add("hide");
// This function gets the results of the json containing meal data after searching value using api fetch
const getResults = async searchvalue => {
  document.querySelector(".info").textContent = "";
  document.querySelector(".mealData").textContent = "";
  document.querySelector(".ingredients").textContent = "";
  dataContainer.classList.add("hide");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchvalue}`
  );
  console.log(response);
  // check if search was successful
  if (!response.ok) {
    document.querySelector(".error").textContent = "Invalid Search!";
    return;
  }
  // grabs the json with the meal results
  data1 = await response.json();
  data = data1;
  document.querySelector(".error").textContent = "";
  if (data1.meals == null) {
    document.querySelector(
      ".error"
    ).textContent = `No results found for ${searchvalue}!`;
    return;
  }
  document.querySelector(
    ".error"
  ).textContent = `${data1.meals.length} results found for ${searchvalue}!`;
  console.log(data1);
  searchOutput(data1);
};

// This function prints the resulting meal options with picstures and a button
function searchOutput(data) {
  let printResult = "";
  console.log("searchOutput", data.meals);
  for (let i = 0; i < data.meals.length; i++) {
    console.log(data.meals[i]);
    printResult += `
    <a href="#dataContainer"><button onclick="mealData(data.meals[${i}])">
          <figure>
          <img src="${data.meals[i].strMealThumb}" alt ="image of rice" width="200" height="200">
          <figcaption>${data.meals[i].strMeal}</figcaption>
          </figure>
          </button>
          </a>
          `;
  }
  // clears the html element containing previous meal results and prints new ones in its place
  // document.querySelector(".dataContainer").textContent ="";
  document.querySelector(".info").textContent = "";
  document.querySelector(".info").insertAdjacentHTML("beforeend", printResult);
}

let finalIngredients = "";
let instruct = "";

// This function gets the selected meal's data and prints its instructions, ingredients, measures and its picture.
async function mealData(meal) {
  dataContainer.classList.remove("hide");
  document.querySelector(".mealData").textContent = "";
  document.querySelector(".ingredients").textContent = "";

  instruct += `<h1>${meal.strMeal}</h1>`;
  instruct += `<img src="${meal.strMealThumb}" alt ="image of rice" width="400" height="400"></img>`;
  instruct += `<h2>Instructions</h2>`;

  let instructions_array = meal.strInstructions;
  instructions_array = instructions_array.replace(".", "\n");
  console.log(instructions_array);

  instruct += `<p>${meal.strInstructions}</p>`;
  // document.querySelector(".dataContainer").textContent="";
  document.querySelector(".mealData").insertAdjacentHTML("beforeend", instruct);
  instruct = "";
  // ------------------------------------------------------------
  let index = 1;
  let ing = meal["strIngredient" + index];
  console.log(ing);
  // document.querySelector(".ingredients").innerHTML = "";
  // this array contains all the ingredients
  let ingredientArray = [];
  // This loop appends all the ingredients of the meal to the array
  while (meal["strIngredient" + index]) {
    ingredientArray.push({
      name: meal["strIngredient" + index],
      amount: meal["strMeasure" + index]
        ? meal["strMeasure" + index]
        : "A dash "
    });
    index++;
  }
  // checking the ingredient array
  console.log(ingredientArray);

  // This string contains the final list of ingredients along with the meal name and its measures
  console.log("Meal: ", meal.strMeal);
  finalIngredients += `<h2>Ingredients</h2>`;
  console.log("Ingredients: ");
  finalIngredients += `<p>`;
  ingredientArray.forEach(ingredient => {
    console.log(`${ingredient.amount} of ${ingredient.name}`);
    finalIngredients += `${ingredient.amount} of ${ingredient.name}<br>`;
  });
  finalIngredients += `</p><br>`;
  console.log(document.querySelector(".dataContainer").textContent);
  console.log(finalIngredients);
  document
    .querySelector(".ingredients")
    .insertAdjacentHTML("beforeend", finalIngredients);
  finalIngredients = "";
}

// Adds an event listener to search button and sends inputted value to a function to validate
document.querySelector(".material-icons").addEventListener("click", () => {
  let userInput = document.querySelector(".userValue");
  getResults(userInput.value);
});

document.querySelector(".randomizer").addEventListener("click", () => {
  randomSelector();
});

// This function fetches the random meal by using api fetch
async function randomSelector() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  console.log(response);

  if (!response.ok) {
    document.querySelector(".error").textContent = "Invalid Search!";
    return;
  }

  data2 = await response.json();
  data = data2;
  console.log(data2);
  searchOutput(data2);
}
