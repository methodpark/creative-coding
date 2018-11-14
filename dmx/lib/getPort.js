const serialport = require('serialport');

function getInterfacePort() {
  return new Promise((resolve, reject) => {
    serialport.list((error, ports) => {
      console.log(ports, error)
      if (error) {
        return reject(error);
      }
    
      const port = ports.find(port => {
        return port.manufacturer === 'FTDI';
      })

      if (port) {
        resolve(port.comName);
      } else {
        reject();
      }
    });
  });
}

module.exports = getInterfacePort;