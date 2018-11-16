const DMX = require('dmx');

const Fixture = require('../lib/Fixture');
const getUniverse = require('../lib/getUniverse');

getUniverse('debug').then(universe => {
  const fixture = new Fixture(1, universe);

  fixture.brightness(0);

  new DMX.Animation()
    .add(fixture.generate(1, '#f00'), 1000)
    .add(fixture.generate(1, 'green'), 1000)
    .add(fixture.generate(1, 'red'), 1000)
    .run(universe, () => console.log('animation is done'));
});