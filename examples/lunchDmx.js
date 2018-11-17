const DMX = require('dmx');
const lunchpad = require('lunchpad');
const Color = require('color');

const LunchColor = lunchpad.Color;

const Fixture = require('../lib/Fixture');
const getUniverse = require('../lib/getUniverse');


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

  launchpad.setSquare(0, 7, LunchColor.RED);
  launchpad.setSquare(1, 7, LunchColor.RED);
  launchpad.setSquare(2, 7, LunchColor.RED);

  let activeAnimation = null;
  launchpad
    .on('input', (x, y) => {
      if (activeAnimation) {
        activeAnimation.stop();
      }

      if (y === 0) {
        colorHandle(x);
      }

      if (y === 7) {
        brightnessHandle(x);
      }
    });

  function colorHandle(x) {
    let color = null;
    if (x === 0) {
      color = Color('red');
    } else if (x === 1) {
      color = Color('yellow');
    } else if (x === 2) {
      color = Color('green');
    }

    activeAnimation = new DMX.Animation()
      .add(fixture.generate(1, color), 2000, {easing: 'outBounce'});

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