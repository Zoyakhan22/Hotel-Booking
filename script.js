
const questions = [
    {
        question: "which language runs in a web browser?",
        answers: [
            { text: "java ", correct: false},
            { text: "C", correct: false},
            { text: "Python ", correct: false},
            { text: "javaScript ", correct: true}
        ]
    },
    {
      question: "what does CSS stsnds for?",
        answers: [
            { text: "Central Style Sheets", correct: false},
            { text: "Cascading Style Sheets", correct: true},
            { text: "Computer Style Sheet", correct: false},
            { text: "Colorful Style Sheets ", correct: false}  
        ]
    },
    {
    question: "what year was JavaScript launched?",
        answers: [
            { text: "1996", corect: false},
            { text: "1995", correct: true},
            { text: "1994", correct: false},
            { text: "None of the above ", correct: false}  
        ]
    },
    {
    question: "which of the following is not a Javascript framework?",
        answers: [
            { text: "Node", corect: false},
            { text: "Vue", correct: false},
            { text: "React", correct: false},
            { text: " Cassandra", correct: true}  
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer  => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerText =`You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});




startQuiz();
    