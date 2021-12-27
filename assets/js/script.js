var bodyEl = document.body
var mainEl = document.getElementById('main');
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var questionEl = document.createElement("h1");
var divEl1 = document.createElement("div");
var divEl2 = document.createElement("div");
var divEl3 = document.createElement("div")
var choice1El = document.createElement("button");
var choice2El = document.createElement("button");
var choice3El = document.createElement("button");
var choice4El = document.createElement("button");

var timeLeft


// position number for answers and questions arrays must match for each defintion/method
const questions = ["adds new elements to the end of an array, and returns the new length", "Joins all elements of an array into a string","Selects a part of an array, and returns the new array","Creates a new array with the result of calling a function for each array element","Removes the last element of an array, and returns that element"];
const answers = ["push()", "join()", "slice()", "map()", "pop()"]

var question
var answer1
var answer2
var answer3
var correctAnswer

startEl.addEventListener("click", start)

function start() {
    mainEl.remove();        //clears screen
    startTimer();           //starts timer
    pullQuestionAndAnswer();         //pulls in random question
    generateLayout();       //generates layout for new question
    askQuestion();          //displays new question with 
}

function startTimer () {
    timeLeft=100
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time Left: " + timeLeft;
        if (timeLeft == 0) {
            clearInterval(timeInterval)
        }
    }, 1000)
}

function pullQuestionAndAnswer() {
    question = questions[Math.floor(Math.random()*questions.length)]
    var position = questions.indexOf(question)
    answer1 = answers[Math.floor(Math.random()*answers.length)]
    answer2 = answers[Math.floor(Math.random()*answers.length)]
    answer3 = answers[Math.floor(Math.random()*answers.length)]
    correctAnswer = answers[position];

    console.log(question);
    console.log(correctAnswer);
}

function generateLayout() {
    bodyEl.appendChild(divEl1)
    divEl1.appendChild(questionEl);
    bodyEl.appendChild(divEl2);
    divEl2.appendChild(choice1El);
    divEl2.appendChild(choice2El);
    divEl2.appendChild(choice3El);
    divEl2.appendChild(choice4El);

    divEl1.setAttribute("class", "row")
    divEl1.setAttribute("style", "justify-content:center; margin-top: 2em;")
    divEl2.setAttribute("style","display:flex; flex-wrap:wrap; justify-content:center; gap: 1em; margin:7%;") 
    choice1El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px")
    choice2El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px")
    choice3El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px")
    choice4El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px")
} 

function askQuestion() {
    pullQuestionAndAnswer();
    questionEl.textContent = question
}