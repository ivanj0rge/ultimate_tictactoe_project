const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
let currentPlayer = 1
let currentBoard = null
let boardState = Array(9).fill('')

initGame();

document.querySelectorAll('.cells').forEach(cell => {
    cell.addEventListener('click', () => {
      console.log(cell.getAttribute('data-value'));
        let parent = cell.closest('.boards')
        if (cell.innerHTML === '' && parent.classList.contains('active')) {
            cell.innerHTML = currentPlayer === 1 ? 'X' : 'O'
            currentBoard = parent
            console.log(currentBoard);
            
            let result = isWonOrDraw(parent)


            currentPlayer = currentPlayer * -1
            let currentClass = cell.classList[1]
            
            let boards = document.querySelectorAll('.boards')
            boards.forEach(board => {
                if (!board.classList.contains(currentClass)) {
                    board.classList.remove('active')
                }else {
                    board.classList.add('active')
                }

                if (isWonOrDraw(currentBoard)) {
                  currentBoard.classList.add('blocked')
                    let wonCells = parent.querySelectorAll('.cells')
                        wonCells.forEach(cell => {
                            cell.classList.add('cell-disabled')
                        })
                result = result === 'X' ? `Payer X wins board` : result === 'O' ? 'Player O wins!' : "It's a draw"  
                    }

                  if (isWonOrDraw(board) && board.classList.contains(currentClass)) {
                  chooseOtherBoard();
                  }
                })

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
            return cellValues[a]
        }
    }
        if (cellValues.every(value => value !== '')) {
            return 'Draw'
        }
        return null
}

function isGameWonOrDraw() {
  for (const combo of winCombos) {
      const [a, b, c] = combo;
      const boardValues = boardState.slice(a, a + 3);
      if (boardValues[0] && boardValues[0] === boardValues[1] && boardValues[1] === boardValues[2]) {
          return boardValues[0];
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

    if (board.getAttribute('data-value') !== currentBoard.getAttribute('data-value') && !board.classList.contains('blocked')) {
      board.classList.add(activeBoardClass)

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
  