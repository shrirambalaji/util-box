const signale = require("signale");
const stopClock = () => {};

stopClock.start = message => {
  signale.time(message);
};

stopClock.stop = message => {
  signale.timeEnd(message);
};

module.exports = stopClock;
