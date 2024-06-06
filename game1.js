let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let videoContainer = document.querySelector("#video-box");
let winningVideo = document.querySelector("#winning-video");
let winnerText = document.querySelector("#winner-text");
let newGameBtnVideo = document.querySelector("#new-game-video");

let turnO = true; // playerX, playerO
let count = 0; // To Track Draw

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
  newGameBtn.classList.remove("relative-position");
  newGameBtnVideo.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      turnO = !turnO;
      box.disabled = true;
      count++;

      if (checkWinner()) {
        return;
      }

      if (count === 9) {
        gameDraw();
      }
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was Draw.`;
  msgContainer.classList.remove("hide");
  newGameBtn.classList.remove("hide");
  disableBoxes();
  resetBtn.classList.add("hide");
  newGameBtn.classList.add("relative-position");
  handleGameOutcome('draw');
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  videoContainer.classList.remove("hide");
  winnerText.innerText = `Congratulations, Winner is ${winner}`;
  winningVideo.play();
  disableBoxes();
  newGameBtn.classList.add("hide");
  newGameBtnVideo.classList.remove("hide");
  handleGameOutcome('win');
};

const checkWinner = () => {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
      showWinner(boxes[a].innerText);
      return true;
    }
    return false;
  });
};

newGameBtn.addEventListener("click", () => {
  resetGame();
  resetBtn.classList.remove("hide");
});

resetBtn.addEventListener("click", resetGame);
newGameBtnVideo.addEventListener("click", resetGame);

function handleGameOutcome(outcome) {
  if (outcome === 'win') {
    newGameBtnVideo.classList.remove('hide');
  } else if (outcome === 'draw') {
    newGameBtn.classList.remove('hide');
  }
}
