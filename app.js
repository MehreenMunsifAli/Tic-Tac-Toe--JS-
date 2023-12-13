let boxes = document.querySelectorAll(".box"); // to access all box classes
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
console.log(winPatterns);

const resetGame = () => {
  turnO = true;
  enableBoxes();
  count = 0;
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#0b6e4f";
      turnO = false;
    } else {
        box.innerText = "X";
        box.style.color = "#eb6424";
      turnO = true;
    }
    box.disabled = true; // to disable box from changing its value once clicked
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations! the winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = "Game was a draw! Start new game";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    // condition to check box is not empty
    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      // condition to check if all 3 boxes have the same value
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        console.log("Winner", pos1Value);
        showWinner(pos1Value);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);
