// main.js

console.log(`yo`);

/* assign3: font family for article in JavaScript */
var art=document.getElementById("articleid").style.fontFamily = "cursive,Charcoal,sans-serif";

/* assign3: center header text using javascript */
var art=document.getElementById("headerid").style.textAlign = "center";

// 2. Define a function in your main.js file, and name it “hslString”. 
var hslString = function(x,y,z) {
	let hue = x;
	let saturation = y;
	let lightness = z;

	let outputString = `hsl(${hue},${saturation}%,${lightness}%)`;

	return outputString;
}

// 2. Testing outputString
console.log(`hslString is running, this is a test output: ${hslString(10,50,200)}`);

//3. Sliders for HSL
let hueSlider = document.getElementById("hue");
let saturationSlider = document.getElementById("saturation");
let lightnessSlider = document.getElementById("lightness");

let articleBg = document.getElementById("articleid");

// 3. Function to run when Slider's EventListener is triggered
let colorChange = function(ev){
	// 3. Values for each slider
	var hueValue = hueSlider.value;
	var saturationValue = saturationSlider.value;
	var lightnessValue = lightnessSlider.value;
	
	// 3. Converting slider values to HSL values
	var hueCon = Math.floor(360*hueValue);
	var satCon = Math.floor(100*saturationValue);
	var lightCon = Math.floor(100*lightnessValue);
	var final = hslString(hueCon,satCon,lightCon);

	// 3. Change background color of article element
	articleBg.style.backgroundColor = final;
	console.log(`The current hsl value is: ${final}`);
}
// 4. Listeners that change background colour of article element
hueSlider.addEventListener('input',colorChange);
saturationSlider.addEventListener('input',colorChange);
lightnessSlider.addEventListener('input',colorChange);

// 5. Add slider for opacity
let opacitySlider = document.getElementById("opacity");

// 5. Function to change opacity
let opacityChange = function(ev){
	var opacityValue = opacitySlider.value;
	articleBg.style.opacity = opacityValue;
	console.log(opacityValue)
}

// 5. Listener that change opacity of article element
opacitySlider.addEventListener("input", opacityChange);

// 6. Listeners that change opacity of article element upon MouseDown and MouseUp Events
articleBg.addEventListener('mousedown', function(ev) {
	console.log("Mousedown event occured in articleBg");
	console.log("The target is " + ev.target);
	console.log("The id of our target element is " + ev.target.id);
	articleBg.style.opacity = 1;
})
articleBg.addEventListener('mouseup', opacityChange);
