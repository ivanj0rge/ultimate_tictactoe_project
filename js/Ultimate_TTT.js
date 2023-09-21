const cells = Array.from(document.querySelectorAll('.cells'));
const smallBoards = document.querySelectorAll('.boards');
const gameStatus = document.querySelector('.status');
const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let currentPlayer = 'X';
let smallBoardState = Array(9).fill(Array(9).fill(''))
console.log(smallBoardState)
let boardState = Array(9).fill('');
console.log(boardState);
let currentSmallBoard = null;
let lastMove = null;
let isFirstMove = true;

initGame();

function addEventListeners() {
  document.getElementById('toggle-rules').addEventListener('click', toggleRules);
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

function clearBoard(boardElements) {
  boardElements.forEach(board => {
    board.textContent = '';
  });
}

function cellClickHandler(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    const smallBoardIndex = Math.floor(cellIndex / 9);
    const cellIndexInBoard = cellIndex % 9; 
    currentSmallBoard = smallBoardIndex;
    lastMove = {cellIndexInBoard, smallBoardIndex};
    
    console.log(`Clicked by ${currentPlayer} - Cell ${cellIndexInBoard}, Board ${currentSmallBoard}`);
    
    if (isValidMove(cellIndexInBoard, smallBoardIndex, cellIndex)) {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerHTML = `${currentPlayer}'s Turn`;
        smallBoardState[currentSmallBoard][cellIndex] = currentPlayer;
    } else{
        gameStatus.innerHTML = `Invalid move - ${currentPlayer}'s Turn`;
    }
    
    
    if (checkSmallBoardWin(currentPlayer, currentSmallBoard)) {
        markSmallBoard(currentPlayer, currentSmallBoard);
    }
    
    /* if (checkSmallBoardDraw(currentSmallBoard)) {
          gameStatus.innerHTML = `Board ${currentSmallBoard} - It's a Draw! - ${currentPlayer}'s Turn`;
        }  
 */ 
  
isFirstMove = false;
cell.removeEventListener('click', cellClickHandler);
  }
  
  function isValidMove(cellIndexInBoard, smallBoardIndex) {
    const isFirstPlay = isFirstMove === true;
    console.log(isFirstPlay);
    const isNextMoveOk = currentSmallBoard === cellIndexInBoard;
    console.log(isNextMoveOk);
    const isCellEmpty = smallBoardIndex[cellIndexInBoard] === '';
    console.log(isCellEmpty);
    //console.log(smallBoardState);
    //console.log(smallBoardState[smallBoardIndex][cellIndexInBoard]);
    const isCellIndexValid = cellIndexInBoard >= 0 && cellIndexInBoard <= 8;

    return isFirstPlay || (isNextMoveOk && isCellEmpty && isCellIndexValid);
}

function checkSmallBoardWin(player, smallBoardIndex) {
    const smallBoard = smallBoardState[smallBoardIndex];
    for (let i = 0; i < winCombos.length; i++) {
        const [a, b, c] = winCombos[i];
        if (smallBoard[a] === player && smallBoard[b] === player && smallBoard[c] === player) {
            return true;
        }
    }
    return false;
}

function checkSmallBoardDraw(smallBoardIndex) {
    const smallBoard = smallBoardState[smallBoardIndex];

    for (let i = 0; i < smallBoard.length; i++) {
        if (smallBoard[i] === '') {
            return false;
        }
    }
    if (checkSmallBoardWin('X', smallBoardIndex) || checkSmallBoardWin('O', smallBoardIndex)) {
        return false;
    }
    return true;
}

function markSmallBoard(player, smallBoardIndex) {
    const cellsInSmallBoard = smallBoards[smallBoardIndex].querySelectorAll('.cells');

    for (let i = 0; i < cellsInSmallBoard.length; i++) {
        cellsInSmallBoard[i].textContent = player;
    }
}

function initGame() {
    currentPlayer = 'X';
   // smallBoardState.fill('');
    boardState.fill('');
    currentSmallBoard = null;
    clearBoard(cells);
    gameStatus.innerHTML = `${currentPlayer}'s Turn`;
    addEventListeners();
}
