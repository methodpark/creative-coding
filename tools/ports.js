const serialport = require('serialport');

serialport.list((error, ports) => {
  if (error) {
    throw error;
  }

  ports.forEach((port) => {
    console.log(`${port.comName}\t${port.pnpId || ''}\t${port.manufacturer || ''}`);
  });
});