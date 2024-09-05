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
var card5 = document.getElementById('card5');
var card6 = document.getElementById('card6');
var card7 = document.getElementById('card7');
var card0 = document.getElementById('card0');

 function cardHeightMatch() {
    // Set the height of Card 2 to match Card 1
    card2.style.height = card1Height + 'px';
    card3.style.height = card1Height + 'px';
    card4.style.height = card1Height + 'px';
    card5.style.height = card1Height + 'px';
    card6.style.height = card1Height + 'px';
    card7.style.height = card1Height + 'px';
    card0.style.height = card1Height + 'px';
 }

cardHeightMatch();

