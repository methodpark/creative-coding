const DMX = require('dmx');

const getPort = require('./getPort');

const deviceMap = {
  usbPro: {
    manufacturer: 'FTDI',
    driver: 'enttec-usb-dmx-pro'
  }
};

async function getUniverse(deviceName, universeName='demo') {
  const dmx = new DMX();
  
  let port = null;
  let driver = null;
  if (deviceName === 'debug') {
    port = 'debug';
  } else {
    const device = deviceMap[deviceName];
    if (!device) {
      throw new Error(`could not identify device "${deviceName}"`);
    }

    driver = device.driver;
    port = await getPort(device.manufacturer);
  }

  return dmx.addUniverse(universeName, driver, port);
}

module.exports = getUniverse;