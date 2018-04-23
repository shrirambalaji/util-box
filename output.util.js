const { red, gray, green } = require("chalk");
const output = () => {};
output.error = (...value) => {
	console.error(red(...value));
};

// runs only when the DEBUG env variable is set to true
output.debug = (...value) => {
	if (process.env.DEBUG) console.debug(gray(...value));
};

output.success = (...value) => {
	console.log(green(...value));
};

module.exports = output;
