var bodyEl = document.body;
var highscoresEl = document.getElementById('highscores');
var buttonEl = document.createElement("button")
//for question Display
var mainEl = document.getElementById('main');
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var newMainEl = document.createElement('main');
var h2El = document.createElement('h2');
var h1El = document.createElement("h1");
var divEl1 = document.createElement("div");
var divEl2 = document.createElement("div");
var choice1El = document.createElement("button");
var choice2El = document.createElement("button");
var choice3El = document.createElement("button");
var correctChoiceEl = document.createElement("button");
var notifyEl = document.createElement("h2");

//for end display
var sectionEl = document.createElement("section");
var submitEl = document.createElement("input");
var inputEl = document.createElement("input");
var formEl = document.createElement("form");
var labelEl = document.createElement("label");

var timeLeft;           //stores remaining time/score

var question;           //stores the chosen question
var position;           //needed for position of object in [questions]
var answer1;            //stores an incorrect answer
var answer2;            //stores an incorrect answer
var answer3;            //stores an incorrect answer
var correctAnswer;      //stores the correct answer
var questionNumber = 0; //Question Number out of 5

//provides question with matching answer and incorrect answers
var questions = [
    question0 = {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: "<script>",
        incorrect: ["<scripting>","<js>", "<javascript>"]
    },
    question1 = {
        question: "What is meant by 'this' keyword in JavaScript?",
        answer: "It refers to the current object",
        incorrect: ["It refers to the previous object","It refers to the variable that contains its value","None of the above"]
    },
    question2 = {
        question: "Which of the following is a JavaScript Object?",
        answer: "array",
        incorrect: ["string","number","if statement"]
    },
    question3 = {
        question: "Which tool is commonly used to debug code in JavaScript?",
        answer: "all of the above",
        incorrect: ["console.log()","Chrome DevTools", "3rd-Party debuggers"]
    },
    question4 = {
        question: "Which Array Method removes the last element of an array, and returns that element",
        answer: "pop()",
        incorrect: ["push()", "join()", "slice()"],
    },
    question5 = {
        question: "Removes the first element of an array, and returns that element",
        answer: "shift()",
        incorrect: ["join()", "slice()", "map()"],
    }
];

startEl.addEventListener("click", start);                   //if clicked, quiz starts
correctChoiceEl.addEventListener("click", notifyCorrect);   //if clicked, adds 1 to score and notifies user answer is correct.  generates new question
choice1El.addEventListener("click", notifyIncorrect);       //if clicked, removes 10 from time and notifies user answer is incorrect.  generates new question
choice2El.addEventListener("click", notifyIncorrect);       //if clicked, removes 10 from time and notifies user answer is incorrect.  generates new question
choice3El.addEventListener("click", notifyIncorrect);       //if clicked, removes 10 from time and notifies user answer is incorrect.  generates new question

highscores(); //calls function on page start to allow user to toggle highscore screen whenever wanted
function highscores() {
    highscoresDisplay();
    sectionEl.setAttribute("style","display:none")
    highscoresEl.addEventListener('click', function(event) {    //uses data attributes to toggle between quiz and highscore screen
        var element = event.target;                             //targets the element the event took place
        var state = element.getAttribute("data-state")          //pulls current data-state value (hide/visible)
        if (state=="hide") {                                    //if data-state = hide, then...
            element.setAttribute("data-state","visible")                                //change data-state to visible
            sectionEl.setAttribute("style","display:flex; gap: 1em; margin: 5vh 5vw")   //display highscore interface    
            mainEl.setAttribute("style","display:none;")                                //and hide quiz screen
        } else {                                                //if data-state = visible, then...
            element.setAttribute("data-state","hide")               //change data-state to hide
            sectionEl.setAttribute("style","display:none")          //hide highscore interface
            mainEl.setAttribute("style","display:flex;")            //and display quiz screen
        }
    })
}

function start() {
    mainEl.innerHTML = ""       //clears screen
    questionDisplay();          //generates layout for new question
    askQuestion();              //displays new question with 
    startTimer();               //starts timer
};

function askAgain() {
    mainEl.innerHTML = "";      //clears screen
    questionDisplay();          //generates layout for a new question
    askQuestion();              //picks question that has not been used yet
};

function questionDisplay() {
    var appendOption = [correctChoiceEl, choice1El, choice2El, choice3El];
    
    for (var i = 0; i < 4; i++) {       //For loop appends options in randomized order
    var randomAppendOption = appendOption[Math.floor(Math.random()*appendOption.length)];
    var positionAppendOption = appendOption.indexOf(randomAppendOption);
    appendOption.splice(positionAppendOption, 1);   //prevents the same button from being added twice by removing it from array once it has been added.
    divEl2.appendChild(randomAppendOption);
    }

    //adds classes/styles to elements
    divEl1.setAttribute("class", "column");
    divEl1.setAttribute("style", "justify-content:center; margin-top: 2em; gap: 2em;");
    divEl2.setAttribute("style","display:flex; flex-wrap:wrap; justify-content:center; gap: 1em; margin:7%;");
    h1El.setAttribute("style","max-width:none;");
    h2El.setAttribute("style","width: 280px;align-self:center;");
    choice1El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0;");
    choice2El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0;");
    choice3El.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0;");
    correctChoiceEl.setAttribute("style","flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 2em; padding:0;");

    //appends elements
    mainEl.appendChild(divEl1);
    divEl1.appendChild(h2El);
    divEl1.appendChild(h1El);
    mainEl.appendChild(divEl2);  
}

function askQuestion() {
    pullQuestionAndAnswer();    //pulls random question and mathcing answer out from array
    h2El.textContent = "Question " + questionNumber + " out of 5";
    h1El.textContent = question;
    choice1El.textContent = answer1;    //incorrect answer
    choice2El.textContent = answer2;    //incorrect answer
    choice3El.textContent = answer3;    //incorrect answer
    correctChoiceEl.textContent = correctAnswer;    //correct answer
}

function pullQuestionAndAnswer() {
    var questionSelection = questions[Math.floor(Math.random()*questions.length)];      //selects random question from array
    position = questions.indexOf(questionSelection);

    question = questionSelection.question;            //pulls question from question[n].question]
    correctAnswer = questionSelection.answer;         //pulls matching answer from question[n].answer]

    answer1 = questionSelection.incorrect[Math.floor(Math.random()*this.length)];                   //selects incorrect answer options for multiple choice
    questionSelection.incorrect.splice((questionSelection.incorrect.indexOf(answer1)),1);           //prevents displaying duplicate incorrect answer twice by removing them from the array

    answer2 = questionSelection.incorrect[Math.floor(Math.random()*this.length)];                   //selects incorrect answer options for multiple choice
    questionSelection.incorrect.splice((questionSelection.incorrect.indexOf(answer2)),1);           //prevents displaying duplicate incorrect answer twice by removing them from the array

    answer3 = questionSelection.incorrect[Math.floor(Math.random()*this.length)];                   //selects incorrect answer options for multiple choice
    questionSelection.incorrect.splice((questionSelection.incorrect.indexOf(answer3)),1);           //prevents displaying duplicate incorrect answer twice by removing them from the array; 
    
    questionNumber++;       //updates question number i.e. Question 1 out of 5, 2 out of 5, etc

}

function startTimer () {            //starts 100 second countdown
    timeLeft=100;
    var timeInterval = setInterval(function() {
        timeLeft-=0.01;
        timerEl.textContent = "Time Left: " + timeLeft.toFixed(2);       //displays countdown
        if ((timeLeft <= 0) || (questions.length < 2)) {    //If user runs out of time or clicks through all the answer, then...
            clearInterval(timeInterval);                    //timer stops
            quizEnd();                                      //quiz ends
        }
    }, 10)
};

function notifyCorrect() {      //displays notification for correct selections
    var popupTimeCorrect = 1.5;
    questions.splice(position, 1);      //removes question from array so it cannot be asked again
    askAgain();                         //prompts next question
    var popupIntervalCorrect = setInterval(function() {     //notification only appears for a brief period time
        popupTimeCorrect-=0.02;
        mainEl.appendChild(notifyEl);
        notifyEl.textContent = "CORRECT!";
        if (popupTimeCorrect <= 0) {
            clearInterval(popupIntervalCorrect);
            notifyEl.remove();
        }
    },10)
};

function notifyIncorrect() {    //displays notification for incorrect selections
    timeLeft-=10;               //removes 10 seconds from remaining time
    var popupTimeIncorrect = 1.5;
    questions.splice(position, 1);  //removes question from array so it cannot be asked again.
    askAgain();                     //prompts next question
    var popupIntervalIncorrect = setInterval(function() {   //notification only appears for a brief period time
        popupTimeIncorrect-=0.02;
        mainEl.appendChild(notifyEl);
        notifyEl.textContent = "INCORRECT!";
        if (popupTimeIncorrect <= 0) {
            clearInterval(popupIntervalIncorrect);
            notifyEl.remove();
        }
    },10)
};

function endDisplay() {     //generates display for end of quiz
    h1El.textContent = "Quiz is over!";
    labelEl.textContent = "Enter Initials: ";
    h2El.textContent = "Score: " + timeLeft.toFixed(2);
    
    submitEl.setAttribute("type","submit");
    mainEl.setAttribute("style","align-content: center");
    formEl.setAttribute("class","row");
    formEl.setAttribute("style","gap:10px; align-items: center; background-color:#202020; padding:10px;");
    inputEl.setAttribute("style","color:black;")
    submitEl.setAttribute("style","background-color: #B385F2; border-radius:5px;");
    
    mainEl.appendChild(h1El);
    mainEl.appendChild(h2El);
    mainEl.appendChild(formEl);
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);
}

function quizEnd() {
    mainEl.innerHTML="";
    endDisplay();
    submitEl.addEventListener('click', function(event) {                //adds event listener to submit button
        event.preventDefault();                                         //prevents page from refreshing if submit is clicked
        var scoreboard = {                                              //object that will be stored into local storage
            score: timeLeft.toFixed(2),
            initials: inputEl.value.trim(),
        }      
        var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
        localStorage.setItem("highscore",JSON.stringify(scoreboard))
    })
}

function highscoresDisplay() {      //generates highscore interface
    var h2El1 = document.createElement("h2")
    
    function renderHighscores() {   //display score from local storage
        var scoreboard = JSON.parse(localStorage.getItem("highscore"));         //pulls highscore from local storage
        if (scoreboard !== null) {
            h2El1.textContent = scoreboard.initials + " " + scoreboard.score    //displays highscore from local storage
        }
    }
    renderHighscores();

    sectionEl.setAttribute("class","column");
    bodyEl.appendChild(sectionEl);
    sectionEl.appendChild(document.createElement("h1")).textContent = "Highscore";
    sectionEl.appendChild(h2El1);
}