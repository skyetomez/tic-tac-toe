// win condition

const button = document.getElementsByClassName("start-btn");
const cells = document.getElementsByClassName("cell");

const canva = document.getElementById("canvas");
const width = canva.width;
const height = canva.height;

const num_cells = 9;
const endGameClicks = 9;
var WIN = true;
var flip = false;
var numOfFlips = 0;

var winConditions = {
  row1: "cells[0].dataset.index  === cells[1].dataset.index  &&cells[1].dataset.index  === cells[2].dataset.index ",
  row2: "cells[3].dataset.index  === cells[4].dataset.index  &&cells[4].dataset.index  === cells[5].dataset.index ",
  row3: "cells[6].dataset.index  === cells[7].dataset.index  &&cells[7].dataset.index  === cells[8].dataset.index ",
  col1: "cells[0].dataset.index  === cells[3].dataset.index  && cells[3].dataset.index  === cells[6].dataset.index ",
  col2: "cells[1].dataset.index  === cells[4].dataset.index  &&cells[4].dataset.index  === cells[7].dataset.index ",
  col3: "cells[2].dataset.index  === cells[5].dataset.index  &&cells[5].dataset.index  === cells[8].dataset.index ",
  dia1: "cells[0].dataset.index  === cells[4].dataset.index  &&cells[4].dataset.index  === cells[8].dataset.index ",
  dia2: "cells[2].dataset.index  === cells[4].dataset.index  &&cells[4].dataset.index  === cells[6].dataset.index ",
};

const reset = function _reset() {
  for (let i = 0; i < 9; i++) {
    cells[i].innerHTML = null;
    cells[i].dataset.index = i;
  }
  if (canva.getContext) {
    ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    flip = false;
    WIN = true;
  }
  window.requestAnimationFrame(gameLoop);
};

// Game here

const playGame = function pg() {
  for (let i = 0; i < num_cells; i++) {
    cells[i].addEventListener("click", function () {
      if (flip === true) {
        cells[i].innerHTML = "X";
        cells[i].dataset.index = "X";
        flip = false;
        numOfFlips++;
      } else {
        cells[i].innerHTML = "O";
        cells[i].dataset.index = "O";
        flip = true;
        numOfFlips++;
      }
    });
  }
};

// Game ends

// draw lines

drawlineD1 = function drawd1() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(600, 600);
    ctx.stroke();
  }
};

drawlineD2 = function drawd2() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.lineTo(600, 0);
    ctx.stroke();
  }
};

drawlineV1 = function drawv1() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 600);
    ctx.stroke();
  }
};

drawlineV2 = function drawv2() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 600);
    ctx.stroke();
  }
};

drawlineV3 = function drawv3() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 600);
    ctx.stroke();
  }
};

drawlineH1 = function drawh1() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(600, 100);
    ctx.stroke();
  }
};

drawlineH2 = function drawh2() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(600, 300);
    ctx.stroke();
  }
};

drawlineH3 = function drawh3() {
  if (canva.getContext) {
    const ctx = canva.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(600, 500);
    ctx.stroke();
  }
};

//check win

const checkWin = function ckwin() {
  for (let i = 0; i < num_cells; i++) {
    // rows
    if (eval(winConditions["row1"])) {
      drawlineH1();
      console.log("win");
      WIN = false;
    }
    if (eval(winConditions["row2"])) {
      drawlineH2();
      console.log("win");
      WIN = false;
    }
    if (eval(winConditions["row3"])) {
      drawlineH3();
      console.log("win");
      WIN = false;
    }

    // columns
    if (eval(winConditions["col1"])) {
      drawlineV1();
      console.log("win");
      WIN = false;
    }
    if (eval(winConditions["col2"])) {
      drawlineV2();
      console.log("win");
      WIN = false;
    }
    if (eval(winConditions["col3"])) {
      drawlineV3();
      console.log("win");
      WIN = false;
    }

    // diagonal
    if (eval(winConditions["dia1"])) {
      drawlineD1();
      console.log("win");
      WIN = false;
    }
    if (eval(winConditions["dia2"])) {
      drawlineD2();
      console.log("win");
      WIN = false;
    } else {
      if (numOfFlips == endGameClicks) {
        console.log("game over");
        WIN = false;
      }
    }
  }
};

let secondsPassed;
let oldTimeStamp;
let fps;

const initializeGame = function initgame() {
  for (let i = 0; i < num_cells; i++) {
    cells[i].innerText = null;
  }
  button[0].addEventListener("click", reset);
  playGame();

  window.requestAnimationFrame(gameLoop);
};

gameLoop = function gl(timeStamp) {
  // Calculate the number of seconds passed since the last frame
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Calculate fps
  fps = Math.round(1 / secondsPassed);

  ctx = document.getElementById("canvas").getContext("2d");
  // Draw number to the screen
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 100, 50);
  ctx.font = "15px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("FPS: " + fps, 10, 30);

  checkWin();
  window.requestAnimationFrame(gameLoop);
};

initializeGame();

checkWin();
