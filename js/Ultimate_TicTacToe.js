  //!Problems to solve
  //!declare winner
  //!solve clicks to every cell
  //!make jump from one small board to another according to chosen cell

    

/*----- constants -----*/
const cells = document.querySelectorAll('.cells');
const smallBoards = document.querySelectorAll('.small-board');
const gameStatus = document.querySelector('.status');
const symbols = { '0': null, 'X': 'X', 'O': 'O',};
const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');

/*----- state variables -----*/
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
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


// To handle player movement when a cell is clicked
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (activeSmallBoard === null || activeSmallBoard === index) {
            if (boardState[index] === '' && !isGameOver()) {
                cell.textContent = currentPlayer;
                boardState[index] = currentPlayer;
                smallBoardState[index] = currentPlayer;
                
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                
                if (checkWin(currentPlayer, smallBoardState)) {
                    gameStatus.textContent = `${currentPlayer} wins the small board!`;
                } else if (isSmallBoardFull(smallBoardState)) {
                    gameStatus.textContent = "It's a draw!";
                } else {
                    gameStatus.textContent = `${currentPlayer}'s Turn`;
                    //activeSmallBoard = index; // Update the active small board to the current cell.
                }

            }
        }
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
