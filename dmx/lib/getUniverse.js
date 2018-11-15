const DMX = require('dmx');

const getPort = require('./getPort');

async function getUniverse() {
  const dmx = new DMX();
  
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