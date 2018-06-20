const path = require('path');
const test = require('ava');
const HOMEDIR = path.join(__dirname, '..', '..');
const TESTDIR = path.join(HOMEDIR, 'test');
const fileUtil = require(path.join(HOMEDIR)).fileUtil;

const fileName = `${TESTDIR}/fixtures/writeFile.txt`;

test.serial('fileUtil can writeTo and readFrom a File', async (t) => {
	try {
		const writeFile = await fileUtil.writeFile(fileName, 'Hello World!');
		const readFile = await fileUtil.readFile(fileName);
		t.is(readFile, 'Hello World!');
	} catch (error) {
		t.falsy(error);
	}
});

test.serial('fileUtil can append data to a file', async (t) => {
	try {
		const appendFile = await fileUtil.appendFile(fileName, 'Programming 101', 'utf-8');
		const readAppendedFile = await fileUtil.readFile(fileName);
		t.regex(readAppendedFile, new RegExp('Programming 101'));
	} catch (err) {
		t.falsy(err);
	}
});

test.serial('fileUtil can truncate a file', async (t) => {
	try {
		const truncateFile = await fileUtil.truncateFile(fileName);
		const readTruncatedFile = await fileUtil.readFile(fileName);
		t.is(readTruncatedFile.length, 0);
	} catch (error) {
		t.falsy(error);
	}
});

test.serial('fileUtil can delete a file', async (t) => {
	try {
		const deletedFile = await fileUtil.deleteFile(fileName);
		// reading a deletedFile will through a No such file or directory error, caught below
		const readDeleteFile = await fileUtil.readFile(fileName);
	} catch (error) {
		t.truthy(error);
		t.is(error.code, 'ENOENT');
	}
});
