# Tower of Hanoi

This is a project which recreates a ~150 year old mathematical puzzle game called "Tower of Hanoi". The github-deployment of the project can be found [here](https://ashanevs.github.io/tower-of-hanoi/).

## Desktop view

<img src="https://raw.githubusercontent.com/ashanevs/tower-of-hanoi/master/tower-of-hanoi.png" alt="tower of hanoi" width="700"/>

## Mobile view

<img src="https://raw.githubusercontent.com/ashanevs/tower-of-hanoi/master/tower-of-hanoi-mobile.png" alt="tower of hanoi" width="300"/>

## Motivation and Methods

My goal was to explore and deepen my knowledge of working with HTML, CSS, and JavaScript. HTML and CSS were used for creating the basic structure of the project and styling its contents. JavaScript was used to build the game logic as well as to make its working pieces interative through use of event listeners and DOM manipulation. I also wanted to make the game responsive so that it was suited for mobile devices, which involved further use of CSS and JS.

## Features and Considerations

The game features three difficulties which add or remove boxes, adding to the needed number of moves to complete the game. Pressing the game difficuly buttons will reset the game to a new game state. A reset button (which is still made available on the win-screen) was initially available, but felt redundant next to the difficulty buttons. I considered labeling the move-counter button, but felt that it was so intuitive to notice its function once you begin playing that it was unnecessary. The "cheat" button was originally made simply for testing purposes, as playing the game to completion was too time consuming; I decided to leave this feature in, if only to display the full functionality of the game (or to cut to the end of a frustrated user experience). Pressing it will make the game winnable in one move (although a boolean will identify you as a cheater on the win screen).

The game functions nicely on mobile platforms, and I would even recommend this as your primary viewing method. The difficulty buttons and move counter adjust into a column with the move-counter most-visible, and the instructions are stored in a toggle-able div to cut down on space.

## Challenges and User Experience

Creating the game logic was the most interesting and challenging part of the process. I learned how important it was to have game states which flowed seamlessly, as well the importance of checking for exceptions to the expected user choices.

It was particularly easy to distribute the project because of its mobile-readiness which allowed for good feedback. One person asked what the best possible score was, which prompted me to include that data per difficulty. Another user pointed out that placing a block into the same panel in which it was selected (i.e. not actually "moving" the block) still increased the move counter, which was counter intuitive and prompted me to adjust the feature to account for this. A commonly expected or requested feature was for the user to be able to drag boxes into panels (as opposed to clicking them); at the time of writing, that feature has not been implemented due to time constraints.

The game initially only had "normal" difficulty, and implementing the extra difficulties added a fair amount of complexity to the original coding considerations. I now better appreciate modular coding, and the value of accounting for it early in the creative process.

The current game functions well and displays no major issues that most users would encounter. It was pointed out that selected an invalid box repeatedly can cause freezing issues, though this is not a likely scenario that the typical user would encounter while playing the game as intended. I believe this is related to the content of an event listener that uses a loop, but again due to time constraints, I have not addressed this issue at the time of writing.

## Going Forward and Contact Info

In the future, I hope to implement a number of changes or improvements on this project. Being able to drag and place boxes is a high priority. I find the current state of styling for the project appealing and minimalistic (the serif-font of the title and the gradient that leaks into the background seem decent), but it could probably be improved in any number of ways. Conceptually it conveys the nature of the core game, but visually it doesn't greatly resemble its real-life representation using discs and pegged stands. Time-based scoring and a multiple-game win-counter are considerations as well (although I personally find one or two playthroughs of Tower of Hanoi taxing enough, due to the nature of the game itself).

I hope you've enjoyed my project. If you have any questions, comments, or ideas concerning it, please feel free to contact me at [ashanev@gmail.com](mailto:ashanev@gmail.com).
