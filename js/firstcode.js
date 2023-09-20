//! CURRENT BLOCKERS
//? -BOARD DOESN'T LOCK TO THE SMALLBOARD W/ VALUE OF THE CELL CLICKED
//? -GAME ASSUMES DRAWS BUT DOESN'T ALLOW TO CONTINUE PLAYING
//? -WHEN ITS A DRAW, THE DATA-VALUE OF THE LAST CELL PLAYED BLOCKS
//? THE SMALL BOARD WITH THE CORRESPONDENT VALUE(INDEX)
//? -GAME ASSUMES WINS BUT DOESN'T DISPLAY IT NOR ALLOW TO CONTINUE PLAYING
//? -THE initGAME FUNCTION DOESN'T RESET THE BOARD COMPLETELY WHEN

/*----- constants -----*/
const cells = document.querySelectorAll('.cells');
const smallBoards = document.querySelectorAll('.boards');
const gameStatus = document.querySelector('.status');
const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
const symbols = { '0': null, 'X': 'X', 'O': 'O' };
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Convert winCombos to use data-value attributes instead of indexes
const winCombosWithValues = winCombos.map(combo => combo.map(index => cells[index].getAttribute('data-value')));

/*----- state variables -----*/
let currentPlayer = 'X';
let smallBoardState = Array(9).fill('');
let boardState = Array(81).fill('');
let currentSmallBoard = null;

// calling functions
initGame();

/*----- functions -----*/
function addEventListeners() {
  // to toggle rules
  document.getElementById('toggle-rules').addEventListener('click', toggleRules);
  // To reset game
  playAgain.addEventListener('click', initGame);
}

function toggleRules() {
  rules.forEach(rule => {
    rule.classList.toggle('hidden');
  });
}

// To handle player movement when a cell is clicked
function handleCellClick(cell) {
  const dataValue = cell.getAttribute('data-value');
  const smallBoardIndex = parseInt(dataValue);

  if (boardState[dataValue] === '' && !isGameOver()) {
    cell.textContent = currentPlayer;
    boardState[dataValue] = currentPlayer;
    smallBoardState[dataValue] = currentPlayer;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    currentSmallBoard = smallBoardIndex;

    if (checkWin(currentPlayer, smallBoardState)) {
      gameStatus.textContent = `${currentPlayer} wins the small board!`;
      smallBoards[smallBoardIndex].innerHTML = `${currentPlayer}`;
    } else if (isSmallBoardFull(smallBoardState)) {
      gameStatus.textContent = "It's a draw!";
      smallBoards[smallBoardIndex].innerHTML = null;
    } else {
      gameStatus.textContent = `${currentPlayer}'s Turn`;
    }
  }
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    handleCellClick(cell);
  });
});

function checkWin(player, board) {
  return winCombosWithValues.some(combo => combo.every(value => board[value] === player));
}

function isSmallBoardFull(board) {
  return board.every(cell => cell !== '');
}

function isGameOver() {
  return isSmallBoardFull(boardState) || checkWin('X', smallBoardState) || checkWin('O', smallBoardState);
}

// To initialize / reset game
function initGame() {
  currentPlayer = 'X';
  smallBoardState.fill('');
  boardState.fill('');
  currentSmallBoard = null;
  clearBoard(cells);
  gameStatus.innerHTML = `${currentPlayer}'s Turn`;
  addEventListeners();
}

function clearBoard(boardElements) {
  boardElements.forEach(board => {
    board.textContent = '';
  });
}
