//This section creates const variables for the boxes (moving items), panels, and buttons in the DOM
//Also creates variables to store the currently selected box and panel.
//Lastly, calls function to allow initial interaction with boxes on page load

const anyBox = document.querySelectorAll(".box");
// const firstPanel = document.querySelector(".first-panel");
// const secondPanel = document.querySelector(".second-panel");
// const thirdPanel = document.querySelector(".third-panel");
const resetButton = document.querySelector(".resetbutton");
const testButton = document.querySelector(".testbutton");
const threePanels = document.querySelectorAll(".panels");
const panelContainer = document.querySelector(".container");
const winScreen = document.querySelector(".win-screen");
const moveCounterBox = document.querySelector(".move-counter");
const easyButton = document.querySelector(".easymode");
const normalButton = document.querySelector(".normalmode");
const hardButton = document.querySelector(".hardmode");
const mobileInstructions = document.querySelector(".mobile-instructions");
const mobileDropdown = document.querySelector(".instructions-dropdown");
var selectedBox;
var selectedPanel;
var moveCounter = 0;
var winningBoxCount = 6;

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
          // anyBox[i].style.border = "5px solid black";
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
        // selectedBox.style.border = "5px solid black";
        evt.target.removeEventListener("click", evt);
        selectedBox = null;
        addBoxTargets();
        return;
      }
      threePanels[i].appendChild(selectedBox);
      moveCounter++;
      moveCounterBox.innerHTML = moveCounter;
      selectedBox.style.margin = "2px 0px";
      // selectedBox.style.border = "5px solid black";
      evt.target.removeEventListener("click", evt);
      selectedBox = null;
      addBoxTargets();
      winConditionMet();
    });
  }
}

// function addPanelTargets() {
//   firstPanel.addEventListener("click", function(evt) {
//     evt.preventDefault();
//     if (!selectedBox) return;
//     selectedPanel = firstPanel;
//     if (checkSizing() === false) {
//       selectedBox.style.margin = "2px 0px";
//       selectedBox.style.border = "5px solid red";
//       evt.target.removeEventListener("click", evt);
//       selectedBox = null;
//       addBoxTargets();
//       return;
//     }
//     firstPanel.appendChild(selectedBox);
//     moveCounter++;
//     moveCounterBox.innerHTML = moveCounter;
//     selectedBox.style.margin = "2px 0px";
//     selectedBox.style.border = "5px solid red";
//     evt.target.removeEventListener("click", evt);
//     selectedBox = null;
//     addBoxTargets();
//   });

//   secondPanel.addEventListener("click", function(evt) {
//     evt.preventDefault();
//     if (!selectedBox) return;
//     selectedPanel = secondPanel;
//     if (checkSizing() === false) {
//       selectedBox.style.margin = "2px 0px";
//       selectedBox.style.border = "5px solid red";
//       evt.target.removeEventListener("click", evt);
//       selectedBox = null;
//       addBoxTargets();
//       return;
//     }
//     secondPanel.appendChild(selectedBox);
//     moveCounter++;
//     moveCounterBox.innerHTML = moveCounter;
//     selectedBox.style.margin = "2px 0px";
//     selectedBox.style.border = "5px solid red";
//     evt.target.removeEventListener("click", evt);
//     selectedBox = null;
//     addBoxTargets();
//   });

//   thirdPanel.addEventListener("click", function(evt) {
//     evt.preventDefault();
//     if (!selectedBox) return;
//     selectedPanel = thirdPanel;
//     if (checkSizing() === false) {
//       selectedBox.style.margin = "2px 0px";
//       selectedBox.style.border = "5px solid red";
//       evt.target.removeEventListener("click", evt);
//       selectedBox = null;
//       addBoxTargets();
//       return;
//     }
//     thirdPanel.appendChild(selectedBox);
//     moveCounter++;
//     moveCounterBox.innerHTML = moveCounter;
//     selectedBox.style.margin = "2px 0px";
//     selectedBox.style.border = "5px solid red";
//     evt.target.removeEventListener("click", evt);
//     selectedBox = null;
//     addBoxTargets();
//     evt.stopPropagation();
//     winConditionMet();
//   });
// }

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

//This function was never incorporated and might not be used

// function checkBoxForSibling() {
//   if (selectedBox.nextElementSibling === null) {
//     return;
//   }
//   return false;
// }

//The reset button checks to see if the first panel is empty. If it's not,
//it unloads its contents into the second panel. Then a loop places the divs back
//into the first panel, in order

resetButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
});

testButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  winningBoxCount = 6;
  while (threePanels[2].firstChild) {
    threePanels[1].appendChild(threePanels[2].firstChild);
  }
  for (let i = 0; i < 5; i++) {
    threePanels[2].appendChild(anyBox[i]);
    anyBox[i].style.margin = "2px 0px";
    // anyBox[i].style.border = "5px solid black";
    moveCounter = 0;
    moveCounterBox.innerHTML = moveCounter;
  }
});

easyButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
  anyBox[0].style.display = "none";
  anyBox[1].style.display = "none";
  anyBox[2].style.display = "none";
  threePanels[2].appendChild(anyBox[0]);
  threePanels[2].appendChild(anyBox[1]);
  threePanels[2].appendChild(anyBox[2]);
});

normalButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
  anyBox[0].style.display = "none";
  anyBox[1].style.display = "block";
  anyBox[2].style.display = "block";
  threePanels[2].appendChild(anyBox[0]);
});

hardButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  resetGame();
  if (threePanels[0].childElementCount === 5) {
    threePanels[0].appendChild(anyBox[0]);
  }
  anyBox[0].style.display = "block";
  anyBox[1].style.display = "block";
  anyBox[2].style.display = "block";
});

function winConditionMet() {
  if (threePanels[2].childElementCount === winningBoxCount) {
    panelContainer.style.display = "none";
    winScreen.style.display = "block";
    winScreen.innerHTML =
      "Congratulations! You won in " + moveCounter + " moves.";
    easyButton.style.display = "none";
    normalButton.style.display = "none";
    hardButton.style.display = "none";
    resetButton.style.display = "block";
    testButton.style.display = "none";
    mobileInstructions.style.display = "none";
  }
}

function resetGame() {
  resetButton.style.display = "none";
  easyButton.style.display = "block";
  normalButton.style.display = "block";
  hardButton.style.display = "block";
  testButton.style.display = "block";
  mobileInstructions.style.display = "block";
  while (threePanels[0].firstChild) {
    threePanels[1].appendChild(threePanels[0].firstChild);
  }
  for (let i = 0; i < 6; i++) {
    threePanels[0].appendChild(anyBox[i]);
    anyBox[i].style.margin = "2px 0px";
    // anyBox[i].style.border = "5px solid black";
    panelContainer.style.display = "flex";
    winScreen.style.display = "none";
    moveCounter = 0;
    moveCounterBox.innerHTML = moveCounter;
  }
}

mobileInstructions.addEventListener("click", function(evt) {
  evt.preventDefault();
  mobileDropdown.classList.toggle("visibility");
});
