
console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
//---------------------------------------------------------------------

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({"fill": "black"});

// -----------------------------------------------------------------------------

// Create 50 disks in an array
let totalDisks = 50;

// Array for Disks
let diskMess = [];
let countDisk = 0;

// Outputting random values for disks random movement
let randInt = function( m, n ) {
    let range = n-m;
    let randomR = Math.random()*range;
    return m+randomR;
}

// Initialise disks
while(countDisk < totalDisks){
    diskMess[countDisk] = paper.circle(pWidth/2, pHeight/2, 20)
    
    // Random Colors for Disks & object for hslString to reference in draw() below
    diskMess[countDisk].hslString = `hsl(${randInt(0,1)},${randInt(0,1)},${randInt(0,1)})`;
    diskMess[countDisk].attr({"fill":  diskMess[countDisk].hslString});
    
    // Add some properties to disk just to keep track of it's "state"
    diskMess[countDisk].xpos=pWidth/2;
    diskMess[countDisk].ypos=pHeight/2;
    // random rate of movement for disks
    diskMess[countDisk].xrate=randInt(-6, 6);
    diskMess[countDisk].yrate=randInt(-6, 6);

    countDisk++;

    console.log(`Current Count of Disks ${countDisk}`)
}

// function to make disks move & change color to white upon mousedown
var draw = function(){
    counter = 0;

    while(counter < totalDisks){
        
        // updates new x & y coordinates of disks
        diskMess[counter].xpos += diskMess[counter].xrate;
        diskMess[counter].ypos += diskMess[counter].yrate;
    
        // move the disks using our 'state' variables
        diskMess[counter].attr({'cx': diskMess[counter].xpos, 'cy': diskMess[counter].ypos});
    
        // keep the disks on the paper
        if (diskMess[counter].xpos > pWidth) {diskMess[counter].xrate = - diskMess[counter].xrate;}
        if (diskMess[counter].ypos > pHeight) {diskMess[counter].yrate = - diskMess[counter].yrate};
        if (diskMess[counter].xpos < 0) {diskMess[counter].xrate = - diskMess[counter].xrate;}
        if (diskMess[counter].ypos < 0) (diskMess[counter].yrate = - diskMess[counter].yrate);

        // compute the distance between pointer position and disks during mousedown event
        var dist = distance(diskMess[counter].xpos, mouseState.x, diskMess[counter].ypos, mouseState.y)

        // change disks within 100 pixel distance from pointer click to white color
        if ((mouseState.pushed === 'true' && dist <= 100)) {
            diskMess[counter].attr({'fill' : 'white'})
        } else { // change disks out of 100 pixel distance or without pointer click back to original color
            diskMess[counter].attr({'fill' :  diskMess[counter].hslString});
        }

        counter++;
    }
}

// Transparent Rectangle on top of everything
var tRect = paper.rect(0,0,pWidth,pHeight);
tRect.attr({"fill" : "white" , "fill-opacity" : "0"});

// maintain mouseState with object
let mouseState = {
    "pushed" : 'false',
    "x" : 0,
    "y" : 0,
}

// event listener for mousedown events on transparent rectangle
tRect.node.addEventListener('mousedown', function(ev){
    mouseState.pushed = 'true';
    mouseState.x = ev.offsetX;
    mouseState.y = ev.offsetY;

    console.log(`Current mouseState: ${mouseState.pushed}`)
    console.log(`Current mouse X: ${mouseState.x}`)
    console.log(`Current mouse Y: ${mouseState.y}`)
})

tRect.node.addEventListener('mouseup', function(ev){
    mouseState.pushed = 'false';
    mouseState.x = ev.offsetX;
    mouseState.y = ev.offsetY;

    console.log(`Current mouseState: ${mouseState.pushed}`)
    console.log(`Current mouse X: ${mouseState.x}`)
    console.log(`Current mouse Y: ${mouseState.y}`)
})


// find distance between two points using pythagoras theorem
let distance = function(x1, x2, y1, y2){
    xDiff = x1 - x2;
    yDiff = y1 - y2;
    return Math.sqrt(xDiff*xDiff + yDiff*yDiff);
};


setInterval(draw, 20);







































