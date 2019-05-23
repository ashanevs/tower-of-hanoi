//This section creates constants to store many DOM elements.

const anyBox = document.querySelectorAll(".box");
const resetButton = document.querySelector(".resetbutton");
const testButton = document.querySelector(".testbutton");
const threePanels = document.querySelectorAll(".panels");
const panelContainer = document.querySelector(".container");
const winScreen = document.querySelector(".win-screen");
const moveCounterBox = document.querySelectorAll(".move-counter");
const easyButton = document.querySelector(".easymode");
const normalButton = document.querySelector(".normalmode");
const hardButton = document.querySelector(".hardmode");
const mobileInstructions = document.querySelector(".mobile-instructions");
const mobileDropdown = document.querySelector(".instructions-dropdown");

//This section creates variables related to initial and changing game states

var cheater = false;
var selectedBox;
var selectedPanel;
var moveCounter = 0;
var bestOutcome = 31;
var gameDifficulty = 2;

//These function calls set up ability to play the game (to click boxes) and set the initial difficulty

addBoxTargets();
setDifficultyNormal();

//This function adds event listeners to the boxes. It checks to make sure no box is currently selected,
//and also checks to make sure that there is no box above the selection (to ensure you can only
//select the top box of any column). Upon click, the selected box gains a lower margin to give visual
//feedback, and calls the function allowing the panel destination to be clicked

function addBoxTargets() {
  for (let i = 0; i < 6; i++)
    anyBox[i].addEventListener("click", function(evt) {
      evt.preventDefault();
      if (!selectedBox) {
        selectedBox = evt.target;
        if (selectedBox.nextElementSibling === null) {
          anyBox[i].style.margin = "0px 0px 10px 0px";
          evt.stopPropagation();
          addPanelTargets();
        } else {
          selectedBox = null;
          addBoxTargets();
        }
      }
    });
}

//This function adds event listeners to the panel sections. On click, the function first checks
//to ensure a box has been preselected. A size checking function checks whether or not the box is valid
//in the context of the current panel contents; if not, the box is deselected, the panel listener is
//turned off, and the box-input listeners are reactivated. Also checks to make sure new panel target is
//different from current position.
//If both pass, the selected box is appended to the panel, the move counter increases,
//and the game state returns to waiting for a box to be selected. The game also checks to see if the win
//condition has been met at this point.

function addPanelTargets() {
  for (let i = 0; i < 3; i++) {
    threePanels[i].addEventListener("click", function(evt) {
      evt.preventDefault();
      if (!selectedBox) return;
      selectedPanel = threePanels[i];
      if (
        checkSizing() === false ||
        selectedPanel === selectedBox.parentElement
      ) {
        selectedBox.style.margin = "2px 0px";
        evt.target.removeEventListener("click", evt);
        selectedBox = null;
        addBoxTargets();
        return;
      }
      threePanels[i].appendChild(selectedBox);
      moveCounter++;
      moveCounterBox[0].innerHTML = moveCounter;
      moveCounterBox[1].innerHTML = moveCounter;
      selectedBox.style.margin = "2px 0px";
      evt.target.removeEventListener("click", evt);
      selectedBox = null;
      addBoxTargets();
      winConditionMet();
    });
  }
}

//This function checks to see if a panel is empty, in which case a box-move is always permissable.
//If the panel is not empty, the function checks to see if the incoming selectedBox is larger than
//the "top" box currently in the division.

function checkSizing() {
  if (selectedPanel.firstElementChild === null) {
    return;
  } else if (
    selectedBox.dataset.length > selectedPanel.lastElementChild.dataset.length
  ) {
    return false;
  }
}

//The reset button (available only at win screen) checks the current game difficulty
//and sets the game state to a fresh version of that difficulty by calling its respective function

resetButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (gameDifficulty === 1) {
    setDifficultyEasy();
  }
  if (gameDifficulty === 2) {
    setDifficultyNormal();
  }
  if (gameDifficulty === 3) {
    setDifficultyHard();
  }
});

//Originally used for testing purposes, the test button (called "cheat" in the game)
//empties the third panel, then loads it with all but the smallest box so that they game
//can be completed in a single move

testButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  cheater = true;
  while (threePanels[2].firstChild) {
    threePanels[1].appendChild(threePanels[2].firstChild);
  }
  for (let i = 0; i < 5; i++) {
    threePanels[2].appendChild(anyBox[i]);
    anyBox[i].style.margin = "2px 0px";
    moveCounterBox[0].innerHTML = moveCounter;
    moveCounterBox[1].innerHTML = moveCounter;
  }
});

//The following adds event listeners to the three difficulty buttons, which calls their functions listed
//further below

easyButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  setDifficultyEasy();
});

normalButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  setDifficultyNormal();
});

hardButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  setDifficultyHard();
});

//The win condition checks to see if all 6 (visible or invisible) boxes are in the third panel.
//When this happens, the win screen is made visible and the panels invisible. The win screen has
//a different message based on whether you used the cheat button, completed the game in the least possible
//moves, or completed the game otherwise. It also adjusts the button layout so that a reset button is
//visible and the other game buttons are hidden.

function winConditionMet() {
  if (threePanels[2].childElementCount === 6) {
    panelContainer.style.display = "none";
    winScreen.style.display = "block";
    if (cheater === true) {
      winScreen.innerHTML =
        "Congratulations! You cheated! The fewest moves possible was " +
        bestOutcome +
        ".";
    } else if (moveCounter === bestOutcome) {
      winScreen.innerHTML =
        "Congratulations! You won in " +
        moveCounter +
        " moves. That's the fewest moves possible, great job!";
    } else {
      winScreen.innerHTML =
        "Congratulations! You won in " +
        moveCounter +
        " moves. The fewest moves possible was " +
        bestOutcome +
        ".";
    }
    easyButton.style.display = "none";
    normalButton.style.display = "none";
    hardButton.style.display = "none";
    resetButton.style.display = "block";
    testButton.style.display = "none";
  }
}

//The resetGame function resets the game to a base state closely resembling the initial HTML.
//It resets the appearance of several items to their intended initial state, and most
//importantly resets the game boxes so that they are in the first panel, in order

function resetGame() {
  cheater = false;
  moveCounter = 0;
  resetButton.style.display = "none";
  easyButton.style.display = "block";
  normalButton.style.display = "block";
  hardButton.style.display = "block";
  testButton.style.display = "block";
  while (threePanels[0].firstChild) {
    threePanels[1].appendChild(threePanels[0].firstChild);
  }
  while (threePanels[2].firstChild) {
    threePanels[1].appendChild(threePanels[2].firstChild);
  }
  for (let i = 0; i < 6; i++) {
    threePanels[0].appendChild(anyBox[i]);
    anyBox[i].style.margin = "2px 0px";
  }
  panelContainer.style.display = "flex";
  winScreen.style.display = "none";
  moveCounter = 0;
  moveCounterBox[0].innerHTML = moveCounter;
  moveCounterBox[1].innerHTML = moveCounter;
}

//This event listener is used to toggle the visibility of the instructions while viewing from mobile

mobileInstructions.addEventListener("click", function(evt) {
  evt.preventDefault();
  mobileDropdown.classList.toggle("toggle-visibility");
});

//The following functions are used to set up different game difficulties. The reset function is called,
//resetting the boxes to the first panel. Then, they are made visible or hidden as needed, and invisible
//boxes are appended to the third panel which is necessary at present for the win condition state.

function setDifficultyEasy() {
  resetGame();
  bestOutcome = 7;
  gameDifficulty = 1;
  anyBox[0].style.display = "none";
  anyBox[1].style.display = "none";
  anyBox[2].style.display = "none";
  threePanels[2].appendChild(anyBox[0]);
  threePanels[2].appendChild(anyBox[1]);
  threePanels[2].appendChild(anyBox[2]);
}
function setDifficultyNormal() {
  resetGame();
  bestOutcome = 31;
  gameDifficulty = 2;
  anyBox[0].style.display = "none";
  anyBox[1].style.display = "block";
  anyBox[2].style.display = "block";
  threePanels[2].appendChild(anyBox[0]);
}
function setDifficultyHard() {
  resetGame();
  bestOutcome = 63;
  gameDifficulty = 3;
  if (threePanels[0].childElementCount === 5) {
    threePanels[0].appendChild(anyBox[0]);
  }
  anyBox[0].style.display = "block";
  anyBox[1].style.display = "block";
  anyBox[2].style.display = "block";
}
