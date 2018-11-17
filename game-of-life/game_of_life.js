// @ts-check

const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

const MAX_COLS = 7;
const MAX_ROWS = 7;
const STEP_DELAY_MS = 500;

let pad = null;

lunchpad.initialize().then(lpad => initializeBoard(lpad));

function initializeBoard(lunchpad) {
    pad = lunchpad;

    for (let x = 0; x <= MAX_COLS; x++) {
        pad.setFunctionX(x, Color.BLACK);
        pad.setFunctionY(x, Color.BLACK);
        for (let y = 0; y <= MAX_ROWS; y++) {
            pad.setSquare(x, y, Color.BLACK);
        }
    }
    console.log('Launchpad cleared and ready to go.');

    enableDrawInput();
}

function enableDrawInput() {
  pad
    .on('input', manualToggleDraw)
    .on('functionY', disableDrawInput);

    console.log('Draw some shit, yo!');
    console.log('End input and start game with [A-H] function keys.');
}

function disableDrawInput() {
    pad.removeListener('input', manualToggleDraw);
    pad.removeListener('functionY', disableDrawInput);
    console.log('Drawing disabled.')

    pad.on('functionY', startGame);
    console.log('Start game with [A-H] function keys.')
}

const manualToggleDraw = (x, y) => {
    let newColor = Color.RED;
    if (pad.getSquare(x, y).getCode() === newColor.getCode()) {
        newColor = Color.BLACK;
    }
    pad.setSquare(x, y, newColor);
    console.log('pling!');
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const startGame = async () => {
    pad.removeListener('functionY', startGame);

    console.log('Press again to pause/unpause.');
    let paused = false;
    pad.on('functionY', () => { paused = !paused; });

    while (true) {
        await sleep(STEP_DELAY_MS);
        if (paused) {
            continue;
        }
        console.log('Game loop should go here...');
    }
}
