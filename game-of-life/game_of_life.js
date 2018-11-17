// @ts-check

const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

const MAX_COLS = 8;
const MAX_ROWS = 8;
const STEP_DELAY_MS = 500;

let pad = null;

let board;

lunchpad.initialize().then(lpad => initializeBoard(lpad));

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

    let cycle = 0;

    while (true) {
        await sleep(STEP_DELAY_MS);
        if (paused) { continue; }
        cycle++;

        console.log(`Cycle: ${cycle}`);

        drawBoard(board);

        board = calculateNewBoard(board);
    }
}

function drawBoard(board) {
    console.log('board:', board);
    for (let x = 0; x < MAX_COLS; x++) {
        for (let y = 0; y < MAX_ROWS; y++) {
            const isAlive = board[x][y];
            if (isAlive) {
                pad.setSquare(x, y, Color.RED);
            } else {
                pad.setSquare(x, y, Color.BLACK);
            }
        }
    }
}

function calculateNewBoard(board) {
    const newBoard = [];

    for (let x = 0; x < board.length; x++) {
        newBoard[x] = Array.from({length: MAX_COLS}, () => false);
        for (let y = 0; y < board[x].length; y++) {
            const count = countNeighbours(board, x, y);
            const alive = board[x][y];

            if (!alive) {
                if (count === 3) newBoard[x][y] = true;
            } else {
                if (count === 1 || count === 0) newBoard[x][y] = false;
                if (count === 2 || count === 3) newBoard[x][y] = true;
                if (count > 3) newBoard[x][y] = false;
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

    // console.log(x, y)
    // console.log(left, right, top, bottom);

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
