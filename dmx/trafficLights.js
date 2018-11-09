const Fixture = require('./lib/Fixture');
const getUniverse = require('./lib/getUniverse');

const universe = getUniverse('debug');

const fixture = new Fixture(1, universe);

fixture.brightness(0);
fixture.color('000');

setTimeout(() => fixture.color('f00'), 2000);
setTimeout(() => fixture.color('ff0'), 4000);
setTimeout(() => fixture.color('0f0'), 6000);