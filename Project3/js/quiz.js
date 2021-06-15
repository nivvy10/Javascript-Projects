"use strict";

const quiz = document.querySelector("#quiz");
const question = document.querySelector(".question");
const choices = document.querySelector(".choices");
const progress = document.querySelector("#progress");
const button = document.querySelector("button");
const score = document.querySelector("#score");

let questionsIndex = 0;
let totalScore = 0;
let scoreScale = [
  '<i class="far fa-sad-cry"></i>',
  '<i class="far fa-sad-tear"></i>',
  '<i class="far fa-meh"></i>',
  '<i class="far fa-smile-beam"></i>',
  '<i class="far fa-grin-stars"></i>'
];

let questions = [
  {
    question: "What city is the capital of Australia?",
    answers: {
      a: "Canberra",
      b: "Perth",
      c: "Melbourne",
      d: "Sydney"
    },
    correct: "a"
  },
  {
    question: "What is the deepest point on Earth?",
    answers: {
      a: "Crusher Trench",
      b: "Challenger Deep",
      c: "Mariana Trench"
    },
    correct: "c"
  },
  {
    question: "What is Earth's largest continent",
    answers: {
      a: "Africa",
      b: "Asia",
      c: "Antarctica",
      d: "North America"
    },
    correct: "b"
  },
  {
    question: "What is the driest place on Earth?",
    answers: {
      a: "Sahara Desert",
      b: "Atacama Desert",
      c: "Mcmurdo, Antarctica",
      d: "Namib Desert"
    },
    correct: "c"
  },
  {
    question: "What is the tallest mountain in North America?",
    answers: {
      a: "Mount Rushmore",
      b: "Denali",
      c: "King Peak",
      d: "Mount Steele"
    },
    correct: "b"
  },
  {
    question: 'Identify the country depicted in the image.<br><img src= "phillipines.jpg" width="200" height="200">',
    answers: {
      a: "Philipines",
      b: "United Kingdom",
      c: "Japan",
      d: "Greece"
    },
    correct: "a"
  }


];

const checkQuestion = () => {
  // CHECK CURRENT QUESTION
  let current = questions[questionsIndex];
  document.querySelector(".marker").classList.remove("incorrect");
  document.querySelector(".marker").classList.remove("correct");
  // console.log(current.correct);
  let userAnswer = document.querySelector('[name="choice"]:checked').value;
  if (userAnswer == current.correct) {
    console.log("Correct Answer");
    totalScore += 1;
    console.log("score ", totalScore);
    document
      .querySelector(`.marker[data-marker="${questionsIndex}"]`)
      .classList.add("correct");
    console.log(questionsIndex, "correct");
  } else {
    console.log("Wrong Answer");
    document
      .querySelector(`.marker[data-marker = "${questionsIndex}"]`)
      .classList.add("incorrect");
    console.log(questionsIndex, "incorrect");
  }
  // update marker as correct or incorrect
};

const nextQuestion = () => {
  quiz.style.height="420px";
  checkQuestion();
  // IS THIS THE LAST QUESTION?
  if (questionsIndex === questions.length - 1) {
    // IF SO, DISPLAY RESULTS
    console.log(questions);
    clearQuestion();
    // remove the button and score markers from final screen
    button.classList.add("hide");
    score.classList.remove("hide");
    score.querySelector("p").innerHTML = `${
      scoreScale[totalScore ? totalScore - 1 : 0]
    }<br> SCORE <br>${totalScore}/${questions.length}`;
    console.log("Total correct: ", totalScore);

    // Reset button
    let fullReset = document.getElementById("fullReset");
    fullReset.addEventListener(
      "click",
      function(e) {
        location.reload();
      },
      false
    );
  }
  else {
    // IF NOT, SET UP NEXT QUESTION
    questionsIndex += 1;
    displayQuestion(questionsIndex);
  }
};

const displayMarkers = () => {
  let progressMarker = ``;
  questions.forEach(function(current, index) {
    // create a progress marker
    progressMarker = `<div class="marker" data-marker="${index}"></div>`;
    // add to progress bar
    progress.insertAdjacentHTML("afterbegin", progressMarker);
  });
};

const clearQuestion = () => {
  question.innerHTML = "";
  choices.innerHTML = "";
};

const displayQuestion = index => {
  // clear any previous content
  clearQuestion();
  // grab question from questions array
  let current = questions[index];
  console.log('current', current);
  // create question HTML
  let questionText = `<p>${current.question}</p>`;
  // for each choice
  // create choice HTML
  let answerText = ``;
  if(questionsIndex === 5){
    quiz.style.height="600px";
  }
  for (const property in current.answers) {
    answerText += `<div class = "choicesButton"><p>
            <input type="radio" name="choice" id="choice_${property}" value="${property}">
            <label for="choice_${property}">${current.answers[property]}</label>
        </p></div>`;
  }
  
  // console.log(questionText);
  // console.log(answerText);
  // insert html into .question, .choices and .progress
  question.insertAdjacentHTML("afterbegin", questionText);
  choices.insertAdjacentHTML("afterbegin", answerText);
};

button.addEventListener("click", nextQuestion);

// START QUIZ
(function startQuiz() {
  // display markers
  displayMarkers();
  // set up first question
  displayQuestion(questionsIndex);
})();
