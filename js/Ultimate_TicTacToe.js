/*----- constants -----*/
const cells = document.querySelectorAll('.cells');
const smallBoards = document.querySelectorAll('.boards');
const gameStatus = document.querySelector('.status');
const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

/*----- state variables -----*/
let currentPlayer = 'X';
let smallBoardState = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
];
let boardState = Array(9).fill('') ;
let currentSmallBoard = null;
let lastMove = null;

// calling functions
initGame();


/*----- functions -----*/
function addEventListeners() {
  // to toggle rules
  document.getElementById('toggle-rules').addEventListener('click', toggleRules);
  // To reset game
  playAgain.addEventListener('click', initGame);

  cells.forEach(cell => {
    cell.addEventListener('click', cellClickHandler);
  });
}

function toggleRules() {
  rules.forEach(rule => {
    rule.classList.toggle('hidden');
  });
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

//<<<<<<<<<<<<<<<<<<<< CHECK CELL CLICKS >>>>>>>>>>>>>>>>>>>>
function cellClickHandler(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);   
    const smallBoardIndex = Math.floor(cellIndex / 9);
    const cellIndexInBoard = cellIndex % 9;
    currentSmallBoard = smallBoardIndex
    lastMove = {
        cellIndexInBoard,
        smallBoardIndex
    };
    
    console.log(`clicked by ${currentPlayer} cell ${cellIndexInBoard}, board ${currentSmallBoard}`);
//!<<<<<<<<<<<< CHECK THIS IF STATEMENT>>>>>>>>>>>>>>>>>>>>>>>
    if (
        cellIndexInBoard !== -1 && 
        smallBoardState[smallBoardIndex][cellIndexInBoard] === '' && 
        currentSmallBoard === null &&
        cellIndexInBoard >= 0 &&
        cellIndexInBoard <= 80 &&
        lastMove === null &&
        lastMove[cellIndexInBoard] === smallBoardIndex
        );
 //!<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>> 
    cell.textContent = currentPlayer; 
    gameStatus.innerHTML = `${currentPlayer}'s Turn`;
    smallBoardState[currentSmallBoard][cellIndex] = currentPlayer;
        

    if (checkSmallBoardWin(currentPlayer, currentSmallBoard)) {
        markSmallBoard(currentPlayer, currentSmallBoard);
    }
   
    if (checkSmallBoardDraw(currentSmallBoard)) {
        gameStatus.innerHTML = `board ${currentSmallBoard} It\'s a Draw`;      
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    console.log(`same click by ${currentPlayer} cell ${cellIndexInBoard}, board ${currentSmallBoard}`);
    
    cell.removeEventListener('click', cellClickHandler);
  }
   
//<<<<<<<<<< RESTRICTIONS OF MOVEMENT >>>>>>>>>>


  //<<<<<<<<<< SMALL BOARD WIN >>>>>>>>>>
  function checkSmallBoardWin(player, smallBoardIndex) {
    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];
  
      if (
        smallBoardState[smallBoardIndex][a] === player &&
        smallBoardState[smallBoardIndex][b] === player &&
        smallBoardState[smallBoardIndex][c] === player
      ) {
        return true;
      }
    }
    return false;
  }
 
  //<<<<<<<<<< SMALL BOARD DRAW >>>>>>>>>>
  function checkSmallBoardDraw(smallBoardIndex) {
    const smallBoard = smallBoardState[smallBoardIndex];
    return !smallBoard.includes('') && !checkSmallBoardWin('X', smallBoardIndex) && !checkSmallBoardWin('O', smallBoardIndex);
}


   //<<<<<<<<<< MARK SMALL BOARD >>>>>>>>>>
   function markSmallBoard(player, smallBoardIndex) {
    const cellsInSmallBoard = smallBoards[smallBoardIndex].querySelectorAll('.cells');
  
    for (let i = 0; i < cellsInSmallBoard.length; i++) {
        cellsInSmallBoard[i].textContent = player;
    }
}
  