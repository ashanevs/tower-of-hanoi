//This select grabs the box (moving pieces) and panels from the DOM
//also creates variables to store the currently selected box and panel
//and initiates the game functionality by calling the function to
//make the boxes interactive

const anyBox = document.querySelectorAll(".box");
const firstPanel = document.querySelector(".firstPanel");
const secondPanel = document.querySelector(".secondPanel");
const thirdPanel = document.querySelector(".thirdPanel");
var selectedBox;
var selectedPanel;
addBoxTargets();

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

function checkSizing() {
  if (selectedPanel.firstElementChild === null) {
    return;
  } else if (
    selectedBox.dataset.length > selectedPanel.lastElementChild.dataset.length
  ) {
    return false;
  }
}

function checkBoxForSibling() {
  if (selectedBox.nextElementSibling === null) {
    return;
  }
  return false;
}
