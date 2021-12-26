/*FOR 2 PAIR GAME------------------------------------------------------------------------------------------------------------------------------

//==============================================================================================================================================*/
var Two_Cards=[];
var Three_Cards;
var Four_Cards;
var radio_one = document.getElementById("radio_first");
var radio_two = document.getElementById("radio_second");
var radio_three= document.getElementById("radio_third");
var label_one = document.getElementById("label_first");
var label_two = document.getElementById("label_second");
var label_three = document.getElementById("label_third");
var show = document.getElementById("show");
const Deck = ["Agility.png", "banana.png","Citizenship.png","Boat.png","Hack.png","Nerd-Rage.png","Nuka-Cola.png","Robotics.png",
            "Shock.png","panda.png","ball.png","clock.png"];

Two_Cards=[...Deck,...Deck];
console.log(Two_Cards);

let Deck_Two=Deck.slice(0,8);
Three_Cards=[...Deck_Two,...Deck_Two,...Deck_Two];
console.log(Three_Cards);

let Deck_Three=Deck.slice(0,6);
Four_Cards=[...Deck_Three,...Deck_Three,...Deck_Three,...Deck_Three];

const deck1 = document.querySelector(".deck");
let opened1 = [];
let matched1 = [];
const modal1 = document.getElementById("modal");
const Help1 = document.querySelector(".help-btn");
const reset1 = document.querySelector(".reset-btn");
const Show1 = document.querySelector(".show-btn");
const playAgain1 = document.querySelector(".play-again-btn");
const movesCount1 = document.querySelector(".moves-counter");
let moves1 = 0;
let starCount1 = 3;
const timeCounter1 = document.querySelector(".timer");
let time1;
let minutes1 = 0;
let seconds1 = 0;
let timeStart1 = false;


//=============================================================================================================================================

//GLOBAL FUNCTION 1   (FOR SHUFFLING DECK OF CARDS)===========================================================================

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//==================================================================================================

//FUNCTION 2 (TO START 2 CHOICE GAME)=====================================================================================

function startGame1() {
  // Invoke shuffle function and store in variable
  const shuffledDeck1 = shuffle(Two_Cards);
  // Iterate over deck of cards array
  for (let i = 0; i < shuffledDeck1.length; i++) {
    // Create the <li> tags
    const liTag1 = document.createElement("li");
    
    // Give <li> class of card
    liTag1.classList.add("card");
    // Create the <img> tags
    const addImage1 = document.createElement("img");
    // Append <img> to <li>
    liTag1.appendChild(addImage1);
    // Set the img src path with the shuffled deck
    addImage1.setAttribute("src", "" + shuffledDeck1[i]);
    // Add an alt tag to the image
    addImage1.setAttribute("alt", "image error");
    // Update the new <li> to the deck <ul>
    deck1.appendChild(liTag1);
  }
}


//FUNCTION 3  (TO REMOVE CARDS FROM DECK IN 2 CHOICE GAME DECK)==============================================================================

function removeCard1() {
  // As long as <ul> deck has a child node, remove it
  while (deck1.hasChildNodes()) {
    deck1.removeChild(deck1.firstChild);
  }
}

//===========================================================================================================================================

//FUNCTION 4 (TO RUN TIMER OF GAME)==========================================================================================================

function timer1() {
  // Update the count every 1 second
  time1 = setInterval(function () {
    seconds1++;
    if (seconds1 === 60) {
      minutes1++;
      seconds1 = 0;
      gameover1();
    }
    // Update the timer in HTML with the time it takes the user to play the game
    timeCounter1.innerHTML =
      "<i class='fa fa-hourglass-start'></i>" +
      " Timer: " +
      minutes1 +
      " Mins " +
      seconds1 +
      " Secs";
  }, 1000);
}

//============================================================================================================================================

//FUNCTION 5 (TO STOP THE GAME TIMER)==========================================================================================================

function stopTime1() {
  clearInterval(time1);
}

//==========================================================================================================================================

//FUNCTION 6 (TO RESTART NEW GAME)==========================================================================================================

function resetEverything1() {
  // Stop time, reset the minutes and seconds update the time inner HTML
  stopTime1();
  timeStart1 = false;
  seconds1 = 0;
  minutes1 = 0;
  timeCounter1.innerHTML =
    "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";

  // Clear both arrays that hold the opened and matched cards
  matched1 = [];
  opened1 = [];
  
  dis();
  reload();

  deck1.classList.remove("flip");
}

//==========================================================================================================================================

//FUNCTION 7 (MAIN LOGIC BEHIND CARD MATCHING)================================================================================================

function fliptwocard() {
  function compareTwo1() {
    // When there are 2 cards in the opened array
    if (opened1.length === 2) {
      // Disable any further mouse clicks on other cards
      document.body.style.pointerEvents = "none";
    }
    // Compare the two images src
    if (opened1.length === 2 && opened1[0].src === opened1[1].src) {
      // If matched call match()
      match1();

      
    } else if (opened1.length === 2 && opened1[0].src != opened1[1].src) {
      // If No match call noMatch()
      noMatch1();
      
    }
  }

  function match1() {

    setTimeout(function () {
      opened1[0].parentElement.classList.add("match");
      opened1[1].parentElement.classList.add("match");
      // Push the matched cards to the matched array
      matched1.push(...opened1);
      // Allow for further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      
      // Check to see if the game has been won with all 8 pairs
      winGame1();
      // Clear the opened array
      opened1 = [];
    }, 600);
  }

  function noMatch1() {
    setTimeout(function () {
      // Remove class flip on images parent element
      opened1[0].parentElement.classList.remove("flip");
      opened1[1].parentElement.classList.remove("flip");
      // Allow further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Remove the cards from opened array
      opened1 = [];
    }, 700);
  }

  function winGame1() {
    if (matched1.length === 24) {
      stopTime1();
      window.alert("YOU WIN!");
    }
  }

  deck1.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "LI") {
      // To console if I was clicking the correct element
      
      // Start the timer after the first click of one card
      // Executes the timer() function
      if (timeStart1 === false) {
        timeStart1 = true;
        timer1();
      }
      // Call flipCard() function
      flipCard1();
    }

    //Flip the card and display cards img
    function flipCard1() {
      // When <li> is clicked add the class .flip to show img
      evt.target.classList.add("flip");
      // Call addToOpened() function
      addToOpened1();
    }

    //Add the fliped cards to the empty array of opened
    function addToOpened1() {
      if (opened1.length === 0 || opened1.length === 1) {
        // Push that img to opened array
        opened1.push(evt.target.firstElementChild);
      }
      // Call compareTwo() function
      compareTwo1();
    }
  });
}

//GLOBAL FUNCTIONS============================================================================================

function gameover1() {
  window.alert("GAME OVER");

  show1();
  stopTime1();
}
function help1() {
  window.alert(
    "CATCH THE CLONE GAME - Help  \n\nPlayers take turns, to the left, turning any two cards picture-side-up. The cards must be turned over completely, so that all players can see them.\n\nA Match: A player makes a match if the two cards turned picture-side-up are identical. When a match is made, the player takes both cards and places them in front of him or her. That player then takes another turn, and continues taking turns until he or she misses.\n\nA Miss: A player misses if the two cards turned over are not identical. When a player misses, he or she turns the two cards picture-side-down again, in the same place.\n\nThat player's turn ends-and all players try to remember which cards were turned over, for future matches.\n\nThe game continues until all cards have been matched and removed from the playing area. All players then count up their matching pairs."
  );
}

Help1.addEventListener("click", help1);

function show1() {

  deck1.classList.add("flip");
  deck1.classList.add("match");
  stopTime1();

}

Show1.addEventListener("click", show1);

function reload() {

  location.reload();
}

function dis() {

  radio_one.checked = false;
  radio_two.checked = false;
  radio_three.checked = false;

}

//-----------------------------------------------FOR THREE SERIES OF PICSS.-----------------------------------------------------------------
const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const Show = document.querySelector(".show-btn");
const Help = document.querySelector(".help-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
let moves = 0;
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function startGame() {
  // Invoke shuffle function and store in variable
  const shuffledDeck = shuffle(Three_Cards);
  // Iterate over deck of cards array
  for (let i = 0; i < shuffledDeck.length; i++) {
    // Create the <li> tags
    const liTag = document.createElement("li");

    // Give <li> class of card
    liTag.classList.add("card");
    // Create the <img> tags
    const addImage = document.createElement("img");
    // Append <img> to <li>
    liTag.appendChild(addImage);
    // Set the img src path with the shuffled deck
    addImage.setAttribute("src", "" + shuffledDeck[i]);
    // Add an alt tag to the image
    addImage.setAttribute("alt", "image of vault boy from fallout");
    // Update the new <li> to the deck <ul>
    deck.appendChild(liTag);
  }
}

function gameover() {
  window.alert("GAME OVER");

  show1();
  stopTime();
}

function removeCard() {
  // As long as <ul> deck has a child node, remove it
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

function timer() {
  // Update the count every 1 second
  time = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      gameover();

      minutes++;
      seconds = 0;
    }
    // Update the timer in HTML with the time it takes the user to play the game
    timeCounter.innerHTML =
      "<i class='fa fa-hourglass-start'></i>" +
      " Timer: " +
      minutes +
      " Mins " +
      seconds +
      " Secs";
  }, 1000);
}

function stopTime() {
  clearInterval(time);
}

function resetEverything() {
  // Stop time, reset the minutes and seconds update the time inner HTML
  stopTime();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML =
    "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";

  // Reset moves count and reset its inner HTML
  moves = 0;
  movesCount.innerHTML = 0;
  // Clear both arrays that hold the opened and matched cards
  matched = [];
  opened = [];
  // Clear the deck
  dis();
  reload();
  deck.classList.remove("flip");
}

//MAIN LOGIC OF COMAPRING IN 3 PAIR GAME

function flipthreecard() {
  function compare() {
    // Compare the two images src
    
    if (opened.length == 2) {
      document.body.style.pointerEvents = "none";
    }

    if (opened.length === 2 && opened[0].src === opened[1].src) {
      // If matched call match()
     
     
      document.body.style.pointerEvents = "auto";
      
      match();
    
      
    } 
    else if (opened.length === 2 && opened[0].src != opened[1].src) {
      noMatch();
    }

  
  }

 

  function match() {
    
    setTimeout(() => {

        if (opened.length == 3) {
         
          document.body.style.pointerEvents = "none";
        }
        
        if (
          opened.length == 3 &&
          opened[0].src === opened[1].src &&
          opened[0].src === opened[2].src &&
          opened[1].src === opened[2].src
        ) {
          opened[0].parentElement.classList.add("match");
          opened[1].parentElement.classList.add("match");
          opened[2].parentElement.classList.add("match");
          
          threematch1();
        } 
        
        else if (
          opened.length === 3 &&
          (opened[0].src != opened[1].src) != opened[2].src
        ) {
          opened[0].parentElement.classList.remove("flip");
          opened[1].parentElement.classList.remove("flip");
          opened[2].parentElement.classList.remove("flip");
          

          nothreeMatch1();
        }
      }, 1000);
      

  }

  function noMatch() {
    setTimeout(function () {
      // Remove class flip on images parent element
      opened[0].parentElement.classList.remove("flip");
      opened[1].parentElement.classList.remove("flip");
      // Allow further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Remove the cards from opened array
      opened = [];
    },800);
  }

  function threematch1() {
    
    setTimeout(() => {
      
    
      opened[0].parentElement.classList.add("match");
      opened[1].parentElement.classList.add("match");
      opened[2].parentElement.classList.add("match");

      // Push the matched cards to the matched array
      matched.push(...opened);
      
      // Allow for further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Check to see if the game has been won with all 8 pairs
      winGame();
      // Clear the opened array
      opened = [];
    }, 900);
  }

  function nothreeMatch1() {
    
    setTimeout(() => {
      
   
    
      // Remove class flip on images parent element
      opened[0].parentElement.classList.remove("flip");
      opened[1].parentElement.classList.remove("flip");
      opened[2].parentElement.classList.remove("flip");
     
      
      opened = [];
      document.body.style.pointerEvents = "auto";

      },900); 

}

  function winGame() {
    if (matched.length === 24) {
      stopTime();
      window.alert("YOU WIN!");
    }
  }

  deck.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "LI") {
      if (timeStart === false) {
        timeStart = true;
        timer();
      }
      // Call flipCard() function
      flipCard();
    }

    //Flip the card and display cards img
    function flipCard() {
      // When <li> is clicked add the class .flip to show img
      evt.target.classList.add("flip");
      // Call addToOpened() function
      addToOpened();
    }

    //Add the fliped cards to the empty array of opened
    function addToOpened() {
      if (
        opened.length === 0 ||
        opened.length === 1 ||
        opened.length === 2 ||
        opened.length === 3
      ) {
        // Push that img to opened array
        opened.push(evt.target.firstElementChild);
      }
      // Call compareTwo() function
      compare();
    }
  });
}
//================================================================= FOUR PICS===============================================================
const deck2 = document.querySelector(".deck");
let opened2 = [];
let matched2 = [];
const modal2 = document.getElementById("modal");
const Help2 = document.querySelector(".help-btn");
const Show2 = document.querySelector(".show-btn");
const playAgain2 = document.querySelector(".play-again-btn");
const movesCount2 = document.querySelector(".moves-counter");
let moves2 = 0;
const timeCounter2 = document.querySelector(".timer");
let time2;
let minutes2 = 0;
let seconds2 = 0;
let timeStart2 = false;

function startGame3() {
  // Invoke shuffle function and store in variable
  const shuffledDeck2 = shuffle(Four_Cards);
  // Iterate over deck of cards array
  for (let i = 0; i < shuffledDeck2.length; i++) {
    // Create the <li> tags
    const liTag2 = document.createElement("li");

    // Give <li> class of card
    liTag2.classList.add("card");
    // Create the <img> tags
    const addImage2 = document.createElement("img");
    // Append <img> to <li>
    liTag2.appendChild(addImage2);
    // Set the img src path with the shuffled deck
    addImage2.setAttribute("src", "" + shuffledDeck2[i]);
    // Add an alt tag to the image
    addImage2.setAttribute("alt", "Error");
    // Update the new <li> to the deck <ul>
    deck2.appendChild(liTag2);
  }
}

function removeCard2() {
  // As long as <ul> deck has a child node, remove it
  while (deck2.hasChildNodes()) {
    deck2.removeChild(deck2.firstChild);
  }
}

function timer2() {
  // Update the count every 1 second
  time2 = setInterval(function () {
    seconds2++;
    if (seconds2 === 60) {
      gameover2();

      minutes2++;
      seconds2 = 0;
    }
    // Update the timer in HTML with the time it takes the user to play the game
    timeCounter2.innerHTML =
      "<i class='fa fa-hourglass-start'></i>" +
      " Timer: " +
      minutes2 +
      " Mins " +
      seconds2 +
      " Secs";
  }, 1000);
}

function stopTime2() {
  clearInterval(time2);
}

function resetEverything2() {
  // Stop time, reset the minutes and seconds update the time inner HTML
  stopTime2();
  timeStart2 = false;
  seconds2 = 0;
  minutes2 = 0;
  timeCounter2.innerHTML =
    "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";

  // Reset moves count and reset its inner HTML

  // Clear both arrays that hold the opened and matched cards
  matched2 = [];
  opened2 = [];
  // Clear the deck
  dis();
  reload();
  deck2.classList.remove("flip");
}


function flipfourcard() {
  function comparefour() {
    // Compare the two images src
    if (opened2.length == 2) {
      document.body.style.pointerEvents = "none";
    }
    if (opened2.length === 2 && opened2[0].src === opened2[1].src) {
      // If matched call match()
      document.body.style.pointerEvents = "auto";

      match();
    } else if (opened2.length === 2 && opened2[0].src != opened2[1].src) {
      noMatch();
    }
  }

  // Push the matched cards to the matched array

  function match() {

      setTimeout(function () {
        if (opened2.length == 3) {
          
          document.body.style.pointerEvents = "none";
        }

        if (
          opened2.length == 3 &&
          opened2[0].src === opened2[1].src &&
          opened2[0].src === opened2[2].src &&
          opened2[1].src === opened2[2].src
        ) {
          
          document.body.style.pointerEvents = "auto";

          fourmatch();
        } else if (
          opened2.length === 3 &&
          (opened2[0].src != opened2[1].src) != opened2[2].src
        ) {
          
          opened2[0].parentElement.classList.remove("flip");
          opened2[1].parentElement.classList.remove("flip");
          opened2[2].parentElement.classList.remove("flip");

          nothreeMatch();
        }
      }, 1000);
      
   
  }

  function noMatch() {
    setTimeout(function () {
      // Remove class flip on images parent element
      opened2[0].parentElement.classList.remove("flip");
      opened2[1].parentElement.classList.remove("flip");
      // Allow further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Remove the cards from opened array
      opened2 = [];
    }, 700);
  }

  function fourmatch() {
    
      

      setTimeout(function () {
        if (opened2.length == 4) {
          
          document.body.style.pointerEvents = "none";
        }

        if (
          opened2.length === 4 &&
          opened2[0].src === opened2[1].src &&
          opened2[0].src === opened2[2].src &&
          opened2[0].src === opened2[3].src &&
          opened2[1].src === opened2[2].src &&
          opened2[1].src === opened2[3].src &&
          opened2[2].src === opened2[3].src
        ) {
          opened2[0].parentElement.classList.add("match");
          opened2[1].parentElement.classList.add("match");
          opened2[2].parentElement.classList.add("match");
          opened2[3].parentElement.classList.add("match");

          match2();
        } else if (
          opened2.length === 4 &&
          ((opened2[0].src != opened2[1].src) != opened2[2].src) !=
            opened2[3].src
        ) {
         
          opened2[0].parentElement.classList.remove("flip");
          opened2[1].parentElement.classList.remove("flip");
          opened2[2].parentElement.classList.remove("flip");
          opened2[3].parentElement.classList.remove("flip");

          noMatch2();
        }
      },800);
      
   
  }

  function match2() {
    /* Access the two cards in opened array and add
            the class of match to the imgages parent: the <li> tag
            */
    setTimeout(function () {
      opened2[0].parentElement.classList.add("match");
      opened2[1].parentElement.classList.add("match");
      opened2[2].parentElement.classList.add("match");
      opened2[3].parentElement.classList.add("match");

      // Push the matched cards to the matched array
      matched2.push(...opened2);
      // Allow for further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Check to see if the game has been won with all 8 pairs
      winGame2();
      // Clear the opened array
      opened2 = [];
    },700);
  }

  function noMatch2() {
    setTimeout(function () {
      // Remove class flip on images parent element
      opened2[0].parentElement.classList.remove("flip");
      opened2[1].parentElement.classList.remove("flip");
      opened2[2].parentElement.classList.remove("flip");
      opened2[3].parentElement.classList.remove("flip");

      // Allow further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Remove the cards from opened array
      opened2 = [];
    }, 800);
  }

  function nothreeMatch() {
    setTimeout(function () {
      // Remove class flip on images parent element
      opened2[0].parentElement.classList.remove("flip");
      opened2[1].parentElement.classList.remove("flip");
      opened2[2].parentElement.classList.remove("flip");

      // Allow further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Remove the cards from opened array
      opened2 = [];
    }, 900);
  }

  function winGame2() {
    if (matched2.length === 24) {
      stopTime2();
      window.alert("YOU WIN!");
    }
  }

  deck2.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "LI") {
      // To console if I was clicking the correct element
      
      // Start the timer after the first click of one card
      // Executes the timer() function
      if (timeStart2 === false) {
        timeStart2 = true;
        timer2();
      }
      // Call flipCard() function
      flipCard2();
    }

    //Flip the card and display cards img
    function flipCard2() {
      // When <li> is clicked add the class .flip to show img
      evt.target.classList.add("flip");
      // Call addToOpened() function
      addToOpened2();
    }

    //Add the fliped cards to the empty array of opened
    function addToOpened2() {
      if (
        opened2.length === 0 ||
        opened2.length === 1 ||
        opened2.length === 2 ||
        opened2.length === 3 ||
        opened2.length === 4
      ) {
        // Push that img to opened array
        opened2.push(evt.target.firstElementChild);
      }
      // Call compareTwo() function
      comparefour();
    }
  });


}

function show2() {
  deck2.classList.add("flip");
  deck2.classList.add("match");
  stopTime2();
}

function gameover2() {
  window.alert("GAME OVER");

  show2();
  stopTime2();
}

Show2.addEventListener("click", show2);

show.disabled = true;

startGame1();

/*THIS FUNCTION IS USED TO GENRATE 2 PAIR GAME*/
/*===================================================================*/
function TwoCard() {
  if (radio_one.checked == true) {
    
    removeCard1();

    startGame1();
    fliptwocard();

    radio_one.addEventListener("click", startGame1);
    radio_one.addEventListener("click", fliptwocard);

    reset1.addEventListener("click", removeCard1);
    reset1.addEventListener("click", reload);
    reset1.addEventListener("click", resetEverything1);

    radio_two.disabled = true;
    radio_three.disabled = true;
    radio_one.disabled = true;
    show.disabled = false;
    label_one.onclick = false;
    label_two.onclick = false;
    label_three.onclick = false;
  }
}
/*THIS FUNCTION IS USED TO GENRATE 3 PAIR GAME*/
/*================================================================*/
function ThreeCard() {
  if (radio_two.checked == true) {
    
    removeCard1();

    radio_two.addEventListener("click", removeCard1);
    startGame();
    flipthreecard();

    radio_two.addEventListener("click", startGame);
    radio_two.addEventListener("click", flipthreecard);

    reset1.addEventListener("click", resetEverything1);

    radio_one.disabled = true;
    radio_two.disabled = true;
    radio_three.disabled = true;
    show.disabled = false;
    label_two.onclick = false;
    label_one.onclick = false;

    label_three.onclick = false;
  }
}
/*THIS FUNCTION IS USED TO GENRATE 4 PAIR GAME*/
function FourCard() {
  if (radio_three.checked == true) {
    removeCard1();

    radio_three.addEventListener("click", removeCard1);
    startGame3();
    flipfourcard();

    radio_three.addEventListener("click", startGame3);
    radio_three.addEventListener("click", flipfourcard);

    reset1.addEventListener("click", resetEverything2);

    radio_two.disabled = true;
    radio_one.disabled = true;
    radio_three.disabled = true;
    show.disabled = false;
    label_one.onclick = false;
    label_two.onclick = false;
    label_three.onclick = false;
  }
}

