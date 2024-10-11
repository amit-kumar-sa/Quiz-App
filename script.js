const questions=[
    {
        question:"Which is largest animal in the world?",
        answers :[
            {text:"shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}

        ]
    },
    {
        question:"Which is smallest animal in the world?",
        answers :[
            {text:"rat",correct:false},
            {text:"Etruscan Shrew",correct:true},
            {text:"Pygmy Marmoset",correct:false},
            {text:"Giraffe",correct:false}

        ]

    },
    {
        question:"Which is the largest desert in the world?",
        answers :[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true}

        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers :[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Antarctica",correct:false},
            {text:"Africa",correct:false}

        ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currnetQuestionIndex =0;
let score = 0;


function startQuiz(){
    currnetQuestionIndex=0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currnetQuestionIndex];
    let questionNo = currnetQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function hadleNextButton(){
    currnetQuestionIndex++;
    if(currnetQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currnetQuestionIndex<questions.length){
        hadleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();