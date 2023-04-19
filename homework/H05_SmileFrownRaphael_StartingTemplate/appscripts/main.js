/* Smile/ Frown with Raphael Graphics */

console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;


//-------------------------------//
// 1. Create a background rectangle using Raphael with the dimensions of the canvas 
// 	  already in the dimX and dimY variables in main.js
var bg = paper.rect(0, 0, dimX, dimY).attr({
        "fill" : "#F0FFFF"         
})

//2. Draw a smile using a 'Bezier' curve 
// Bezier X Y Coordinates
let bezierX = 300;
let bezierY = 250;

let smile = paper.path(`M ${1.5*dimX/4},${dimY/2} Q${bezierX},${bezierY} ${2.5*dimX/4},${dimY/2}`).attr({
        "stroke" : "#FF0000",
        "stroke-width" : "11px",
        "stroke-linecap" : "round"
});

// 3. Toggle Button State Change
var boxState = 'frown';
let toggleBox = document.getElementById("toggleBox");
toggleBox.innerHTML = 'Frown'

// 3&4. Switch background image of button and Toggle between Smile and Frown
toggleBox.addEventListener("click", function(){
        console.log(`Click event occured`);       

        if (boxState === "frown"){
        	toggleBox.style.backgroundImage = "url('https://www.gardeningknowhow.com/wp-content/uploads/2020/11/orchid-flowers.jpg')";
        	toggleBox.innerHTML = 'Smile';
        	boxState = "smile";

        		//6. Animate mouth
			bezierX = 300;
			bezierY = 150;
			drawMouth(bezierX,bezierY);

			//8. Animate eyes to go from "Open" to "Closed"
			newEye = 5;
			eyeColor = 'black';
			eyeChangeAngry(newEye,eyeColor);
        	console.log(`State: ${boxState}`);
}
        else if (boxState === "smile"){
        	toggleBox.style.backgroundImage = "url('https://www.theinvisibletourist.com/wp-content/uploads/2018/01/featured_76.jpg')";
        	toggleBox.innerHTML = 'Frown';
        	boxState = "frown";

        		//6. Animate mouth
       			bezierX = 300;
			bezierY = 250;
			drawMouth(bezierX,bezierY);

			//8. Animate eyes to go from "Closed" to "Open"			
			newEye = 40;
			eyeColor = 'yellow';
			eyeChangeHappy(newEye,eyeColor);
        	console.log(`State: ${boxState}`);
        }
})

// 5&6. drawMouth function with bx,by and morph slowly with Raphael method
let drawMouth = function(bx,by) {
	smile.animate({path: `M ${1.5*dimX/4},${dimY/2} Q${bx},${by} ${2.5*dimX/4},${dimY/2}`}, 500, "linear");
	// 9. Animate smallDot in drawMouth function
	smallDot.animate({ cx : bx , cy : by}, 500);
}

//7. Draw eyes using ellipses.
var eye1 = paper.ellipse(270, 100, 20, 40).attr({
	"fill" : "yellow",
	"stroke" : "blue",
});

var eye2 = paper.ellipse(330, 100, 20, 40).attr({
	"fill" : "yellow",
	"stroke" : "blue",
});

// 8. Animate eyes to go from "Closed" to "Open", vice versa
let eyeChangeHappy = function(x,y) {
	eye1.animate({ ry : x, fill : y}, 500, "linear");
	eye2.animate({ ry : x, fill : y}, 500, "linear");
}

let eyeChangeAngry = function(x,y) {
	eye1.animate({ ry : x, fill : y}, 800, "bounce");
	eye2.animate({ ry : x, fill : y}, 800, "bounce");
}


// 9. Draw a small dot at the bezier point that determines the shape of the mouth
let smallDot = paper.circle(bezierX, bezierY, 5).attr({
	"fill" : "pink",
	"stroke" : "black",	
});

// 10. Make the dot draggable

// 10a. 'State' variable to check if smallDot is getting dragged
var draggingDot = 'no';

// 10a. Listeners for mousedown, mouseup, mousemove on smallDot
smallDot.node.addEventListener("mousedown", function(ev){
        console.log(`Mousedown event occured at ${ev.target}.`);
        draggingDot = "yes";
        console.log(`Is Dot getting dragged: ${draggingDot}`);
})

smallDot.node.addEventListener("mouseup", function(ev){
        console.log(`Mouseup event occured at ${ev.target}.`)
        draggingDot = "no";
        console.log(`Is Dot getting dragged: ${draggingDot}`);
})	


// 10b. Prevents tracking loss when dragging dot fast
bg.node.addEventListener("mousemove", function(ev){      
        bezierX = ev.offsetX;
        bezierY = ev.offsetY;
        console.log(`Mouse Coordinates currently: ${bezierX},${bezierY}.`);

// 10c. Use 'if' statement to check draggingDot State
        if (draggingDot === "yes"){
        smallDot.attr({cx:bezierX, cy:bezierY});

// 11. Redraw mouth using smallDot position as Bezier point
        smile.attr({path: `MM ${1.5*dimX/4},${dimY/2} Q${bezierX},${bezierY} ${2.5*dimX/4},${dimY/2}`});
        console.log(`Dragging Dot working`)
}})
































