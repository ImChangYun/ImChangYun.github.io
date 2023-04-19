console.log("yo, I'm alive!");

//------------------------------------------------------------------------------------
//		      Hook Potential Calculator for Bowling Balls
//------------------------------------------------------------------------------------
var result = document.getElementById("hookResult");
var rgInput = document.getElementById("RG");
var rgInput2 = document.getElementById("RG2");
var diffInput = document.getElementById("Differential");
var diffInput2 = document.getElementById("Differential2");

//---------------------------- FORMULAS TO CALCULATE VARIABLE VALUES ----------------------------------------

// RG Value
var rgCalc = function(x){
	if (x < 2.46) { return "Error"}
	if (x < 2.52) { return "Low"}
	if (x < 2.57) { return "Medium"}
	if (x < 2.81) { return "High"};
}

// Differential Value
var diffCalc = function(x){
	if (x < 0.000) { return "Error"}
	if (x < 0.026) { return "Low"}
	if (x < 0.047) { return "Medium"}
	if (x < 0.061) { return "High"};
}

// Potential to Hook Value
var hookCalc = function(rg,diff){
	// Normal 1:1 Range
	if (rg === "Low" && diff === "Low") {return "Low"};
	if (rg === "Medium" && diff === "Medium") {return "Medium"};
	if (rg === "High" && diff === "High") {return "High"};

	// Mixed Ranges
	if ((rg === "Low" && diff === "Medium") || (rg === "Medium" && diff === "Low")) {return "Low-Mid"};
	if ((rg === "Low" && diff === "High") || (rg === "High" && diff === "Low")) {return "Medium"};
	if ((rg === "High" && diff === "Medium") || (rg === "Medium" && diff === "High")) {return "Mid-High"};

	if ((rg === "Error") || (diff === "Error")) {return "Error, please input correct values"};
};

// Update feedback on Hook Potential of Ball
var update = function(){
	rg = rgCalc(rgInput.value);
	diff = diffCalc(diffInput.value);
	calc = hookCalc(rg,diff);

	hookResult.innerHTML = `The Hook Potential of this ball is: <span style="color: #228B22"><b>${calc}<b></span>`;

	console.log(rg)
	console.log(diff)
	console.log(calc)
};


//-------------------------EVENT LISTENERS FOR ALL VARIABLE INPUTS---------------------------------
rgInput.addEventListener('input', function(){
	update();
	rgInput2.value = rgInput.value;
});

rgInput2.addEventListener('input', function(){
	update();
	rgInput.value = rgInput2.value;
});

diffInput.addEventListener('input', function(){
	update();
	diffInput2.value = diffInput.value;
});

diffInput2.addEventListener('input', function(){
	update();
	diffInput.value = diffInput2.value;
});

//----------------------------------------------------------------------------------------------------




//---------------------------------------------------------
//			            QUIZ SYSTEM
//---------------------------------------------------------


//------------------QUESTION GENERATION--------------------

// Random Values Function for RG & Differential Values
let randInt = function( m, n ) {
    let range = n-m;
    let randomR = Math.random()*range;
    return m+randomR;
}

// Minimum and Maximum RG & Differential Values
var minRG = 2.46;
var maxRG = 2.80;
var minDiff = 0.000;
var maxDiff = 0.060;

// Random RG & Differential Values
let randRG = function(){
	var result = randInt(minRG, maxRG);
	return result;
}

let randDiff = function(){
	var result = randInt(minDiff, maxDiff);
	return result;
}

// Question Value Generation
let rgQuestion = function(){   //RG Value
	var rg = randRG().toFixed(2);

	console.log(`Question Generated Value: The RG is ${rg}`)
	return rg;
}

let diffQuestion = function(){   //Differential Value
	var diff = randDiff().toFixed(3);

	console.log(`Question Generated Value: The RG is ${diff}`)
	return diff;
}

//--------------------------------------------------------
//					QUESTION GENERATION 
//--------------------------------------------------------

// Temp Question Value Holders
var currentRG;
var currentDiff;

// Question Value Initiation
let makeQuestion = function(){
	currentRG = rgQuestion();
	currentDiff = diffQuestion();

	console.log(`How strong is a bowling ball with ${currentRG} RG and ${currentDiff} Differential?`)
}

// Formula to calculate the answer of Generated Question ----------------------
let calcAnswer = function(){
	var x = rgCalc(currentRG);
	var y = diffCalc(currentDiff);
	var answer = hookCalc(x,y);

	console.log(`The correct answer is ${answer}.`)
	return answer;
}

//---------------------------------ACTIVATION SEQUENCE OF QUIZ----------------------------------------
var startButton = document.getElementById("startQuiz");
var timerText = document.getElementById("timer");
var questionText = document.getElementById("question");
var quizSlider = document.getElementById("quizSlider");
var submitButton = document.getElementById("submitQuiz");
var nextQuestion = document.getElementById("continueQuiz")
var result = document.getElementById("result");

var sliderText = `Testing`;

// 1. Start Quiz
startButton.addEventListener("click", function(){
	startPrep();
	makeQuestion();
	startTimer();
	questionText.innerHTML = `The question is: How strong is a bowling ball with ${currentRG} RG and ${currentDiff} Differential?`;

	startQuiz.style.display="none";
});


// 2. After user entered answer in box and pressed "Submit Answer"

// Determine if User has entered correct answer
var calcUserAnswer = function(x,y){
	if (x === y) {console.log(`Correct`); return "That's correct!"}
	else {console.log(`Wrong`); return `Oh no, the correct answer is ${x}!`};
};

submitButton.addEventListener("click", function(){
	clearInterval(timing);

	var answer = calcAnswer(); //Correct Answer
	var userAnswer = textChange(quizSlider.value); //User's Answer
	console.log(`User Answer: ${userAnswer}`);
	var final = calcUserAnswer(answer , userAnswer);

	result.innerHTML = `${final}`
	nextPrep();
});


// 3. Quiz Continue Button [NEXT QUESTION]------------------------

nextQuestion.addEventListener("click", function(){
	startPrep();
	makeQuestion();
	startTimer();
	questionText.innerHTML = `The question is: How strong is a bowling ball with ${currentRG} RG and ${currentDiff} Differential?`;

	nextQuestion.style.display="none";
});


//---------------------QUIZ TIMER--------------------------
var totalTime = 10;
var loadTime=Date.now()
var state = `off`;

var updateTimerText = function(){
	countdown = 20-((Date.now()-loadTime)/1000);
	timerText.innerHTML = `${countdown.toFixed(2)}s`;
	if (countdown < 0) {
		clearInterval(timing);
		timerText.innerHTML = `0`;
		state = `off`;

		var answer = calcAnswer(); //Correct Answer
		var userAnswer = textChange(quizSlider.value); //User's Answer
		console.log(`User Answer: ${userAnswer}`);
		var final = calcUserAnswer(answer , userAnswer);
		result.innerHTML = `${final}`

		nextPrep();
	}
};

var startTimer = function(){
	if (state === `off`) {
		state = `on`;
		loadTime=Date.now();
		timing = setInterval(updateTimerText,10);
	}

	if (state === `on`) {
		clearInterval(timing);
		loadTime=Date.now();
		timing = setInterval(updateTimerText,10);		
	}
};

 

//-------------------QUIZ SLIDER-------------------------
var quizSlider = document.getElementById("quizSlider");
var sliderOutput = document.getElementById("sliderOutput");


quizSlider.addEventListener("input", function(){
	console.log(`Quiz Slider Working ${quizSlider.value}`);

	x = textChange(quizSlider.value);

	sliderOutput.innerHTML = `${x}`;

})

//Function to determine slider value
var textChange = function(x){
	console.log(`textchange func working`)
	console.log(`X is ${x}`)
	if (x == 0) {return "Low"};
	if (x == 1) {return "Low-Mid"};
	if (x == 2) {return "Medium"};
	if (x == 3) {return "Mid-High"};
	if (x == 4) {return "High"};
	}

var textUpdate = function(x){
	sliderText = textChange(x);
}


//-------------	 QUIZ ELEMENTS VISIBILITY ---------------------

// Hiding of Quiz Elements on Load
nextQuestion.style.display = "none";
timerText.style.display = "none";
questionText.style.display = "none";
quizSlider.style.display = "none";
submitButton.style.display = "none";
sliderOutput.style.display = "none";
result.style.display = "none";

// Elements when Start button is pressed;
var startPrep = function(){
	timerText.style.display = "inline-block";
	questionText.style.display = "inline-block";
	quizSlider.style.display = "inline-block";
	submitButton.style.display = "inline-block";
	sliderOutput.style.display = "inline-block";
	result.style.display = "none";
}

// Elements when question complete
var nextPrep = function(){
	nextQuestion.style.display = "inline-block"
	result.style.display = "inline-block";
	timerText.style.display = "none";
	questionText.style.display = "none";
	quizSlider.style.display = "none";
	submitButton.style.display = "none";
	sliderOutput.style.display = "none";
};


//----------------------------------------------------------------------------------------
//											END OF CODE
//----------------------------------------------------------------------------------------