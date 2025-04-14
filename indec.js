// Selecting the main container and all game boxes
let main = document.querySelector("main");
let box = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");

// Variable to track the current turn: true for 'X', false for 'O'
let turn0 = true;

// Array of winning patterns (indices of boxes)
let winPattern = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Diagonal from top-right to bottom-left
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

// Variables to keep track of wins and draws
let xWins = 0;
let oWins = 0;
let draws = 0;

// Selecting DOM elements to display win/draw counters
let xWinCounter = document.querySelector("#xWinCount");
let oWinCounter = document.querySelector("#oWinCount");
let drawCounter = document.querySelector("#drawCount");

// Initializing counters in the UI
xWinCounter.innerText = xWins;
oWinCounter.innerText = oWins;
drawCounter.innerText = draws;

// Adding click event to each box
box.forEach((box) => {
  box.addEventListener("click", () => {
    // Set symbol and style based on current turn
    if (turn0) {
      box.innerText = "X";
      turn0 = false;
      box.style.color = "red";
      box.style.textShadow = "3px 3px 3px red";
    } else {
      box.innerText = "O";
      turn0 = true;
      box.style.color = "blue";
      box.style.textShadow = "3px 3px 3px blue";
    }

    checkwinner(); // Check if someone won or it's a draw
    box.disabled = true; // Disable the clicked box
  });
});

// Function to check for a win or draw
let checkwinner = () => {
  for (let pattern of winPattern) {
    let pos1val = box[pattern[0]].innerText;
    let pos2val = box[pattern[1]].innerText;
    let pos3val = box[pattern[2]].innerText;

    // Check if all three positions are filled and equal
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        // Update respective win counter
        if (pos1val === "X") {
          xWins++;
          xWinCounter.innerText = xWins;
        } else {
          oWins++;
          oWinCounter.innerText = oWins;
        }
        disableBoxes(); // Disable all boxes after a win
        return;
      }
    }
  }

  // Check if all boxes are filled and no winner → Draw
  let allFilled = [...box].every((b) => b.innerText !== "");
  if (allFilled) {
    draws++;
    drawCounter.innerText = draws;
    disableBoxes(); // Disable all boxes after draw
  }
};

// Function to disable all boxes (after win or draw)
let disableBoxes = () => {
  for (let boxes of box) {
    boxes.disabled = true;
  }
};

// Function to enable all boxes (for a new game)
let enableBoxes = () => {
  for (let boxes of box) {
    boxes.disabled = false;
    boxes.innerText = "";
    boxes.style.color = "";
    boxes.style.textShadow = "";
  }
};

// Function to reset the game board
let resetGame = () => {
  turn0 = true; // Set turn back to X
  enableBoxes(); // Clear board and enable all boxes
};

// Event listener to reset game on button click
reset.addEventListener("click", resetGame);
