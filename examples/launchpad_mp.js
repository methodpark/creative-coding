const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

lunchpad.initialize().then(launchpad => drawing(launchpad))

const shape = [
    [true, true, true,  true,  true,  true,  true,  true,],
    [true,true, false, false, true,  true,  true,  true, ],
    [true,true, true,  false, false, true,  true,  true, ],
    [true,true, true,  true,  false, false, true,  true, ],
    [true,true, true,  true,  false, false, true,  true, ],
    [true,true, true,  false,  false, true, true,  true, ],
    [true,true, false, false, true,  true,  true,  true, ],
    [true,true, true,  true,  true,  true,  true,  true, ],
]


function drawing(launchpad, inverted = false) {
    paint(launchpad, inverted);
    
    setTimeout(() => drawing(launchpad, !inverted), 50 + Math.random() * 200);
}

function paint(launchpad, invert = false) {
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape.length; x++) {
            const entry = shape[y][x];
            let color = invert ? Color.BLACK : Color.AMBER;

            if (entry) {
                color = invert ? Color.AMBER : Color.BLACK;
            }

            launchpad.setSquare(x, y, color);
        }
    }
}