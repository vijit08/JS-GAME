var Two_Cards = [];
var Three_Cards;
var Four_Cards;
var radio_one = document.getElementById("radio_one");
var radio_two = document.getElementById("radio_two");
var radio_three = document.getElementById("radio_three");
var label_one = document.getElementById("label_first");
var label_two = document.getElementById("label_second");
var label_three = document.getElementById("label_third");
const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const Help = document.querySelector(".help-btn");
const reset = document.querySelector(".reset-btn");
const Show = document.querySelector(".show-btn");
const playAgain = document.querySelector(".play-again-btn");
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
label_one.onclick = true;
label_two.onclick = false;
label_three.onclick = false;
Show.disabled=true;
const Deck = ["Agility.png","banana.png","Citizenship.png","Boat.png","Hack.png","Nerd-Rage.png","Nuka-Cola.png","Robotics.png","Shock.png","panda.png","ball.png","clock.png"];

Two_Cards = [...Deck, ...Deck];

let Deck_Two = Deck.slice(0, 8);
Three_Cards = [...Deck_Two, ...Deck_Two, ...Deck_Two];

let Deck_Three = Deck.slice(0, 6);
Four_Cards = [...Deck_Three, ...Deck_Three, ...Deck_Three, ...Deck_Three];


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

function startGame(array) {

  const shuffledDeck = shuffle(array);
  for (let i = 0; i < shuffledDeck.length; i++) {

    const liTag = document.createElement("li");
    liTag.classList.add("card");
    const addImage = document.createElement("img");
    liTag.appendChild(addImage);
    addImage.setAttribute("src", "" + shuffledDeck[i]);
    addImage.setAttribute("class", "img");
    addImage.setAttribute("alt", "image error");
    deck.appendChild(liTag);

  }
}

function removeCard() {

  while (deck.hasChildNodes()) {

    deck.removeChild(deck.firstChild);

  }
}

function timer() {
  // Update the count every 1 second
  time = setInterval(function () {

    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
      gameover();

    }
    // Update the timer in HTML with the time it takes the user to play the game
    timeCounter.innerHTML =" Timer: " + minutes +" Mins " +seconds +" Secs";

  }, 1000);
}

function stopTime() {

  clearInterval(time);

}

function resetEverything() {

  stopTime();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML ="<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  matched = [];
  opened = [];
  dis();
  reload();
  deck.classList.remove("flip");

}

function gameover() {

  window.alert("GAME OVER");

  show();
  stopTime();

}

function help() {

  window.alert(
    "CATCH THE CLONE GAME - Help  \n\nPlayers take turns, to the left, turning any two cards picture-side-up. The cards must be turned over completely, so that all players can see them.\n\nA Match: A player makes a match if the two cards turned picture-side-up are identical. When a match is made, the player takes both cards and places them in front of him or her. That player then takes another turn, and continues taking turns until he or she misses.\n\nA Miss: A player misses if the two cards turned over are not identical. When a player misses, he or she turns the two cards picture-side-down again, in the same place.\n\nThat player's turn ends-and all players try to remember which cards were turned over, for future matches.\n\nThe game continues until all cards have been matched and removed from the playing area. All players then count up their matching pairs."
  );
}

Help.addEventListener("click", help);

function show() {

  deck.classList.add("flip");
  deck.classList.add("match");
  stopTime();

}

function reload() {

  location.reload();

}

function dis() {

  radio_one.checked = false;
  radio_two.checked = false;
  radio_three.checked = false;

}

Show.addEventListener("click", show);

startGame(Two_Cards);

//=============================================TWO CARD SERIES==========================================================================

function fliptwocard() {

  function compareTwo1() {

    if (opened.length === 2) {

      document.body.style.pointerEvents = "none";

    }

    if (opened.length === 2 && opened[0].src === opened[1].src) {

      setTimeout(function () {

        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");

        matched.push(...opened);

        document.body.style.pointerEvents = "auto";

        winGame();

        opened = [];

      }, 600);
    } 
    
    else if (opened.length === 2 && opened[0].src != opened[1].src) {

      setTimeout(function () {
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");

        document.body.style.pointerEvents = "auto";

        opened = [];

      }, 700);
    }
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

      flipCard();
    }

    function flipCard() {

      evt.target.classList.add("flip");
      addToOpened();

    }

    function addToOpened() {

      if (opened.length === 0 || opened.length === 1) {

        opened.push(evt.target.firstElementChild);

      }

      compareTwo1();
    }
  });
}
//=============================================THREE CARD SERIES=============================================================================
function flipthreecard() {

  function compare() {

    if (opened.length == 2) {

      document.body.style.pointerEvents = "none";

    }

    if (opened.length === 2 && opened[0].src === opened[1].src) {

      document.body.style.pointerEvents = "auto";

    }

    if (opened.length == 3) {

      document.body.style.pointerEvents = "none";

    }

    if (opened.length == 3 && opened[0].src === opened[1].src && opened[0].src === opened[2].src && opened[1].src === opened[2].src) {
      
      opened[0].parentElement.classList.add("match");
      opened[1].parentElement.classList.add("match");
      opened[2].parentElement.classList.add("match");
      matched.push(...opened);
      document.body.style.pointerEvents = "auto";
      winGame();
      opened = [];

    } 
    
    else if (opened.length === 3 && (opened[0].src != opened[1].src) != opened[2].src) {

      setTimeout(() => {

        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        opened[2].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];

      }, 900);
    } 
    
    else if (opened.length === 2 && opened[0].src != opened[1].src) {

      setTimeout(() => {

        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];

      }, 800);
    }
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

      flipCard();
    }

    function flipCard() {

      evt.target.classList.add("flip");
      addToOpened();

    }

    function addToOpened() {

      if (opened.length === 0 || opened.length === 1 || opened.length === 2 || opened.length === 3) {

        opened.push(evt.target.firstElementChild);

      }

      compare();
    }
  });
}

//=========================================-===========FOUR CARD SERIES =======================================================================
function flipfourcard() {

  function comparefour() {

    if (opened.length == 2) {

      document.body.style.pointerEvents = "none";

    }

    if (opened.length === 2 && opened[0].src === opened[1].src) {

      document.body.style.pointerEvents = "auto";

    }

    else if (opened.length === 2 && opened[0].src != opened[1].src) {

      setTimeout(() => {

        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];

      }, 800);
    }

    if (opened.length == 3) {

      document.body.style.pointerEvents = "none";

    }

    if (opened.length == 3 && opened[0].src === opened[1].src && opened[0].src === opened[2].src && opened[1].src === opened[2].src) {
      
      document.body.style.pointerEvents = "auto";

    } 
    
    else if (opened.length === 3 && (opened[0].src != opened[1].src) != opened[2].src) {

      setTimeout(() => {

        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        opened[2].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];

      }, 900);
    }

    if (opened.length == 4) {

      document.body.style.pointerEvents = "none";

    }

    if (opened.length === 4 && opened[0].src === opened[1].src && opened[0].src === opened[2].src && opened[0].src === opened[3].src && 
      opened[1].src === opened[2].src && opened[1].src === opened[3].src && opened[2].src === opened[3].src) {

      opened[0].parentElement.classList.add("match");
      opened[1].parentElement.classList.add("match");
      opened[2].parentElement.classList.add("match");
      opened[3].parentElement.classList.add("match");
      matched.push(...opened);
      document.body.style.pointerEvents = "auto";
      winGame();
      opened = [];

    }
    
    else if (opened.length === 4 && ((opened[0].src != opened[1].src) != opened[2].src) != opened[3].src) {

      setTimeout(function () {

        // Remove class flip on images parent element
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        opened[2].parentElement.classList.remove("flip");
        opened[3].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];

      }, 800);
    }
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
      
      flipCard();
    }
    function flipCard() {
      
      evt.target.classList.add("flip");
      addToOpened();

    }

    function addToOpened() {

      if (opened.length === 0 || opened.length === 1 || opened.length === 2 || opened.length === 3 || opened.length === 4) {
        // Push that img to opened array
        opened.push(evt.target.firstElementChild);

      }
      // Call compareTwo() function
      comparefour();
    }
  });
}

/*THIS FUNCTION IS USED TO GENRATE 2 PAIR GAME*/
/*===================================================================*/
function TwoCard() {

  if (radio_one.checked == true) {

    removeCard();

    startGame(Two_Cards);
    fliptwocard();

    radio_one.addEventListener("click", startGame);
    radio_one.addEventListener("click", fliptwocard);

    reset.addEventListener("click", removeCard);
    reset.addEventListener("click", reload);
    reset.addEventListener("click", resetEverything);

    radio_two.disabled = true;
    radio_three.disabled = true;
    radio_one.disabled = true;
    Show.disabled = false;
    label_one.onclick = false;
    label_two.onclick = false;
    label_three.onclick = false;

  }
}

function ThreeCard() {

  if (radio_two.checked == true) {

    removeCard();

    radio_two.addEventListener("click", removeCard);
    startGame(Three_Cards);
    flipthreecard();

    radio_two.addEventListener("click", startGame);
    radio_two.addEventListener("click", flipthreecard);
    reset.addEventListener("click", resetEverything);
    radio_one.disabled = true;
    radio_two.disabled = true;
    radio_three.disabled = true;
    Show.disabled = false;
    label_two.onclick = false;
    label_one.onclick = false;
    label_three.onclick = false;

  }
}

function FourCard() {

  if (radio_three.checked == true) {

    removeCard();

    radio_three.addEventListener("click", removeCard);
    startGame(Four_Cards);
    flipfourcard();

    radio_three.addEventListener("click", startGame);
    radio_three.addEventListener("click", flipfourcard);

    reset.addEventListener("click", resetEverything);

    radio_two.disabled = true;
    radio_one.disabled = true;
    radio_three.disabled = true;
    Show.disabled = false;
    label_one.onclick = false;
    label_two.onclick = false;
    label_three.onclick = false;

  }
}
