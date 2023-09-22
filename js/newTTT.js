const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
let currentPlayer = 1
let currentBoard = null
let boardState = Array(9).fill('')

initGame();

document.querySelectorAll('.cells').forEach(cell => {
    cell.addEventListener('click', () => {
        let parent = cell.closest('.boards')
        let isBoardWon = parent.getAttribute('winner') === 'true'
        if (cell.innerHTML === '' && parent.classList.contains('active') && !isBoardWon) {
            cell.innerHTML = currentPlayer === 1 ? 'X' : 'O'
            currentBoard = parent
            console.log(currentBoard);
            
            let result = isWonOrDraw(parent)


            currentPlayer = currentPlayer * -1
            let currentClass = cell.classList[1]
            document.querySelectorAll('.boards').forEach(board => {
                if (!board.classList.contains(currentClass)) {
                    board.classList.remove('active')
                } else if (result) {
                    board.classList.remove('active')
                    let wonCells = parent.querySelectorAll('.cells')
                    wonCells.forEach(cell => {
                        cell.classList.add('cell-disabled')
                    });
                    result = result === 'X' ? `Payer X wins board` : result === 'O' ? 'Player O wins!' : "It's a draw"
                    alert(result)
                    board.classList.add('active')
                  } else {
                    board.classList.add('active')
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
  