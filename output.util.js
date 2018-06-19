const chalk = require('chalk');
const figures = require('figures');
const outputUtil = () => {};
const config = {
	error: {
		badge: figures.cross,
		color: 'redBright',
		label: 'Error'
	},
	success: {
		badge: figures.tick,
		color: 'greenBright',
		label: 'Success'
	},
	debug: {
		badge: figures('●'),
		color: 'blueBright',
		label: 'Debug'
	},
	timerStart: {
		badge: figures('▶'),
		color: 'cyanBright',
		label: 'Started Timer'
	},
	timerStop: {
		badge: figures.square,
		color: 'magentaBright',
		label: 'Stopped'
	},
	lightGrey: chalk.hex('#828794')
};

function _prefix(prefix) {
	const type = config[prefix];
	return ` ${chalk[type.color](` ${type.badge}`)}  ${chalk[type.color](type.label)}`;
}

function arrayify(x) {
	return Array.isArray(x) ? x : [ x ];
}

outputUtil.error = (...value) => {
	let errValue;
	if (value[0] instanceof Error && value[0].stack) {
		let arr = [];
		const [ name, ...rest ] = value[0].stack.split('\n');
		arr.push(config['lightGrey'](name));
		arr.push(config['lightGrey'](rest.map((l) => l.replace(/^/, '\n')).join('')));
		errValue = arr.join(' ');
	} else {
		errValue = `${config['lightGrey'](arrayify(value).join(''))}`;
	}
	console.error(`${_prefix('error')}  ${errValue}`);
};

// runs only when the DEBUG env variable is set to true
outputUtil.debug = (...value) => {
	if (
		process.env.DEBUG ||
		process.env.debug ||
		process.env.NODE_DEBUG ||
		process.env.node_debug
	) {
		const debugValue = `${chalk.hex[config.lightGrey](arrayify(value).join(''))}`;
		console.log(`${_prefix('debug')}  ${debugValue}`);
	}
};

outputUtil.success = (...value) => {
	const successValue = `${config['lightGrey'](arrayify(value).join(''))}`;
	console.log(`${_prefix('success')}   ${successValue}`);
};

outputUtil.timer = (type, message, timerId, time) => {
	let timerValue = '';
	if (time) {
		timerValue = `${config['lightGrey'](`Elapsed Time -  ${time} ms`)}`;
	}
	console.log(
		`${_prefix(type)} ${chalk.cyanBright(`[ID ${timerId}]`)}  ${message} ${timerValue}`
	);
};
module.exports = outputUtil;
