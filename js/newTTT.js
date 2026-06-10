const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let currentPlayer = 'X';
let currentBoard = null;
let boardState = Array(9).fill('');

initGame();
addEventListeners();

document.querySelectorAll('.cells').forEach(cell => {
  cell.addEventListener('click', () => {
    const parentBoard = cell.closest('.boards');

    if (
      cell.innerHTML !== '' ||
      !parentBoard.classList.contains('active') ||
      parentBoard.classList.contains('blocked')
    ) {
      return;
    }

    cell.innerHTML = currentPlayer;
    currentBoard = parentBoard;

    const boardResult = isWonOrDraw(currentBoard);

    if (boardResult) {
      finishSmallBoard(currentBoard, boardResult);
    }

    const gameResult = isGameWonOrDraw();

    if (gameResult) {
      endGame(gameResult);
      return;
    }

    const targetClass = cell.classList[1];
    activateNextBoard(targetClass);

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  });
});

function isWonOrDraw(board) {
  const cells = board.querySelectorAll('.cells');
  const cellValues = Array.from(cells).map(cell => cell.innerHTML);

  for (const combo of winCombos) {
    const [a, b, c] = combo;

    if (
      cellValues[a] &&
      cellValues[a] === cellValues[b] &&
      cellValues[b] === cellValues[c]
    ) {
      return cellValues[a];
    }
  }

  if (cellValues.every(value => value !== '')) {
    return 'Draw';
  }

  return null;
}

function finishSmallBoard(board, result) {
  const boards = Array.from(document.querySelectorAll('.boards'));
  const boardIndex = boards.indexOf(board);

  boardState[boardIndex] = result;
  board.classList.add('blocked');

  board.querySelectorAll('.cells').forEach(cell => {
    cell.classList.add('cell-disabled');
  });

  if (result === 'Draw') {
    alert("Small board is a draw!");
  } else {
    alert(`${result} wins the small board!`);
  }
}

function isGameWonOrDraw() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;

    const boardA = boardState[a];
    const boardB = boardState[b];
    const boardC = boardState[c];

    if (
      boardA &&
      boardA !== 'Draw' &&
      boardA === boardB &&
      boardB === boardC
    ) {
      return boardA;
    }
  }

  if (boardState.every(value => value !== '')) {
    return 'Draw';
  }

  return null;
}

function activateNextBoard(targetClass) {
  const boards = document.querySelectorAll('.boards');

  boards.forEach(board => {
    board.classList.remove('active');
  });

  const targetBoard = document.querySelector(`.boards.${targetClass}`);

  if (targetBoard && !targetBoard.classList.contains('blocked')) {
    targetBoard.classList.add('active');
  } else {
    chooseOtherBoard();
  }
}

function chooseOtherBoard() {
  const boards = document.querySelectorAll('.boards');

  boards.forEach(board => {
    if (!board.classList.contains('blocked')) {
      board.classList.add('active');
    } else {
      board.classList.remove('active');
    }
  });
}

function endGame(result) {
  if (result === 'X') {
    alert('Player X wins the game!');
  } else if (result === 'O') {
    alert('Player O wins the game!');
  } else {
    alert("It's a draw!");
  }

  document.querySelectorAll('.boards').forEach(board => {
    board.classList.remove('active');
    board.classList.add('blocked');
  });
}

function addEventListeners() {
  document.getElementById('toggle-rules').addEventListener('click', toggleRules);
  playAgain.addEventListener('click', initGame);
}

function toggleRules() {
  rules.forEach(rule => {
    rule.classList.toggle('hidden');
  });
}

function initGame() {
  currentPlayer = 'X';
  currentBoard = null;
  boardState = Array(9).fill('');

  document.querySelectorAll('.cells').forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('cell-disabled');
  });

  document.querySelectorAll('.boards').forEach(board => {
    board.classList.add('active');
    board.classList.remove('blocked');
  });
}
