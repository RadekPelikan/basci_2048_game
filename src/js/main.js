const board = document.getElementById("board");
const size = 4;
const startingValue = 2;
const boardArr = [];
const KEYS = ["ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowUp", "KeyA", "KeyS", "KeyD", "KeyW"]

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createBoard = () => {
  board.innerHTML = "";
  boardArr.length = 0;
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
  if (!emptyCells.length) {
    handleLost();
    return;
  }
  const index = Math.floor(Math.random() * emptyCells.length);

  const cell = emptyCells[index];
  setCell(cell.pos, startingValue);
};

const handleLost = () => {
  alert("prohrals")
  createBoard();
}

const canMoveCell = (cell, distance) => {
  return cell.pos != board[cell.pos + distance].pos
}

const moveCell = (cell, distance) => {
  cell.pos += distance;
  board[]
}

const slideLeft = () => {
  boardArr.forEach(cell => {
    for (let i = 1; i < size; i++) {
      if (canMoveCell(cell, -i)) {
        
        continue;
      };

    }
  })

}

const slideDown = () => {

}

const slideRight = () => {

}

const slideUp = () => {

}


document.body.addEventListener("keypress", (e) => {
  if (!KEYS.includes(e.code)) return;
  
  generateCell()
  switch(e) {
    case KEYS[0]:
    case KEYS[4]:
      slideLeft();
      break;
    case KEYS[1]:
    case KEYS[5]:
      slideDown();
      break;
    case KEYS[2]:
    case KEYS[6]:
      slideRight();
      break;
    case KEYS[3]:
    case KEYS[7]:
      slideUp();
      break;
  }
})




window.onload = () => {
  createBoard();
};

