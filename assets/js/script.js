var bodyEl = document.body

//for question Display
var mainEl = document.getElementById('main');
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var newMainEl = document.createElement('main');
var questionEl = document.createElement("h1");
var divEl1 = document.createElement("div");
var divEl2 = document.createElement("div");
var divEl3 = document.createElement("div");
var choice1El = document.createElement("button");
var choice2El = document.createElement("button");
var choice3El = document.createElement("button");
var correctChoiceEl = document.createElement("button");
var notifyEl = document.createElement("h2");

//for end Display
var newMainEl1 = document.createElement('main');
var h1El = document.createElement('h1');
var h2El = document.createElement('h2');
var formEl = document.createElement("form");
var labelEl = document.createElement("label");
var inputEl = document.createElement("input");
var submitEl = document.createElement("input");

var timeLeft

// position number for answers and questions arrays must match for each defintion/method
var questions = ["adds new elements to the end of an array, and returns the new length", "Joins all elements of an array into a string","Selects a part of an array, and returns the new array","Creates a new array with the result of calling a function for each array element","Removes the last element of an array, and returns that element"];
var answers;



var question
var position
var answer1
var answer2
var answer3
var correctAnswer

//Remaining things to do...
    //highscore storage
    //event.preventDefault();

startEl.addEventListener("click", start);
correctChoiceEl.addEventListener("click", notifyCorrect);   //if clicked, adds 1 to score and notifies user answer is correct.  generates new question
choice1El.addEventListener("click", notifyIncorrect);       //if clicked, removes 10 from time and notifies user answer is incorrect.  generates new question
choice2El.addEventListener("click", notifyIncorrect);       //if clicked, removes 10 from time and notifies user answer is incorrect.  generates new question
choice3El.addEventListener("click", notifyIncorrect);       //if clicked, removes 10 from time and notifies user answer is incorrect.  generates new question

function start() {
    mainEl.remove();                //clears screen
    generateQuestionDisplay();      //generates layout for new question
    askQuestion();                  //displays new question with 
    startTimer();                   //starts timer
}

function askAgain() {
    newMainEl.remove();             //clears screen
    generateQuestionDisplay();      //generates layout for a new question
    askQuestion();                  //picks question that has not been used yet
}

function startTimer () {
    timeLeft=100
    var timeInterval = setInterval(function() {
        timeLeft-=0.01;
        timerEl.textContent = "Time Left: " + timeLeft.toFixed(2);      //displays countdown
        if ((timeLeft <= 0) || questions.length == 0) {                 //If user runs out of time or clicks through all the answer, the quiz ends.
            clearInterval(timeInterval);
            newMainEl.remove();
            quizEnd();
        }
    }, 10)
}

function pullQuestionAndAnswer() {
    var answers = ["push()", "join()", "slice()", "map()", "pop()"];

    question = questions[Math.floor(Math.random()*questions.length)];   //selects random question from array
    position = questions.indexOf(question);                             //determines position of question
    
    
    correctAnswer = answers[position];                                  //answers array position matches with questions array position.  Will always be the correct answer.
    answers.splice(position,1);                                         //removes option so the answer cannot be selected again for question.

    answer1 = answers[Math.floor(Math.random()*answers.length)];
    answers.splice(answers.indexOf(answer1),1);

    answer2 = answers[Math.floor(Math.random()*answers.length)];
    answers.splice(answers.indexOf(answer2),1);

    answer3 = answers[Math.floor(Math.random()*answers.length)];
    answers.splice(answers.indexOf(answer3),1); 
}


function generateQuestionDisplay() {
    var appendOption = [correctChoiceEl, choice1El, choice2El, choice3El]
    
    for (var i = 0; i < 4; i++) {       //For loop appends options in randomized order
    var randomAppendOption = appendOption[Math.floor(Math.random()*appendOption.length)]
    var positionAppendOption = appendOption.indexOf(randomAppendOption);
    appendOption.splice(positionAppendOption, 1);
    divEl2.appendChild(randomAppendOption);
    }

    bodyEl.appendChild(newMainEl)
    newMainEl.appendChild(divEl1)
    divEl1.appendChild(questionEl);
    newMainEl.appendChild(divEl2);
    newMainEl.appendChild(notifyEl);

    divEl1.setAttribute("class", "row")
    divEl1.setAttribute("style", "justify-content:center; margin-top: 2em;")
    divEl2.setAttribute("style","display:flex; flex-wrap:wrap; justify-content:center; gap: 1em; margin:7%;") 
    choice1El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0")
    choice2El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0")
    choice3El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0")
    correctChoiceEl.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0")
} 

function askQuestion() {
    pullQuestionAndAnswer();    //pulls random question and mathcing answer out from array
    questionEl.textContent = question;
    choice1El.textContent = answer1;
    choice2El.textContent = answer2;
    choice3El.textContent = answer3;
    correctChoiceEl.textContent = correctAnswer;
}

function notifyCorrect() {
    notifyEl.textContent = "You answered correctly!";
    questions.splice(position, 1);      //removes question from array so it cannot be asked again
    askAgain();
}

function notifyIncorrect() {
    notifyEl.textContent = "You answered incorrectly!";
    questions.splice(position, 1);      //removes question from array so it cannot be asked again
    timeLeft -= 10;
    askAgain();
}

function endDisplay(event) {
    h1El.textContent = "Quiz is over!"
    labelEl.textContent = "Enter Initials: "
    h2El.textContent = "Score: " + timeLeft.toFixed(2);
    
    submitEl.setAttribute("type","submit");
    newMainEl1.setAttribute("class","column");
    newMainEl1.setAttribute("style","align-items: center");
    formEl.setAttribute("class","row");
    formEl.setAttribute("style","justify-content: center;gap:10px; align-items: center; background-color:#202020; padding:10px;")
    submitEl.setAttribute("style","background-color: #B385F2; padding: 3% 9%; border-radius:5px;")

    bodyEl.appendChild(newMainEl1);
    newMainEl1.appendChild(h1El);
    newMainEl1.appendChild(h2El);
    newMainEl1.appendChild(formEl);
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);
}

function quizEnd() {
    newMainEl.remove();
    endDisplay(event);
}