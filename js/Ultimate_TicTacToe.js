//! CURRENT BLOCKERS
//? -BOARD DOESN'T LOCK TO THE SMALLBOARD W/ VALUE OF THE CELL CLICKED
//? -IT DOENS'T ACTUALIZE THE CURRENTSMALLBOARD BEING PLAYED
//? -THE initGAME FUNCTION DOESN'T RESET THE BOARD COMPLETELY

/*----- constants -----*/
const cells = document.querySelectorAll('.cells');
const smallBoards = document.querySelectorAll('.boards');
const gameStatus = document.querySelector('.status');
const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
const winCombos = [];

/*----- state variables -----*/
let currentPlayer = 'X';
let smallBoardState = Array(81).fill('');
let boardState = Array(9).fill('') ;
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

// Add this function to your code to handle cell clicks
function cellClickHandler(event) {
    const cell = event.target;
    console.log(`1st click by ${currentPlayer}`);
    // Check if the cell is in the allowed small board and is empty
    const cellIndex = Array.from(cells).indexOf(cell);
    if (cellIndex === -1 || smallBoardState[cellIndex] !== '' || currentSmallBoard !== null) {
      return; // Cell is not allowed to be clicked
    }
    // Update the cell's text content with the current player's symbol ('X' or 'O')
    cell.textContent = currentPlayer;
    

    
    // Update the small board and overall board state
    gameStatus.innerHTML = `${currentPlayer}'s Turn`;
    smallBoardState[cellIndex] = currentPlayer;
    boardState[cellIndex + (currentSmallBoard * 9)] = currentPlayer;
  
    
    console.log(`2nd click by ${currentPlayer}, cell: ${cellIndex}, board ${currentSmallBoard}`);
    
    if (checkSmallBoardWin(currentPlayer, currentSmallBoard)) {
        markSmallBoard(currentPlayer, currentSmallBoard);
    }
    
    if (checkSmallBoardDraw(currentPlayer, currentSmallBoard)) {
        gameStatus.innerHTML = `board ${currentSmallBoard} It\'s a Draw`;
        
    }
    
    // Toggle the current player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Remove the click event listener from the clicked cell
    cell.removeEventListener('click', cellClickHandler);
  }
  
  // Add a click event listener to each cell
  cells.forEach(cell => {
    cell.addEventListener('click', cellClickHandler);
  });
  
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
    if (symbols.some(symbol => symbol === '')) {
      return false;
    }
   
    if (checkSmallBoardWin('X', smallBoardIndex) || checkSmallBoardWin('O', smallBoardIndex)) {
      return false;
    }
    return true;
  }
   //<<<<<<<<<< MARK SMALL BOARD >>>>>>>>>>
   function markSmallBoard(player, smallBoardIndex) {
    const cellsInSmallBoard = cells;
  
    for (let i = smallBoardIndex * 9; i < (smallBoardIndex + 1) * 9; i++) {
        cellsInSmallBoard[i].textContent = player;
    }
  }
  
//<<<<<<<<<< CHECK GAME WIN >>>>>>>>>>
function checkGameWin(player) {
    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];
      if (
        boardState[a] === player &&
        boardState[b] === player &&
        boardState[c] === player
      ) {
        // Handle game win here
        return true;
      }
    }
    return false;
  }
  


  //<<<<<<<<<< WINNING COMBOS >>>>>>>>>>

  // Rows
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    winCombos.push([i * 9 + j, i * 9 + j + 1, i * 9 + j + 2]);
  }
}

// Columns
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    winCombos.push([i + j * 9, i + (j + 1) * 9, i + (j + 2) * 9]);
  }
}

// Diagonals (top-left to bottom-right)
for (let i = 0; i < 9; i++) {
  winCombos.push([i * 9 + i, (i + 1) * 9 + i + 1, (i + 2) * 9 + i + 2]);
}

// Diagonals (top-right to bottom-left)
for (let i = 0; i < 9; i++) {
  winCombos.push([i * 9 + (8 - i), (i + 1) * 9 + (7 - i), (i + 2) * 9 + (6 - i)]);
}
