const serialport = require('serialport');

function getInterfacePort() {
  return new Promise((resolve, reject) => {
    serialport.list((error, ports) => {
      if (error) {
        return reject(error);
      }
    
      const port = ports.find(port => {
        return port.manufacturer === 'enttec';
      })

      if (port) {
        resolve(port);
      } else {
        reject();
      }
    });
  });
}

module.exports = getInterfacePort;