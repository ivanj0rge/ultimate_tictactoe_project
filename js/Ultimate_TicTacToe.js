/*----- constants -----*/
const cells = document.querySelectorAll('.cells');
const smallBoards = document.querySelectorAll('.small-board');
const colors = { '0': 'white', 'X': 'blue', 'O': 'orange',};
const status = document.querySelector('.status');

/*----- state variables -----*/
let currentPLayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let smallBoardState = ['', '', '', '', '', '', '', '', ''];
let activeSmallBoard = null;


/*----- cached elements  -----*/
const playAgain = document.querySelector('.reset');



/*----- event listeners -----*/
// To make the Game Rules btn hide and display the rules text
document.getElementById('toggle-rules').addEventListener('click', function() {
    const rules = document.querySelectorAll('#rules p, #rules li');
    rules.forEach(rule => {
        rule.classList.toggle('hidden');
    });
});

// To handle player movement when a cell is clicked
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        playerMove(activeSmallBoard, index);
    });
});


/*----- functions -----*/
// To check for a win
function checkWin(player, board) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    // Use the 'some method to iterate over every winning combo
    //if it finds a combination containing the same player's symbols it returns true (win)
    return winCombos.some(combo => combo.every(index => board[index] === player));
}

// To check if small board is full
function isSmallBoardFull(board) {
    // Again use the 'every method to check every cell in the board
    //if the cells are filled, it returns true, if not, returns false
    return board.every(cell => cell !== '');
}

// To check if the game is over
function isGameOver() {
    // Call isSmallBoardFull to check if all small boards are full
    // Call checkWin (player, smallBoardState) to check if X or O has won the small board
    // If any of these conditions are met, it returns true, if not, false
    return isSmallBoardFull(boardState) || checkWin('X', smallBoardState) || checkWin('O', smallBoardState);
}
