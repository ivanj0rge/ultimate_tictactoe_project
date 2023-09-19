  //!Problems to solve
  //!declare winner
  //!solve clicks to every cell
  //!make jump from one small board to another according to chosen cell index
 
/*----- constants -----*/
const cells = document.querySelectorAll('.cells');
const smallBoards = document.querySelectorAll('.small-board');
const gameStatus = document.querySelector('.status');
const symbols = { '0': null, 'X': 'X', 'O': 'O',};
const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');

/*----- state variables -----*/
let currentPlayer = 'X';
let boardState = [    
    ['', '', '', '', '', '', '', '', ''], // Cell 0 to 8
    ['', '', '', '', '', '', '', '', ''], // Cell 9 to 17
    ['', '', '', '', '', '', '', '', ''], // Cell 18 to 26
    ['', '', '', '', '', '', '', '', ''], // Cell 27 to 35
    ['', '', '', '', '', '', '', '', ''], // Cell 36 to 44
    ['', '', '', '', '', '', '', '', ''], // Cell 45 to 53
    ['', '', '', '', '', '', '', '', ''], // Cell 54 to 62
    ['', '', '', '', '', '', '', '', ''], // Cell 63 to 71
    ['', '', '', '', '', '', '', '', ''], // Cell 72 to 80
];
let smallBoardState = ['', '', '', '', '', '', '', '', ''];
let activeSmallBoard = null;


/*----- cached elements  -----*/



/*----- event listeners -----*/
// To make the Game Rules btn hide and display the rules text
document.getElementById('toggle-rules').addEventListener('click', function() {
    rules.forEach(rule => {
        rule.classList.toggle('hidden');
    });
});

//To reset game
playAgain.addEventListener('click', resetGame);


// To check for a win
function checkWin(player, board) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Convert winCombos to use data-value attributes instead of indexes
    const winCombosWithValues = winCombos.map(combo => combo.map(index => cells[index].getAttribute('data-value')));

    // Use the 'some method to iterate over every winning combo
    // If it finds a combination containing the same player's symbols, it returns true (win)
    return winCombosWithValues.some(combo => combo.every(value => board[value] === player));
}


// To handle player movement when a cell is clicked
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        console.log('cell clicked', index);
        console.log('current player', currentPlayer);
        console.log('cell content before', cell.textContent);
        if (activeSmallBoard === null || activeSmallBoard === index) {
            if (boardState[index] === '' && !isGameOver()) {
                cell.textContent = currentPlayer;
                console.log('cell content after', cell.textContent);
                boardState[index] = currentPlayer;
                smallBoardState[index] = currentPlayer;
                
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                
                if (checkWin(currentPlayer, smallBoardState)) {
                    gameStatus.textContent = `${currentPlayer} wins the small board!`;
                    smallBoards[index].textContent = `${currentPlayer}`
                } else if (isSmallBoardFull(smallBoardState)) {
                    gameStatus.textContent = "It's a draw!";
                    smallBoards[index].textContent = null;
                } else {
                    gameStatus.textContent = `${currentPlayer}'s Turn`;
                    //activeSmallBoard = index; // Update the active small board to the current cell.
                }

            }
        }
    });
});

/*----- functions -----*/


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

// To reset game
function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    smallBoardState = ['', '', '', '', '', '', '', '', ''];
    activeSmallBoard = null;
    gameStatus.textContent = `${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });
}
