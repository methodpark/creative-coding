const DMX = require('dmx');

const getPort = require('./getPort');

const dmx = new DMX();

async function getUniverse() {
  let port = null;
  try {
    port = await getPort();
  } catch (error) {
    console.error('could not determine port, falling back to debug');
    port = 'debug';
  }

  if (port === 'debug') {
    return dmx.addUniverse('demo', null);
  }

  return dmx.addUniverse('demo', 'enttec-usb-dmx-pro', port);
}

module.exports = getUniverse;