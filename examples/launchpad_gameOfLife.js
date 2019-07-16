// @ts-check

const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

lunchpad.initialize()
    .then(lpad => initializeBoard(lpad))
    .catch(e => console.error("Error initializing l(a)unchpad:", e));

const MAX_COLS = 8;
const MAX_ROWS = 8;
const STEP_DELAY_MS = 100;
const COLORS = [Color.RED, Color.GREEN, Color.AMBER];

let pad = null;
let board;

const generateEmptyBoard = () => (
    board = Array.from({ length: MAX_ROWS },
        () => Array.from({ length: MAX_COLS }, () => false)
    )
);

function initializeBoard(lunchpad) {
    pad = lunchpad;

    board = generateEmptyBoard();

    for (let x = 0; x < MAX_COLS; x++) {
        pad.setFunctionX(x, Color.BLACK);
        pad.setFunctionY(x, Color.BLACK);
        for (let y = 0; y < MAX_ROWS; y++) {
            pad.setSquare(x, y, Color.BLACK);
        }
    }
    console.log('Launchpad cleared and ready to go.');

    enableDrawInput();
}

function enableDrawInput() {
  pad
    .on('input', manualToggleDraw)
    .on('functionY', startGame);

    console.log('Draw some shit, yo!');
    console.log('End input and start game with [A-H] function keys.');
}

const manualToggleDraw = (x, y) => {
    let newColor = Color.RED;
    board[x][y] = true;
    if (pad.getSquare(x, y).getCode() === newColor.getCode()) {
        newColor = Color.BLACK;
        board[x][y] = false;
    }
    pad.setSquare(x, y, newColor);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const startGame = async () => {
    pad.removeListener('input', manualToggleDraw);
    pad.removeListener('functionY', startGame);

    let paused = false;

    console.log('Press [A-H] again to pause/unpause.');
    pad.on('functionY', () => { paused = !paused; });

    let cycle = 1;

    while (true) {
        await sleep(STEP_DELAY_MS);
        if (paused) { 
            continue;
        }
        cycle++;

        drawBoard(board);

        board = calculateNewBoard(board, cycle);
    }
}

function drawBoard(board) {
    for (let x = 0; x < MAX_COLS; x++) {
        for (let y = 0; y < MAX_ROWS; y++) {
            const generation = board[x][y];
            let color = COLORS[generation % COLORS.length]
            if (generation === 0) {
                color = Color.BLACK
            }
            
            pad.setSquare(x, y, color);
        }
    }
}

function calculateNewBoard(board, cycle) {
    const newBoard = [];

    for (let x = 0; x < board.length; x++) {
        newBoard[x] = Array.from({length: MAX_COLS}, () => 0);
        for (let y = 0; y < board[x].length; y++) {
            const count = countNeighbours(board, x, y);
            const isAlive = board[x][y] > 0

            if (!isAlive) {
                if (count === 3) newBoard[x][y] = cycle;
            } else {
                if (count === 1 || count === 0) newBoard[x][y] = 0;
                if (count === 2 || count === 3) newBoard[x][y] = board[x][y];
                if (count > 3) newBoard[x][y] = 0;
            }
        }
    }

    return newBoard;
}

function countNeighbours(matrix, x, y) {
    let count = 0;
    let size = matrix.length;

    let left = (x == 0) ? size - 1 : x - 1;
    let right = (x == size - 1) ? 0 : x + 1;
    let top = (y == size - 1) ? 0 : y + 1;
    let bottom = (y == 0) ? size - 1 : y - 1;

    if (matrix[left][y]) count++;
    if (matrix[left][top]) count++;
    if (matrix[x][top]) count++;
    if (matrix[right][top]) count++;
    if (matrix[right][y]) count++;
    if (matrix[right][bottom]) count++;
    if (matrix[x][bottom]) count++;
    if (matrix[left][bottom]) count++;

    return count;
}
