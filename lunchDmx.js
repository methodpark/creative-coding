const DMX = require('dmx');
const lunchpad = require('lunchpad');
const Color = require('color');

const LunchColor = lunchpad.Color;

const Fixture = require('./dmx/lib/Fixture');
const getUniverse = require('./dmx/lib/getUniverse');

const universe = getUniverse('debug');

const fixture = new Fixture(1, universe);

lunchpad.initialize().then(launchpad => {
  launchpad.setSquare(0, 0, LunchColor.RED);
  launchpad.setSquare(1, 0, LunchColor.AMBER);
  launchpad.setSquare(2, 0, LunchColor.GREEN);

  let activeAnimation = null;
  launchpad
    .on('input', (x, y) => {
      if (activeAnimation) {
        activeAnimation.stop();
      }

      let color = null;
      if (x === 0) {
        color = Color('red');
      } else if (x === 1) {
        color = Color('yellow');
      } else if (x === 2) {
        color = Color('green');
      }

      activeAnimation = new DMX.Animation()
        .add(fixture.generate(1, color), 2000);

      activeAnimation.run(universe, () => {
        activeAnimation = null;
      });
    });
});