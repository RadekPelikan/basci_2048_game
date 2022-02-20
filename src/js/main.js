const board = document.getElementById("board");
const size = 4;
const startingValue = 2;
const boardArr = [];

let isMirrored = false;
let isRotated = false;

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createBoard = () => {
  board.innerHTML = "";
  boardArr.length = 0;
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const cell = `<div class="cell" data-pos="${j}|${i}"></div>`;
      board.innerHTML += cell;

      row.push(0);
    }
    boardArr.push(row);
  }
};

const updateBoard = (newBoard) => {
  newBoard.forEach((row, y) => {
    row.forEach((element, x) => {
      boardArr[y][x] = element;
    });
  });
};

const renderBoard = () =>  {
  boardArr.forEach((row, y) => {
    row.forEach((element, x) => {
      renderCell(x, y, element);
    });
  });

}

const renderCell = (x, y, value) => {
  const cell = [...document.getElementsByClassName("cell")].find((element) => {
    if (element.dataset?.pos == `${x}|${y}`) {
      return element;
    }
  });
  cell.innerText = value || "";
  boardArr[y][x] = value;
};

const generateCell = () => {
  const emptyCells = boardArr
    .flat()
    .map((element, index) => (element ? null : index))
    .filter((element) => element !== null);

  const cellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const x = cellIndex % size;
  const y = Math.floor(cellIndex / size);
  renderCell(x, y, startingValue);
  return emptyCells;
};

const handleLost = () => {
  alert("prohrals");
  createBoard();
};

const step = () => {
  let newBoard;
  newBoard = slide();
  newBoard = combine(newBoard);
  newBoard = slide(newBoard);

  updateBoard(newBoard);
  generateCell();
};

const slide = (oldBoard) => {
  oldBoard = oldBoard || [...boardArr];
  const newBoard = oldBoard.map((row) => {
    row = row.filter((element) => element);
    return row.concat(Array(size - row.length).fill(0));
  });
  return newBoard;
};

const combine = (oldBoard) => {
  oldBoard = oldBoard || [...boardArr];
  const newBoard = oldBoard.map((row, y) => {
    row.forEach((element, x) => {
      if (element != row[x + 1]) return;
      row[x] += row[x + 1];
      row[x + 1] = 0;
    });
    return row;
  });
  return newBoard;
};

const mirrorBoard = () => {
  return boardArr.map((row) => {
    return row.reverse();
  });
};

const rotateBoard = (n) => {
  if (!n) n = 1;
  const newBoard = [...boardArr];
  for (let i = 0; i < n; i++) {
    console.log(i);
    newBoard.forEach((row, y) => {
      row.forEach((element, x) => {
        newBoard[y][x] = boardArr[y][x];
      });
    });
  }
  console.table(boardArr);
  console.table(newBoard);
  return newBoard;
};

const slideDown = () => {
  mirrorBoard();
  rotateBoard();
  isMirrored = true;
  isRotated = true;
};

const slideRight = () => {
  mirrorBoard();
  isMirrored = true;
};

const slideUp = () => {
  rotateBoard();
  isRotated = true;
};

document.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 65:
    case 37:
      // By default it slides to left
      break;
    case 83:
    case 40:
      slideDown();
      break;
    case 68:
    case 39:
      slideRight();
      break;
    case 87:
    case 38:
      slideUp();
      break;
    default:
      return;
  }
  step();
  if (isMirrored) (isMirrored = false) ||mirrorBoard();
  if (isRotated) (isRotated = false) ||rotateBoard(3);
  renderBoard();
});

window.onload = () => {
  createBoard();
};
