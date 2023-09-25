const rules = document.querySelectorAll('#rules p, #rules li');
const playAgain = document.querySelector('.reset');
let currentPlayer = 1;
let currentBoard = null;
let boardState = Array(9).fill('');
let nextGo = false;
let wonBoards = Array(9).fill(0);

initGame();

document.querySelectorAll('.cells').forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerHTML === '' && cell.closest('.boards').classList.contains('active')) {
            cell.innerHTML = currentPlayer === 1 ? 'X' : 'O';
            currentBoard = cell.closest('.boards');
            updateWonBoards();

            currentPlayer = currentPlayer * -1;
            toggleActiveBoards(currentBoard);
        }
    });
});

const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function isWonOrDraw(board) {
    const cells = board.querySelectorAll('.cells');
    const cellValues = Array.from(cells).map(cell => cell.innerHTML);

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[b] === cellValues[c]) {
            return cellValues[a];
        }
    }

    if (cellValues.every(value => value !== '')) {
        return 'Draw';
    }

    return null;
}

function updateWonBoards() {
    const result = isWonOrDraw(currentBoard);
    if (result === 'X' || result === 'O') {
        wonBoards[currentBoard.dataset.boardIndex] = result;
    }
}

function toggleActiveBoards(excludedBoard) {
    const boards = document.querySelectorAll('.boards');
    boards.forEach(board => {
        if (board !== excludedBoard && !board.classList.contains('blocked')) {
            board.classList.add('active');
        } else {
            board.classList.remove('active');
        }
    });
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

    wonBoards = Array(9).fill(0); // Reset won boards
    addEventListeners();
}
