const board = document.getElementById("board");
const size = 4;
const startingValue = 2;
const boardArr = [];

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createBoard = () => {
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const pos = i * size + j;
      const cell = `<div class="cell" data-pos="${pos}"></div>`;
      board.innerHTML += cell;

      boardArr.push({ value: 0, pos });
    }
  }
};

const setCell = (pos, value) => {
  const cell = [...document.getElementsByClassName("cell")].find((element) => {
    console.log(element.dataset?.pos);
    if (element.dataset?.pos == pos) {
      return element;
    }
  });
  cell.innerText = value;
  boardArr[pos].value = value;
};

const generateCell = () => {
  const emptyCells = boardArr.filter((element) => {
    return !element.value;
  });
  console.log(emptyCells);
  const index = Math.floor(Math.random() * emptyCells.length);
  console.log(index);
  const cell = emptyCells[index];
  setCell(cell, startingValue);
};

window.onload = () => {
  createBoard();
};
