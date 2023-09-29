let jumptop = document.getElementById("jumpToTop");

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

// Get the heights of Card 1 and Card 2
var card1Height = document.getElementById('card1').offsetHeight;
var card2 = document.getElementById('card2');
var card3 = document.getElementById('card3');
var card4 = document.getElementById('card4');


 function cardHeightMatch() {
    // Set the height of Card 2 to match Card 1
    card2.style.height = card1Height + 'px';
    card3.style.height = card1Height + 'px';
    card4.style.height = card1Height + 'px';
 }

 cardHeightMatch();