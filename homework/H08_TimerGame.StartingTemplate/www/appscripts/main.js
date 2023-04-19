
console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// A "convenience" method for putting graphical objects back on a paper after they have been removed or "cleared"
paper.put=function(gobj){paper.canvas.appendChild(gobj.node)}

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({ "fill" : "url(resources/background.png)"});

// A dot for us to play with
var dot = paper.circle(pWidth/2, pHeight/2, 20);
dot.attr({ "fill" : "url(resources/smoke.jpg)"});

//-------------------
// load time
//-------------------
var loadTime=Date.now()
console.log("load time is " + loadTime/1000);

//HTML5 audio elements
var myFooter=document.getElementById("myFooter");

//HTML5 audio element
var aBackgroundSnd = new Audio ("resources/342566__inspectorj__sewer-soundscape-a.wav");
var aBumpSnd = new Audio ("resources/67408__noisecollector__vibrabonk.wav");
var aPopSnd = new Audio ("resources/411639__inspectorj__pop-low-a-h1.wav")
var aCompleteSnd = new Audio ("resources/428156__higgs01__yay.wav")

//-------------------

// Add some properties to dot just to keep track of it's "state"
dot.xpos=pWidth/2;
dot.ypos=pHeight/2;
dot.xrate=5;
dot.yrate=5;

// our drawing routine, will use as a callback for the interval timer
var draw = function(){
    myFooter.innerHTML="Time: " + (Date.now()-loadTime)/1000

    // Update the position where we want our dot to be
    dot.xpos += dot.xrate;
    dot.ypos += dot.yrate;

    // Now actually move the dot using our 'state' variables
    dot.attr({'cx': dot.xpos, 'cy': dot.ypos});

    //---------------------------------------------
    // Set sound parameters based on the position of the moving dots

    // When dots hit the wall, reverse direction 
    if (dot.xpos > pWidth) {
        dot.xrate = -dot.xrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    }
    if (dot.ypos > pHeight) {
        dot.yrate = - dot.yrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    };
    if (dot.xpos < 0) {
        dot.xrate = -dot.xrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    }
    if (dot.ypos < 0) {
        dot.yrate = - dot.yrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    };

    let timeElapsed = (Date.now()-loadTime)/1000;

    // stop the game after 5 seconds
    if (timeElapsed > 5) {    
        aBackgroundSnd.pause();
        aCompleteSnd.pause();
        aCompleteSnd.currentTime=0;
        aCompleteSnd.play();     
        console.log(`Game Stop @ ${timeElapsed} seconds`);
        endGame();
    }
}

// call draw() periodically
// Start the timer with a button (instead of as program loads) so that sound models have time to load before we try play or set their parameters in the draw() function.
var toggle="off";
var timer;
document.getElementById("startButtonID").addEventListener('click', function(ev){
    if (toggle=="off"){
        timer=setInterval(draw, 20);
        toggle="on";
        gameStatus = 'on';
        loadTime=Date.now();
        aBackgroundSnd.play();
        aBackgroundSnd.volume=.2;
        aBackgroundSnd.loop=true;

        // run function to reset playing field
        restart()

    } else {
        clearInterval(timer);
        toggle="off"
        gameStatus = "off";
        aBackgroundSnd.pause();
        ;
    }
})


// ------------- Game Functions ---------------------
var objectClick = 0;
var gameStatus = "off";

// Reset Game Function
let restart = function() {

    // reset dot to original position
    paper.clear();
    paper.put(bgRect);
    paper.put(dot);
    dot.attr({"cx": pWidth/2 , "cy" : pHeight/2 , "fill" : "url(resources/smoke.jpg)"});
    bgRect.attr({ "fill" : "url(resources/background.png)"});
    dot.xpos = pWidth/2;
    dot.ypos = pHeight/2;

    // reset clicks recorded
    objectClick = 0;

    console.log(`Number of Clicks: ${objectClick}`);
}

// record clicks on dot
dot.node.addEventListener('click', function(){
    if (gameStatus === 'on'){
    objectClick++;
    aPopSnd.pause();
    aPopSnd.currentTime=0;
    aPopSnd.play();
    console.log(`Number of Clicks: ${objectClick}`);
}})

// alert box when game ends
let endGame = function(){
    clearInterval(timer);
    alert(`Your total amount of clicks are ${objectClick}`);
    toggle="off" 
    gameStatus = "off"  
    loadTime=Date.now();
    myFooter.innerHTML="Time: " + (Date.now()-loadTime)/1000;
    dot.attr({"cx": pWidth/2 , "cy" : pHeight/2});
}


// ----------------GAME DIFFICULTY---------------------

// Random Values Function for Game Difficulty
let randInt = function( m, n ) {
    let range = n-m;
    let randomR = Math.random()*range;
    return m+randomR;
}

let easy = document.getElementById("easy");
let hard = document.getElementById("hard");

// make game easier
easy.addEventListener('input', function(){
    dot.attr({"r" : randInt(20,50)});
    dot.xrate = randInt(1,5);
    dot.yrate = randInt(1,5);
});

// make game harder
hard.addEventListener('input', function(){
    dot.attr({"r" : randInt(5,20)});
    dot.xrate = randInt(5,10);
    dot.yrate = randInt(5,10);
});

//-----------------END------------------------

















































