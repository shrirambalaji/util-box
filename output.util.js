const signale = require("signale");
const outputUtil = () => {};
outputUtil.error = (...value) => {
  signale.error(...value);
};

// runs only when the DEBUG env variable is set to true
outputUtil.debug = (...value) => {
  if (process.env.DEBUG) signale.debug(...value);
};

outputUtil.success = (...value) => {
  signale.success(...value);
};

module.exports = outputUtil;
