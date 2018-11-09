var DMX = require('dmx');

var dmx = new DMX();

function getUniverse(port) {
  if (port === 'debug') {
    return dmx.addUniverse('demo', null);
  }

  dmx.addUniverse('demo', 'enttec-usb-dmx-pro', port);
}

module.exports = getUniverse;