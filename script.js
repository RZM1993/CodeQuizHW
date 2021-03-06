var questions = [{
    
    
    title: "Which of the following signs are used for an array?",
    choices: ["{},","<>","[]","()"],
    answer: "[]"
    },

    {
    title: "What do you use to style a web?",
    choices: ["HTML","CSS","JavaScript","Copy and Paste"],
    answer: "CSS"
    },

    {
    title: "What tag do you use so a line stands by itself?",
    choices: ["p","h1","img","footer"],
    answer: "p"
    },

    {
    title: "What does HTML stand for?",
    choices: ["Hot Tea Mess Lemon","Hyper Text Markup Language","Hersey Twix M&M Lindor"],
    answer: "Hyper Text Markup Language"
    },

    {
    title: "Whats the Orderd List Tag?",
    choices: ["li","ol","p","ul"],
    answer: "ol"
}


]

var score = 0;
var startingQuestion = -1;
var timeLeft = 0;
var timer;


function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

    if (timeLeft <=0) {
        clearInterval(timer);
        endQuiz();

    }

    }, 1000);

    next();
}

function endQuiz() {
    clearInterval(timer);

    var quizInfo = `
    <h2>Times Up!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizInfo;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizInfo = `
    <h2>` + localStorage.getItem("highscoreName") + `highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1>
    
    <button onclick="clearScore()">Clear score!</button>
    <button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizInfo;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizInfo = `
    <h1>
        Coding Quiz!
    </h1>
    <h3>
        Click to play 
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizInfo;
}

function incorrect() {
    timeLeft -= 15; 
    next();
}



function correct() {
    score += 20;
    next();
}


function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}