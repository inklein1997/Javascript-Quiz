var mainEl = document.getElementById('main');
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var questionEl = document.createElement("h2");
var choice1El = document.createElement("button");
var choice2El = document.createElement("button");
var choice3El = document.createElement("button");
var choice4El = document.createElement("button");


startEl.addEventListener("click", start)

function start() {
    mainEl.remove();
}




//click start
    //1. timer starts
    //2. screen clears
    //3. first question pops up
        //1. question pops up up with 4 buttons
        //2. user must select button
        //3. if user selects wrong button, timer decreases by 10 and 
