// main.js

console.log(`yo`);

let paper = new Raphael(document.getElementById("main"));
let dimX = paper.width;
let dimY = paper.height;

// 1. Create a black rectangle that fits on the Raphael paper
let bg = paper.rect(0, 0, dimX, dimY).attr({
	fill : 'black'
});

// 2. Create a green disk at the center of the paper with a radius of 20, and assign it to a variable named ‘disk’. 
let disk = paper.circle(dimX/2, dimY/2, 20).attr({
	fill : 'green'
});

// 5. Add properties to disk object to keep track of its xpos and ypos (initialized to the point at the center of the paper).  
disk.xpos = dimX/2;
disk.ypos = dimY/2;

// 6. Add xrate and yrate properties to disk
disk.xrate = 5;
disk.yrate = 5;

// 3. Make a function named 'draw' that keeps track of how many times it's called and prints the count to the console each time.
let count = 0;

let draw = function(){
	count += 1;

// 11. Create a new white circle *inside* the draw function with a let statement at the beginning of draw, and name the variable “nd”.
	let nd = paper.circle(dimX/2, dimY/2, 20).attr({
		fill : 'white',
		xpos : dimX/2,
		ypos : dimY/2,
		xrate : 5,
		yrate : 5,
	});
// 11b. Ans: [Draw function is constantly drawing a new circle "nd" each time it runs]
// 11c. Ans: [It will fill up the whole rectangle. Use raphael remove function.]

// 7. Update disk.xpos and disk.ypos by adding disk.xrate and disk.yrate to them each time in 'draw'.  
	disk.xpos += disk.xrate;
	disk.ypos += disk.yrate;

// 8. Use disk.xpos and disk.ypos to update the Raphael attribute values cx and cy
	nd.attr({'cx' : disk.xpos , 'cy' : disk.ypos});
//   8a. Ans: [Yes]
//   8b. Ans: [Disappears from bottom right of rectangle]
//   8c. Ans: [Find out the borders of the box, reverse x & y when disk reaches the extremes of rectangle's X & Y]
//   8d. Ans: [0 , 0 , dimX, dimY]

// 12. Following the call to set the cx and cy attrs in 'draw', make a call to the Raphael animate the fill of your circle to some color over 1 second in a linear fashion.
	nd.animate({"fill" : "blue"}, 1000, "linear", function(){
			nd.remove();
	});

// 9. Check each of the 4 conditions in your draw routine, and reverse the direction of disks when they hit walls.	
	if (disk.xpos <= 0) {
		disk.xrate = 5;
	} else if (disk.xpos >= dimX) {
		disk.xrate = -5;
	} else if (disk.ypos <= 0) {
		disk.yrate = 5;
	} else if (disk.ypos >= dimY) {
		disk.yrate = -5;
	};

	console.log(`Count: ${count}`);
	console.log(`Current xpos: ${disk.xpos}`);
	console.log(`Current ypos: ${disk.ypos}`);
};

// 4. Use setInterval to call draw() once per second [Changed to 20ms to make animation smoother].
let frameLength = 20;
let drawTimer = setInterval( function() {
    console.log(`drawTimer is called`);
    draw();
}, frameLength);













































