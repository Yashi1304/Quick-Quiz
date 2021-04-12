const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById('questionCounter');
const scoreText=document.getElementById('score');

let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questions=[ 
{
	question: "What name is given for a shape with ten sides?",
	choice1: "Octagon",
	choice2: "Triangle",
	choice3: "Decagon",
	choice4: "Square",
	answer:3
},
{
	question: "Where would you find the Eiffel Tower?",
	choice1: "Germany",
	choice2: "India",
	choice3: "Japan",
	choice4: "France",
	answer:4
},
{
	question: "Which planet is closest to Neptune?",
	choice1: "Mercury",
	choice2: "Uranus",
	choice3: "Earth",
	choice4: "Saturn",
	answer:2
}
];
const CORRECT_BONUS=10;
const MAX_QUESTIONS=3;

startGame=() => {
	questionCounter=0;
	score=0;
	availableQuestions=[ 
	{
	question: "What name is given for a shape with ten sides?",
	choice1: "Octagon",
	choice2: "Triangle",
	choice3: "Decagon",
	choice4: "Square",
	answer:3
},
{
	question: "Where would you find the Eiffel Tower?",
	choice1: "Germany",
	choice2: "India",
	choice3: "Japan",
	choice4: "France",
	answer:4
},
{
	question: "Which planet is closest to Neptune?",
	choice1: "Mercury",
	choice2: "Uranus",
	choice3: "Earth",
	choice4: "Saturn",
	answer:2
}
];
	getNewQuestion();
};

getNewQuestion=() => {
	if(availableQuestions.length==0||questionCounter>=MAX_QUESTIONS){
		localStorage.setItem("mostRecentScore",score);
		return window.location.assign("end.html");
	}
	questionCounter++;
	questionCounterText.innerText = questionCounter+"/" +MAX_QUESTIONS;
	const questionIndex=Math.floor(Math.random()*availableQuestions.length);
	currentQuestion=availableQuestions[questionIndex];
	question.innerText=currentQuestion.question;
	
	choices.forEach(choice=> {
		const number = choice.dataset["number"];
		choice.innerText= currentQuestion["choice"+number];
	});


availableQuestions.splice(questionIndex,1);
acceptingAnswers=true;
};

choices.forEach(choice=> {
	choice.addEventListener("click",e => {
		if(!acceptingAnswers) return;
		
		acceptingAnswers=false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];
		
		const classToApply= 
		selectedAnswer==currentQuestion.answer ? "correct" :"incorrect";
		if (classToApply=="correct") {
			incrementScore(CORRECT_BONUS);
		}
		selectedChoice.parentElement.classList.add(classToApply);
		
		setTimeout(()=>{
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		},1000);
	});
});

incrementScore=num => {
	score += num;
	scoreText.innerText=score;
};
			

startGame();	
	


