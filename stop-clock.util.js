const outputUtil = require('./output.util');
const Stopwatch = require('node-stopwatch').Stopwatch;
const shortId = require('shortid');

class stopClock {
	constructor() {
		this._timerId = null;
	}

	start(message) {
		this._clock = Stopwatch.create();
		this._clock.start();
		this._timerId = shortId.generate();
		return outputUtil.timer('timerStart', message, this._timerId);
	}

	stop(message) {
		if (this._clock.isRunning) {
			const duration = this._clock.elapsedMilliseconds;
			this._clock.stop();
			return outputUtil.timer('timerStop', message, this._timerId, duration);
		}
	}
}

module.exports = new stopClock();
