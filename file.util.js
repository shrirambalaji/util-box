const fs = require('fs');
const fileUtil = () => {};

fileUtil.writeFile = (fileName, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, data, (err) => {
			err ? reject(err) : resolve(fileName);
		});
	});
};

fileUtil.readFile = (fileName, type) => {
	if (!type) type = 'utf-8';
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, type, (err, data) => {
			err ? reject(err) : resolve(data);
		});
	});
};

fileUtil.deleteFile = (fileName) => {
	return new Promise((resolve, reject) => {
		fs.unlink(fileName, (err) => {
			err ? reject(err) : resolve(fileName);
		});
	});
};

fileUtil.truncateFile = (fileName) => {
	return new Promise((resolve, reject) => {
		fs.truncate(fileName, (err) => {
			err ? reject(err) : resolve(fileName);
		});
	});
};

module.exports = fileUtil;
