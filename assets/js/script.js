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

const questions = ["adds new elements to the end of an array, and returns the new length"]
var question

startEl.addEventListener("click", start)

function start() {
    mainEl.remove();        //clears screen
    startTimer();           //starts timer
    pullQuestion();         //pulls in random question
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

function pullQuestion() {
    question = questions[Math.floor(Math.random()*questions.length)]
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
    pullQuestion();
    questionEl.textContent = question
}