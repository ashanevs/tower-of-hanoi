//This section creates const variables for the boxes (moving items), panels, and buttons in the DOM
//Also creates variables to store the currently selected box and panel.
//Lastly, calls function to allow initial interaction with boxes on page load

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
var cheater = false;
var selectedBox;
var selectedPanel;
var moveCounter = 0;
var bestOutcome = 31;
var gameDifficulty = 2;

addBoxTargets();
threePanels[2].appendChild(anyBox[0]);

//This function adds event listeners to the boxes. It checks to make sure no box is currently selected,
//and also checks to make sure that there is no box above the selection (to ensure you can only
//select the top box of any column). Upon click, the selected box gains a black border, and
//calls the function allowing the panel destination to be clicked

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
//to ensure a box has been selected. A size checking function checks whether or not the box is valid
//in the context of the current panel contents; if not, the box is deselected, the panel listener is
//turned off, and the box-input listeners are reactivated. If the size check passes, the selected box
//is appended to the panel before resetting the game-state to await box-interactions again

function addPanelTargets() {
  for (let i = 0; i < 3; i++) {
    threePanels[i].addEventListener("click", function(evt) {
      evt.preventDefault();
      if (!selectedBox) return;
      selectedPanel = threePanels[i];
      if (checkSizing() === false) {
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

//The reset button checks to see if the first panel is empty. If it's not,
//it unloads its contents into the second panel. Then a loop places the divs back
//into the first panel, in order

resetButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
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

testButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  cheater = true;
  while (threePanels[2].firstChild) {
    threePanels[1].appendChild(threePanels[2].firstChild);
  }
  for (let i = 0; i < 5; i++) {
    threePanels[2].appendChild(anyBox[i]);
    anyBox[i].style.margin = "2px 0px";
    moveCounter = 0;
    moveCounterBox[0].innerHTML = moveCounter;
    moveCounterBox[1].innerHTML = moveCounter;
  }
});

easyButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
  setDifficultyEasy();
});

normalButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
  setDifficultyNormal();
});

hardButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
  setDifficultyHard();
});

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

function resetGame() {
  cheater = false;
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

mobileInstructions.addEventListener("click", function(evt) {
  evt.preventDefault();
  mobileDropdown.classList.toggle("visibility");
});

function setDifficultyEasy() {
  moveCounter = 0;
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
  moveCounter = 0;
  bestOutcome = 31;
  gameDifficulty = 2;
  anyBox[0].style.display = "none";
  anyBox[1].style.display = "block";
  anyBox[2].style.display = "block";
  threePanels[2].appendChild(anyBox[0]);
}
function setDifficultyHard() {
  moveCounter = 0;
  bestOutcome = 63;
  gameDifficulty = 3;
  if (threePanels[0].childElementCount === 5) {
    threePanels[0].appendChild(anyBox[0]);
  }
  anyBox[0].style.display = "block";
  anyBox[1].style.display = "block";
  anyBox[2].style.display = "block";
}
