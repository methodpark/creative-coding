const DMX = require('dmx');
const lunchpad = require('lunchpad');

const LunchColor = lunchpad.Color;

const Fixture = require('../lib/Fixture');
const getUniverse = require('../lib/getUniverse');
const wait = require('../lib/wait');


Promise.all([
  lunchpad.initialize(),
  getUniverse('usbPro')
])
.then(([launchpad, universe]) => initialize(launchpad, universe))
.catch(error => {
  console.log(`could not initialize: "${error.message}`);
  process.exit();
});

function initialize(launchpad, universe) {
  const fixture = new Fixture(1, universe);

  fixture.brightness(1).color('fuchsia');

  launchpad.setSquare(0, 0, LunchColor.RED);
  launchpad.setSquare(1, 0, LunchColor.AMBER);
  launchpad.setSquare(2, 0, LunchColor.GREEN);

  launchpad.setSquare(0, 1, LunchColor.RED);
  launchpad.setSquare(1, 1, LunchColor.RED);
  launchpad.setSquare(2, 1, LunchColor.RED);

  runLight(launchpad);
  blinky(launchpad, 5, 4, LunchColor.AMBER);

  let activeAnimation = null;
  launchpad
    .on('input', (x, y) => {
      if (activeAnimation) activeAnimation.stop();

      if (y === 0) colorHandle(x);
      if (y === 1) brightnessHandle(x);
    });

  function colorHandle(x) {
    let color = null;
    if (x === 0) {
      color = 'red';
    } else if (x === 1) {
      color = 'yellow';
    } else if (x === 2) {
      color = 'green';
    }

    activeAnimation = new DMX.Animation()
      .add(fixture.generate(1, color), 1000, {easing: 'outBounce'});

    activeAnimation.run(universe, () => {
      activeAnimation = null;
    });
  }

  function brightnessHandle(x) {
    if (x == 0) {
      activeAnimation = new DMX.Animation()
        .add(fixture.generate(0), 2000, {easing: 'inCirc'})
        .add(fixture.generate(1), 2000, {easing: 'inCirc'});
    } else if (x == 1) {
      activeAnimation = new DMX.Animation()
        .add(fixture.generate(0), 2000, {easing: 'inCirc'});
    } else if (x == 2) {
      activeAnimation = new DMX.Animation()
        .add(fixture.generate(1), 2000, {easing: 'inCirc'});
    }

    activeAnimation.run(universe, () => {
      activeAnimation = null;
    });
  }
}

async function runLight(launchpad) {
  let currentRunLight = 0;
  while(true) {
    for (let x = 0; x <= 7; x++) {
      launchpad.setSquare(x, 7, LunchColor.BLACK);
    }
  
    launchpad.setSquare(currentRunLight, 7, LunchColor.GREEN);
    currentRunLight = (currentRunLight + 1) % 8;
    await wait(300);
  }
}

async function blinky(launchpad, x, y, color) {
  let currentState = true;
  while (true) {
    let myColor = LunchColor.BLACK;
    if (currentState) {
      myColor = color;
    }

    launchpad.setSquare(x, y, myColor);
    currentState = !currentState;
    await wait(1000);
  }
}