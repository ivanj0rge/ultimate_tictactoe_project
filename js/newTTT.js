const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
let currentPlayer = 1
let currentBoard = null
let boardState = Array(9).fill('')
let nextGo = false

initGame();

document.querySelectorAll('.cells').forEach(cell => {
    cell.addEventListener('click', () => {
      console.log(cell.getAttribute('data-value'));
        let parent = cell.closest('.boards')
        if (cell.innerHTML === '' && parent.classList.contains('active')) {
            cell.innerHTML = currentPlayer === 1 ? 'X' : 'O'
            currentBoard = parent          
            
            currentPlayer = currentPlayer * -1
            let currentClass = cell.classList[1]
            
            let boards = document.querySelectorAll('.boards')
            boards.forEach(board => {
                if (!board.classList.contains(currentClass) && nextGo === false) {
                    board.classList.remove('active')
                }else {
                    board.classList.add('active')
                }

                let result = isWonOrDraw(currentBoard);

                if (result) {
                  currentBoard.classList.add('blocked')
                    let wonCells = parent.querySelectorAll('.cells')
                        wonCells.forEach(cell => {
                            cell.classList.add('cell-disabled')
                        })                    
                    }

                  if (isWonOrDraw(board) && board.classList.contains(currentClass)) {
                    nextGo = true
                  chooseOtherBoard();
                  }
                })
                nextGo = false
            }
            let gameResult = isGameWonOrDraw();
            if (gameResult) {
              gameResult = gameResult === 'X' ? `Payer X wins board` : result === 'O' ? 'Player O wins!' : "It's a draw"  
              alert(gameResult);
            }
        })
})


const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


function isWonOrDraw(board) {
    const cells = board.querySelectorAll('.cells')
    const cellValues = Array.from(cells).map(cell => cell.innerHTML)
    
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[b] === cellValues[c]) {
          alert(`${cellValues[a]} wins the board!`);  
          return cellValues[a]
        }
    }
        if (cellValues.every(value => value !== '')) {
          alert('It\'s a draw!');  
          return 'Draw'
        }
        return null
}

function isGameWonOrDraw() {
    for (const combo of winCombos) {
      const [a, b, c] = combo;
  
      const boardA = boardState[a];
      const boardB = boardState[b];
      const boardC = boardState[c];
  
      // Check if a player has won the game
      if (boardA && boardA === boardB && boardB === boardC) {
        return boardA;
      }
    }

  if (boardState.every(value => value !== '')) {
      return 'Draw';
  }

  return null;
}

function chooseOtherBoard() {
  const boards = document.querySelectorAll('.boards');
  const activeBoardClass = 'active';
  
  boards.forEach(board => {

    if (board !== currentBoard && !board.classList.contains('blocked')) {
      board.classList.add(activeBoardClass)
    } else {
      board.classList.remove(activeBoardClass)
    }
  })
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
    currentPlayer = 1;
    currentBoard = null;

    document.querySelectorAll('.cells').forEach(cell => {
      cell.innerHTML = '';
    });
  
    document.querySelectorAll('.cell-disabled').forEach(cell => {
      cell.classList.remove('cell-disabled');
    });
  
    document.querySelectorAll('.boards').forEach(board => {
      board.classList.add('active');
      board.classList.remove('blocked');
    });
    addEventListeners();
  }
  