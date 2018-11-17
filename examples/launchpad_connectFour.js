const lunchpad = require('lunchpad');
const wait = require('../lib/wait');
const Color = lunchpad.Color;

const PlayerColors = [Color.RED, Color.GREEN];

class ConnectFour {
    constructor(launchpad) {
        this.launchpad = launchpad;
        this.currentPlayer = 0;

        this.initPlayfield();
    }

    initPlayfield() {
        for (let n = 0; n < 8; n++) {
            this.launchpad.setFunctionX(n, this.getCurrentPlayerColor());
            this.launchpad.setFunctionY(n, Color.BLACK);

            for (let y = 0; y < 8; y++) {
                this.launchpad.setSquare(n, y, Color.BLACK);
            }
        }
    }

    nextPlayer() {
        this.currentPlayer = (++this.currentPlayer % PlayerColors.length);

        for (let x = 0; x < 8; x++) {
            if (this.launchpad.getFunctionX(x) !== Color.BLACK) {
                this.launchpad.setFunctionX(x, this.getCurrentPlayerColor());
            }
        }
    }

    getCurrentPlayerColor() {
        return PlayerColors[this.currentPlayer];
    }

    isFull(x) {
        return (this.getNextEmptySquare(x) === -1);
    }

    getNextEmptySquare(x) {
        for (let y = 0; y < 8; y++) {
            if (this.launchpad.getSquare(x, y) === Color.BLACK) {
                return y;
            }
        }

        return -1;
    }

    setColor(x, y, color) {
        if (x > 7 || y > 7 || x < 0 || y < 0) {
            return false;
        }

        this.launchpad.setSquare(x, y, color);
    }

    getColor(x, y) {
        if (x > 7 || y > 7 || x < 0 || y < 0) {
            return false;
        }

        return this.launchpad.getSquare(x, y);
    }

    getConsecutiveColors(coords, color) {
        for (let i = 0; i < coords.length; i++) {
            const [x, y] = coords[i];

            if (this.getColor(x, y) !== color) {
                return i;
            }
        }

        return coords.length;
    }

    isWinningMove(x, y, color) {
        const horizontal =
            this.getConsecutiveColors([[x, y - 1], [x, y - 2], [x, y - 3]], color) +
            this.getConsecutiveColors([[x, y + 1], [x, y + 2], [x, y + 3]], color) +
            1;

        if (horizontal >= 4) {
            return true;
        }

        const vertical =
            this.getConsecutiveColors([[x - 1, y], [x - 2, y], [x - 3, y]], color) +
            this.getConsecutiveColors([[x + 1, y], [x + 2, y], [x + 3, y]], color) +
            1;

        if (vertical >= 4) {
            return true;
        }

        const diagonal =
            this.getConsecutiveColors([[x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3]], color) +
            this.getConsecutiveColors([[x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]], color) +
            1;

        if (diagonal >= 4) {
            return true;
        }

        return false;
    }

}

let gameFinished = false;

lunchpad
    .initialize()
    .then((launchpad) => {
        let isAnimating = false;
        const connectFour = new ConnectFour(launchpad);

        launchpad
            .on('functionX', async (x) => {
                if (isAnimating || gameFinished || connectFour.isFull(x)) {
                    return;
                }

                isAnimating = true;

                const animationColor = connectFour.getCurrentPlayerColor();
                const emptySquare = connectFour.getNextEmptySquare(x);

                connectFour.nextPlayer();

                for (let y = 7; y >= emptySquare; y--) {
                    connectFour.setColor(x, y + 1, Color.BLACK);
                    connectFour.setColor(x, y, animationColor);

                    await wait(10);
                }

                if (connectFour.isFull(x)) {
                    launchpad.setFunctionX(x, Color.BLACK);
                }

                if (connectFour.isWinningMove(x, emptySquare, animationColor)) {

                    let i = 0;
                    gameFinished = true;

                    // Dirty winning animation
                    while (true) {
                        const color = [animationColor, Color.BLACK][++i % 2];

                        for (let n = 0; n < 8; n++) {
                            launchpad.setFunctionX(n, color);
                            launchpad.setFunctionY(n, color);
                        }

                        await wait(600);
                    }
                }

                isAnimating = false;
            });
    });

