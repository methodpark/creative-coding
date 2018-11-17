const serialport = require('serialport');

function getInterfacePort(manufacturer='FTDI') {
  return new Promise((resolve, reject) => {
    serialport.list((error, ports) => {
      if (error) {
        return reject(error);
      }
    
      const port = ports.find(port => port.manufacturer === manufacturer);
      if (port) {
        resolve(port.comName);
      } else {
        reject(new Error(`could not find interface for manufacturer "${manufacturer}"`));
      }
    });
  });
}

module.exports = getInterfacePort;