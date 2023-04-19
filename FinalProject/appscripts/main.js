console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Get paper dimensions
var dimX = paper.width;
var dimY = paper.height;

var bg = paper.rect(0, 0, dimX, dimY).attr({
        "fill" : "#F0FFFF"         
});

//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
//				  Bowling Lane Design
//------------------------------------------------------------------------------------

// Wooden Lane 
let numBoards=39;
// set board width to fill the canvas
let boardHeight=dimY/numBoards;

let boards = [];
let counter = 0;

let boardA = 0;
let boardB = 255;

let currentBoard = 0;

while(counter<numBoards){
    boards[counter]=paper.rect(0, counter*boardHeight, dimX, boardHeight);
    boards[counter].colorString = 0;
    if (currentBoard === 0) {boards[counter].colorString = `rgb(250, 224, 155)` ; currentBoard = 1} 
    else if (currentBoard === 1) {boards[counter].colorString = `rgb(255, 239, 196)` ; currentBoard = 0};

    console.log(boards[counter].colorString);
    console.log(currentBoard);

    boards[counter].attr({"fill": boards[counter].colorString, "stroke-width" : 0});
    counter++;
  };

// Approach Dots @ 7.5 feet
var dotStartX = 7.5*dimX/75;

var aD5 = paper.circle(dotStartX, 5.5*dimY/39, 2).attr({"fill": "black"});
var aD10 = paper.circle(dotStartX, 10.5*dimY/39, 2).attr({"fill": "black"});
var aD15 = paper.circle(dotStartX, 15.5*dimY/39, 2).attr({"fill": "black"});
var aD20 = paper.circle(dotStartX, 20.5*dimY/39, 4).attr({"fill": "black"});
var aD25 = paper.circle(dotStartX, 25.5*dimY/39, 2).attr({"fill": "black"});
var aD30 = paper.circle(dotStartX, 30.5*dimY/39, 2).attr({"fill": "black"});
var aD35 = paper.circle(dotStartX, 35.5*dimY/39, 2).attr({"fill": "black"});

// Approach Arrows @ 12-15 feet
var arrowMinX = 12*dimX/75;
var arrow2X = 13*dimX/75;
var arrow3X = 14*dimX/75;
var arrowMaxX = 15*dimX/75;
var arrowImg = "resources/arrow.png";

var aA5 = paper.image(arrowImg, arrowMinX ,5*dimY/39, 8,8);
var aA10 = paper.image(arrowImg, arrow2X ,10*dimY/39, 8,8);
var aA15 = paper.image(arrowImg, arrow3X ,15*dimY/39, 8,8);
var aA20 = paper.image(arrowImg, arrowMaxX ,20*dimY/39, 8,8);
var aA25 = paper.image(arrowImg, arrow3X ,25*dimY/39, 8,8);
var aA30 = paper.image(arrowImg, arrow2X ,30*dimY/39, 8,8);
var aA35 = paper.image(arrowImg, arrowMinX ,35*dimY/39, 8,8);

// Bowling Pins
var pinMinX = 64*dimX/75;
var pin2X = 67*dimX/75;
var pin3X = 70*dimX/75;
var pinMaxX = 73*dimX/75;

var bP5 = paper.circle(pinMaxX, 5*dimY/39, 15).attr({"fill": "white"});
var bP10 = paper.circle(pin3X, 10*dimY/39, 15).attr({"fill": "white"});
var bP15 = paper.circle(pin2X, 15*dimY/39, 15).attr({"fill": "white"});
var bP20 = paper.circle(pinMinX, 20*dimY/39, 15).attr({"fill": "white"});
var bP25 = paper.circle(pin2X, 25*dimY/39, 15).attr({"fill": "white"});
var bP30 = paper.circle(pin3X, 30*dimY/39, 15).attr({"fill": "white"});
var bP35 = paper.circle(pinMaxX, 35*dimY/39, 15).attr({"fill": "white"});
var bP20b = paper.circle(pin3X, 20*dimY/39, 15).attr({"fill": "white"});
var bP15b = paper.circle(pinMaxX, 15*dimY/39, 15).attr({"fill": "white"});
var bP25b = paper.circle(pinMaxX, 25*dimY/39, 15).attr({"fill": "white"});


//------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------
//			  Initialise Bowling Trajectory Line
//------------------------------------------------------------------------------------

// Starting Points
var midBoardY = 9;
var midX = 40*dimX/75;
var midY = midBoardY*dimY/39;

var sBoard = 25.5;
var startBoard = sBoard*dimY/39;

// Bowling Ball Contact Point with Pins
var endBoardY = 15;
var endX = 62*dimX/75;
var endY = endBoardY*dimY/39;

// Trajectory Line
var curve = paper.path(`M 0,${startBoard} ${midX},${midY} ${endX},${endY}`).attr({
        "stroke" : "black",
        "stroke-width" : "6px",
        "stroke-linecap" : "round"
});
//-------------------------------------------------------------------------------------------------




//------------------------------------------------------------------------------------
//		   		Sliders & Inputs for Variables
//------------------------------------------------------------------------------------
var board = document.getElementById("board");
var boardR = document.getElementById("boardR");
var oilLength = document.getElementById("oilLength");
var oilLengthR = document.getElementById("oilLengthR");
var breakpoint = document.getElementById("breakpoint");
var breakpointR = document.getElementById("breakpointR");
var angle = document.getElementById("angle");
var angleR = document.getElementById("angleR");
var speed = document.getElementById("speed");
var speedR = document.getElementById("speedR");

var currentOilLength = 40;
var correctionY = 0.5; //correction value to align path to board correctly

//-----------------------------FUNCTIONS REQUIRED FOR ALL SLIDERS AND VARIABLES---------------------------------------------
var drawCurve = function(bx,by) {
	curve.animate({path: `M 0,${startBoard} ${bx},${by} ${endX},${endY}`}, 500, "linear");
};

// Determine starting ball position
var boardCalc = function(x){
	let start = x;
	startBoard = start*dimY/39;
	ball.attr({cy: startBoard});
	accuracyBall(x);
	curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");	
};

// Determine Oil Length values
var oilCalc = function(a){
     let length = a;
     var exit = length - 31 + correctionY;
     var X = length*dimX/60; //oil breakpoint length
     var Y = exit*dimY/39; //ideal exit board

     if (Y < 1*dimY/39) {midY = 1*dimY/39}
     	else {midY = Y};
     if (X > 62*dimX/75) {midX = 62*dimX/75}
     	else {midX = X};

     currentOilLength = length;
     drawCurve(midX,midY);
};

// ACCURACY FORMULAS [formulas to skew accuracy according to optimal values]---------------------------------------------

// Starting Ball Position Accuracy Formula
var prevChangeBall = sBoard;
var stateDirectionBall = `up`;
var pausedStateBall = `no`;
var pausedValueBall = 0;

var accuracyBall = function(x){
	if (x < prevChangeBall) { stateDirectionBall = `up`};
	if (x > prevChangeBall) { stateDirectionBall = `down`};

	if (stateDirectionBall === `up`){
			if (pausedStateBall === `yes`) {
				if (x > pausedValueBall) {pausedStateBall = `yes`}
				if (x < pausedValueBall) {pausedStateBall = `no`}
			};

			if (pausedStateBall === `no`) {
					var diff = prevChangeBall - x;
					endBoardY = endBoardY - diff;
			
					if (endBoardY*dimY/39 < 1*dimY/39) {endY = 1*dimY/39 ; pausedStateBall = `yes` ; pausedValueBall = x}
						else {endY = endBoardY*dimY/39;}
				};
			};

	if (stateDirectionBall === `down`){
			if (pausedStateBall === `yes`) {
				if (x < pausedValueBall) {pausedStateBall = `yes`}
				if (x > pausedValueBall) {pausedStateBall = `no`}
			};

			if (pausedStateBall === `no`) {
					var diff = x - prevChangeBall;
					endBoardY = endBoardY + diff;
			
					if (endBoardY*dimY/39 > 39*dimY/39) {endY = 39*dimY/39 ; pausedStateBall = `yes` ; pausedValueBall = x}
						else {endY = endBoardY*dimY/39;}
				};
	};
	prevChangeBall = x;
};

// Breakpoint Board Position Accuracy Formula
var prevChangeBreak = midBoardY;
var stateDirectionBreak = `up`;
var pausedStateBreak = `no`;
var pausedValueBreak = 0;

var accuracyBreak = function (x){
	if (x < prevChangeBreak) { stateDirectionBreak = `up`};
	if (x > prevChangeBreak) { stateDirectionBreak = `down`};

	if (stateDirectionBreak === `up`){
			if (pausedStateBreak === `yes`) {
				if (x <	 pausedValueBreak) {pausedStateBreak = `yes`};
				if (x > pausedValueBreak) {pausedStateBreak = `no`};
			};

			if (pausedStateBreak === `no`) {
				var diff = prevChangeBreak - x;
				endBoardY = endBoardY - diff;
				if (endBoardY*dimY/39 < 1*dimY/39) {endY = 1*dimY/39 ; pausedStateBreak = 'yes' ; pausedValueBreak = x}
					else {endY = endBoardY*dimY/39;}
			};
	}
	if (stateDirectionBreak === `down`) {

			if (pausedStateBreak === `yes`) {
				if (x >	 pausedValueBreak) {pausedStateBreak = `yes`};
				if (x < pausedValueBreak) {pausedStateBreak = `no`};
			};

			if (pausedStateBreak === `no`) {
				var diff = x - prevChangeBreak;
				endBoardY = endBoardY + diff;
				if (endBoardY*dimY/39 > 39*dimY/39) {endY = 39*dimY/39 ; pausedStateBreak = 'yes' ; pausedValueBreak = x}
					else {endY = endBoardY*dimY/39;}
			};
	};

	prevChangeBreak = x;

	curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");
};

// Ball Speed Accuracy Formula
var baseSpeed = 20; //20mph
var modifierBreakY = 0.02;
var modifierEndY = 0.08;
var prevChangeSpeed = speed.value;
var stateDirectionSpeed = `up`;
var pausedStateSpeed = `no`;
var pausedValueSpeed = 0;

var accuracySpeed = function(x){

	if (x < prevChangeSpeed) { stateDirectionSpeed = `down`};
	if (x > prevChangeSpeed) { stateDirectionSpeed = `up`};	

	if (stateDirectionSpeed === `down`) {
		if (pausedStateSpeed === `yes`) {
			if (x <	 pausedValueSpeed) {pausedStateSpeed = `yes`}
			if (x > pausedValueSpeed) {pausedStateSpeed = `no`}
		};

		if (pausedStateSpeed === `no`) {
			if (x < baseSpeed) {
				var diff = baseSpeed - x;
				var accModBreak = diff*modifierBreakY;
				var accModEnd = diff*modifierEndY;
				midBoardY = midBoardY + accModBreak;
				endBoardY = endBoardY + accModEnd;
	
				if (midBoardY*dimY/39 > 39*dimY/39) {midY = 39*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {midY = midBoardY*dimY/39;};
				
				if (endBoardY*dimY/39 > 39*dimY/39) {endY = 39*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {endY = endBoardY*dimY/39;};
	
				curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
			};
			if (x > baseSpeed) {
				var diff = x - baseSpeed;
				var accModBreak = diff*modifierBreakY;
				var accModEnd = diff*modifierEndY;
				midBoardY = midBoardY + accModBreak;
				endBoardY = endBoardY + accModEnd;
	
				if (midBoardY*dimY/39 > 39*dimY/39) {midY = 39*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {midY = midBoardY*dimY/39;};
	
				if (endBoardY*dimY/39 > 39*dimY/39) {endY = 39*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {endY = endBoardY*dimY/39;};
	
				curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
			};

		};
			
	};

	if (stateDirectionSpeed === `up`) {
		if (pausedStateSpeed === `yes`) {
			if (x >	 pausedValueSpeed) {pausedStateSpeed = `yes`}
			if (x < pausedValueSpeed) {pausedStateSpeed = `no`}
		};

		if (pausedStateSpeed === `no`) {
			if (x < baseSpeed) {
				var diff = baseSpeed - x;
				var accModBreak = diff*modifierBreakY;
				var accModEnd = diff*modifierEndY;
				midBoardY = midBoardY - accModBreak;
				endBoardY = endBoardY - accModEnd;
		
				if (midBoardY*dimY/39 < 1*dimY/39) {midY = 1*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {midY = midBoardY*dimY/39;};
	
				if (endBoardY*dimY/39 < 1*dimY/39) {endY = 1*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {endY = endBoardY*dimY/39;};
		
				curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
			};
			if (x > baseSpeed) {
				var diff = x - baseSpeed;
				var accModBreak = diff*modifierBreakY;
				var accModEnd = diff*modifierEndY;
				midBoardY = midBoardY - accModBreak;
				endBoardY = endBoardY - accModEnd;
		
				if (midBoardY*dimY/39 < 1*dimY/39) {midY = 1*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {midY = midBoardY*dimY/39;};
	
				if (endBoardY*dimY/39 < 1*dimY/39) {endY = 1*dimY/39 ; pausedStateSpeed = 'yes' ; pausedValueSpeed = x}
					else {endY = endBoardY*dimY/39;};
		
				curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
			};
		};
		
	};
	prevChangeSpeed = x;
};

// Ball Rotation Direction Accuracy Formula
	var baseAngle = 45; //45 degrees
	var modifierEndYD = 0.04;
	var prevChangeAngle = angle.value;
	var stateDirectionAngle = `up`;
	var pausedStateAngle = `no`;
	var pausedValueAngle = 0;
	
	var accuracyAngle = function(x){
	
		if (x < prevChangeAngle) { stateDirectionAngle = `down`};
		if (x > prevChangeAngle) { stateDirectionAngle = `up`};	
	
		if (stateDirectionAngle === `down`) {
			if (pausedStateAngle === `yes`) {
				if (x <	 pausedValueAngle) {pausedStateAngle = `yes`};
				if (x > pausedValueAngle) {pausedStateAngle = `no`};
			};
	
		if (pausedStateSpeed === `no`) {
			if (x < baseAngle) {
				var diff = baseAngle - x;
				var accModEnd = diff*modifierEndYD;
				endBoardY = endBoardY - accModEnd;
				
				if (endBoardY*dimY/39 < 1*dimY/39) {endY = 1*dimY/39 ; pausedStateAngle = 'yes' ; pausedValueAngle = x}
					else {endY = endBoardY*dimY/39};
	
				curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
			};
			if (x > baseAngle) {
				var diff = x - baseAngle;
				var accModEnd = diff*modifierEndYD;
				endBoardY = endBoardY - accModEnd;
				
				if (endBoardY*dimY/39 < 1*dimY/39) {endY = 1*dimY/39 ; pausedStateAngle = 'yes' ; pausedValueAngle = x}
					else {endY = endBoardY*dimY/39;};
	
				curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
			};		
		};
	
	};

		if (stateDirectionAngle === `up`) {
			if (pausedStateAngle === `yes`) {
				if (x <	 pausedValueAngle) {pausedStateAngle = `yes`}
				if (x > pausedValueAngle) {pausedStateAngle = `no`}
			};
	
			if (pausedStateSpeed === `no`) {
				if (x < baseAngle) {
					var diff = baseAngle - x;
		
					var accModEnd = diff*modifierEndYD;
		
					endBoardY = endBoardY + accModEnd;
					
					if (endBoardY*dimY/39 > 39*dimY/39) {endY = 39*dimY/39 ; pausedStateAngle = 'yes' ; pausedValueAngle = x}
						else {endY = endBoardY*dimY/39;};
		
					curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
				};
				if (x > baseAngle) {
					var diff = x - baseAngle;
		
					var accModEnd = diff*modifierEndYD;
		
					endBoardY = endBoardY + accModEnd;
					
					if (endBoardY*dimY/39 > 39*dimY/39) {endY = 39*dimY/39 ; pausedStateAngle = 'yes' ; pausedValueAngle = x}
						else {endY = endBoardY*dimY/39;};
		
					curve.animate({path: `M 0,${startBoard} ${midX},${midY} ${endX},${endY}`}, 0, "linear");			
				};			
			};
		};
			prevChangeAngle = x;
	};


//-----------------------------Event Listeners for all variables-------------------------------------
board.addEventListener('input', function(){
	boardCalc(board.value);
	boardR.value = board.value;
});

boardR.addEventListener('input', function(){
	boardCalc(boardR.value);
	board.value = boardR.value;	
});

oilLength.addEventListener('input', function(){
	oilCalc(oilLength.value);
	oilLengthR.value = oilLength.value;
});

oilLengthR.addEventListener('input', function(){
	oilCalc(oilLengthR.value);
	oilLength.value = oilLengthR.value;
});

breakpoint.addEventListener('input', function(){
	accuracyBreak(breakpoint.value);
	breakpointR.value = breakpoint.value;
});

breakpointR.addEventListener('input', function(){
	accuracyBreak(breakpointR.value);
	breakpoint.value = breakpointR.value;
});

speed.addEventListener('input', function(){
	accuracySpeed(speed.value);
	speedR.value = speed.value;
});

speedR.addEventListener('input', function(){
	accuracySpeed(speedR.value);
	speed.value = speedR.value;
});

angle.addEventListener('input', function(){
	accuracyAngle(angle.value);
	angleR.value = angle.value;
});

angleR.addEventListener('input', function(){
	accuracyAngle(angleR.value);	
	angle.value = angleR.value;
});

//---------------------------------------------------------------------
// 			Bowling Trajectory Quiz
//---------------------------------------------------------------------
var lineQuiz = document.getElementById("lineQuiz");
var oilLengthLable = document.getElementById("oilLengthLable");
var oilQuestion = document.getElementById("oilQuestion");
var submitButton = document.getElementById("submitQuiz");
var calculatorButton = document.getElementById("quizPage");
var directions = document.getElementById("directions");
var currentOil;

// Quiz Element Visibility
submitButton.style.display = "none";
directions.style.display = "none";

// Animate bowling ball along trajectory line
var ball = paper.circle(1*dimX/75, 25*dimY/39, 20).attr({"fill": "red"});
var countLength = 0;    

var ballMotion = function(){
    if(curve.getTotalLength() <= countLength){  
        clearInterval(ballMotion);
		curve.show();
        return;
    };
    var pt = curve.getPointAtLength(countLength);   
    ball.attr({cx: pt.x, cy: pt.y});
    
    countLength++; 
};

//-----------------------------------QUESTION GENERATION -----------------------------------------------

// Random Values Function for Oil Length Values
let randInt = function( m, n ) {
    let range = n-m;
    let randomR = Math.random()*range;
    return m+randomR;
};

// Minimum and Maximum Oil Length Values
var minL = 30;
var maxL = 47;

// Random Oil Length Values
let randOil = function(){
	var result = randInt(minL, maxL);
	return result;
};

// Oil Length Question Value Generation
let oilQuestionGeneration = function(){
	var oil = randOil().toFixed(0);

	console.log(`Question Generated Value: The Oil Length is ${oil}`)
	return oil;
};

// Start Quiz
lineQuiz.addEventListener("click", function(){
	oilLengthLable.style.display = "none";
	oilLength.style.display = "none";
	oilLengthR.style.display = "none";
	lineQuiz.style.display = "none";
	calculatorButton.style.display = "none";
	submitButton.style.display = "inline-block";
	curve.hide();

	currentOil = oilQuestionGeneration();
	oilQuestion.innerHTML = `Determine the correct variables that will allow you to hit the Strike Pocket in a ${currentOil}ft pattern.`;
});

// Submit Button
submitButton.addEventListener("click", function(){
	setInterval("ballMotion()", 0.1);
	directions.style.display = "inline-block";
	submitButton.style.display = "none";
});



//----------------------------------------------------------------------------------------
//					END OF CODE
//----------------------------------------------------------------------------------------