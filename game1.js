let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let videoContainer = document.querySelector("#video-box");
let winningVideo = document.querySelector("#winning-video");
let winnerText = document.querySelector("#winner-text");
let newGameBtnVideo = document.querySelector("#new-game-video");
const drawContainer = document.querySelector("#draw-box");
const newGameDrawBtn = document.querySelector("#new-game-draw");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

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

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  videoContainer.classList.add("hide");
  winningVideo.pause();
  winningVideo.currentTime = 0;
  
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      }
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was Draw.`;
  msgContainer.classList.remove("hide");
  newGameBtn.classList.add("new-game-btn"); // Add this line to apply styling
  newGameBtn.classList.remove("hide");
  disableBoxes();
  resetBtn.classList.add("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  videoContainer.classList.remove("hide");
  winnerText.innerText = `Congratulations, Winner is ${winner}`;
  winningVideo.play();
  disableBoxes();
  newGameBtn.classList.add("hide"); // Show the New Game button
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

newGameBtn.addEventListener("click", () => {
  resetGame();
  resetBtn.classList.remove("hide"); // Show the Reset button when New Game is clicked
});
resetBtn.addEventListener("click", resetGame);
newGameBtnVideo.addEventListener("click", resetGame);
