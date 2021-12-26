var mainEl = document.getElementById('main');
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var questionEl = document.createElement("h2");
var choice1El = document.createElement("button");
var choice2El = document.createElement("button");
var choice3El = document.createElement("button");
var choice4El = document.createElement("button");

var timeLeft


startEl.addEventListener("click", start)

function start() {
    mainEl.remove();
    startTimer();
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
