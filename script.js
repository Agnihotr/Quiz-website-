const questions =[
    {
        question: "Which is larget animal in the world.",
        answer: [
            { text: "shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is smallest animal in the world..",
        answer: [
            { text: "Reptiles", correct: false},
            { text: "Bee hummingbrid", correct: true},
            { text: "Shrews", correct: false},
            { text: "Cat", correct: false},
        ]
    },
    {
        question: "Which is larget desert in the world.",
        answer: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is smallest country in the world.",
        answer: [
            { text: "Vatican city", correct: true},
            { text: "Andorra", correct: false},
            { text: "Angola", correct: false},
            { text: "Brazil", correct: false},
        ]
    },
];

const questionElemant = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let curretQuestionIndex = 0;
let score = 0;

function startQuiz(){
    curretQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
} 

function showQuestion(){
    resetstate();
    let curretQuestion = questions[curretQuestionIndex];
    let questionNo = curretQuestionIndex +1;
    questionElemant.innerHTML = questionNo + "." + curretQuestion.question;

    curretQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function  showScore(){
    resetstate();
    questionElemant.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    curretQuestionIndex++;
    if(curretQuestionIndex < questions.length){
        showQuestion();
}else{
    showScore();
}
}
nextButton.addEventListener("click",() =>{
    if(curretQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();