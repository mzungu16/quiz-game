// DOM elements
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const questionTxt = document.getElementById("question-text");
const totalQuestions = document.getElementById("total-questions");
const currentQuestionEl = document.getElementById("current-question");
const scoreValue = document.getElementById("score");
const answerContainer = document.getElementById("answer-container");
const progress = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
];

// Quiz initial values
let currentQuestionIndex = 0;
let score = 0;
let isAnswerDisabled = false;

totalQuestions.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

// Listeners
startBtn.addEventListener("click", startBtnOnClick);
restartBtn.addEventListener("click", restartBtnOnClick);

function startBtnOnClick() {
    console.log("quiz started");
    currentQuestionIndex = 0;
    score = 0;
    scoreValue.textContex = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    isAnswerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progress.style.width = progressPercent + "%";
    questionTxt.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectBtnOnClick);
        answerContainer.appendChild(button);
    });

}

function selectBtnOnClick(event) {
    if (isAnswerDisabled) return;
    isAnswerDisabled = true;
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    Array.from(answerContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        else if (button === selectedBtn) {
            button.classList.add("incorrect");
        }
    });
    if (isCorrect) {
        score++;
        scoreValue.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScore.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartBtnOnClick() {
    console.log("quiz restarted");
    resultScreen.classList.remove("active");
    startBtnOnClick();
}