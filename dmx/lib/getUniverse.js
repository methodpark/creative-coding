var DMX = require('dmx');

var dmx = new DMX();

function getUniverse(port, dmxInterface='enttec-usb-dmx-pro') {
  if (port === 'debug') {
    return dmx.addUniverse('demo', null);
  }

  dmx.addUniverse('demo', dmxInterface, port);
}

module.exports = getUniverse;