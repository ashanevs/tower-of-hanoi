//This section creates const variables for the boxes (moving items) and panels in the DOM.
//Also creates variables to store the currently selected box and panel.
//Lastly, calls function to allow initial interaction with boxes on page load

const anyBox = document.querySelectorAll(".box");
const firstPanel = document.querySelector(".firstPanel");
const secondPanel = document.querySelector(".secondPanel");
const thirdPanel = document.querySelector(".thirdPanel");
var selectedBox;
var selectedPanel;
addBoxTargets();

//This function adds event listeners to the boxes. It checks to make sure no box is currently selected,
//and also checks to make sure that there is no box above the selection (to ensure you can only
//select the top box of any column). Upon click, the selected box gains a black border, and
//calls the function allowing the panel destination to be clicked

function addBoxTargets() {
  for (let i = 0; i < 5; i++)
    anyBox[i].addEventListener("click", function(evt) {
      evt.preventDefault();
      if (!selectedBox) {
        selectedBox = evt.target;
        if (selectedBox.nextElementSibling === null) {
          anyBox[i].style.border = "2px solid black";
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
  firstPanel.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (!selectedBox) return;
    selectedPanel = firstPanel;
    if (checkSizing() === false) {
      selectedBox.style.border = "2px solid red";
      evt.target.removeEventListener("click", evt);
      selectedBox = null;
      addBoxTargets();
      return;
    }
    firstPanel.appendChild(selectedBox);
    selectedBox.style.border = "2px solid red";
    evt.target.removeEventListener("click", evt);
    selectedBox = null;
    addBoxTargets();
  });

  secondPanel.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (!selectedBox) return;
    selectedPanel = secondPanel;
    if (checkSizing() === false) {
      selectedBox.style.border = "2px solid red";
      evt.target.removeEventListener("click", evt);
      selectedBox = null;
      addBoxTargets();
      return;
    }
    secondPanel.appendChild(selectedBox);
    selectedBox.style.border = "2px solid red";
    evt.target.removeEventListener("click", evt);
    selectedBox = null;
    addBoxTargets();
  });

  thirdPanel.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (!selectedBox) return;
    selectedPanel = thirdPanel;
    if (checkSizing() === false) {
      selectedBox.style.border = "2px solid red";
      evt.target.removeEventListener("click", evt);
      selectedBox = null;
      addBoxTargets();
      return;
    }
    thirdPanel.appendChild(selectedBox);
    selectedBox.style.border = "2px solid red";
    evt.target.removeEventListener("click", evt);
    selectedBox = null;
    addBoxTargets();
  });
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

//This function was never incorporated and might not be used

// function checkBoxForSibling() {
//   if (selectedBox.nextElementSibling === null) {
//     return;
//   }
//   return false;
// }
