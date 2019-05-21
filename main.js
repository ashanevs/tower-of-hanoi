const anyBox = document.querySelectorAll(".box");
const firstPanel = document.querySelector(".firstPanel");
const secondPanel = document.querySelector(".secondPanel");
const thirdPanel = document.querySelector(".thirdPanel");
var selectedBox;
var selectedPanel;

function addBoxTargets() {
  for (let i = 0; i < 5; i++)
    anyBox[i].addEventListener("click", function(evt) {
      evt.preventDefault();
      if (!selectedBox) {
        selectedBox = evt.target;
        anyBox[i].style.border = "2px solid black";
        evt.stopPropagation();
        addPanelTargets();
      }
    });
}

addBoxTargets();

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
  if (!selectedPanel.hasChildNodes()) {
    return;
  } else if (
    selectedBox.dataset.length > selectedPanel.firstElementChild.dataset.length
  ) {
    return false;
  }
}
