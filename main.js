const anyBox = document.querySelectorAll(".box");
const firstPanel = document.querySelector(".firstPanel");
const secondPanel = document.querySelector(".secondPanel");
const thirdPanel = document.querySelector(".thirdPanel");
var selectedBox;

for (let i = 0; i < 5; i++) {
  anyBox[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    selectedBox = document.querySelectorAll(".box")[i];
    anyBox[i].style.border = "2px solid black";
    // anyBox[i].removeEventListener("click", evt);
  });
}

secondPanel.addEventListener("click", function(evt) {
  evt.preventDefault();
  secondPanel.appendChild(selectedBox);
});
