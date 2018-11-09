const DMX = require('dmx');
const lunchpad = require('lunchpad');
const Color = lunchpad.Color;


const Fixture = require('./dmx/lib/Fixture');
const getUniverse = require('./dmx/lib/getUniverse');

const universe = getUniverse('debug');

const fixture = new Fixture(1, universe);

lunchpad.initialize().then(launchpad => {
  launchpad.setSquare(0, 0, Color.RED);
  launchpad.setSquare(1, 0, Color.AMBER);
  launchpad.setSquare(2, 0, Color.GREEN);

  let activeAnimation = null;
  launchpad
    .on('input', (x, y) => {
      if (activeAnimation) {
        activeAnimation.stop();
      }

      let color = null;
      if (x === 0) {
        color = 'f00';
      } else if (x === 1) {
        color = 'f0f';
      } else if (x === 2) {
        color = '0ff';
      }

      activeAnimation = new DMX.Animation()
        .add(fixture.generate(1, color), 2000);

      activeAnimation.run(universe, () => {
        activeAnimation = null;
      });
    });
});