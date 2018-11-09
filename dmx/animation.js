const DMX = require('dmx');

const Fixture = require('./lib/Fixture');
const getUniverse = require('./lib/getUniverse');

const universe = getUniverse('debug');

const fixture = new Fixture(1, universe);

fixture.brightness(0);
fixture.color('#f00');

new DMX.Animation()
  .add(fixture.generate(1, 'f00'), 3000, {easing: 'inSine'})
  .add(fixture.generate(0, 'f00'), 3000, {easing: 'outElastic'})
  .add(fixture.generate(1, 'f00'), 3000, {easing: 'inBounce'})
  .run(universe, () => console.log('animation is done'))