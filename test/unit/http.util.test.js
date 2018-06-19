const path = require('path');
const test = require('ava');
const HOMEDIR = path.join(__dirname, '..', '..');
const httpUtil = require(path.join(HOMEDIR)).httpUtil;
const { mockRes } = require('../fixtures/http.js');
test('removes trailing slash from a url, if present', (t) => {
	let responseUrl = httpUtil.removeTrailingSlash('test-check.com/');
	t.is(responseUrl, 'test-check.com');
});

test('normalises and removes undefined request parameters', (t) => {
	let mockReqParams = {
		name: 'Jon Snow',
		death: undefined,
		title: 'The King in the North',
		knows: undefined // knows nothing
	};
	let responseParams = httpUtil.normalizeReqParams(mockReqParams);
	t.deepEqual(
		{
			name: 'Jon Snow',
			title: 'The King in the North'
		},
		responseParams
	);
});

test('returns a querystring when provided with request params', (t) => {
	let mockReqParams = {
		firstName: 'Walter',
		lastName: 'White',
		quote: "I'm the one who knocks!"
	};
	let queryString = httpUtil.makeQueryString(mockReqParams);
	t.is(queryString, "?firstName=Walter&lastName=White&quote=I'm the one who knocks!");
});

test('handles generic api response, and returns a promise', async (t) => {
	try {
		const apiResponse = await httpUtil.handleApiResponse(mockRes);
		t.deepEqual({ message: 'Hello' }, apiResponse);
	} catch (error) {
		t.falsy(error);
	}
});

test('returns an error, for a non-2xx response', async (t) => {
	t.plan(3);
	mockRes.status = 400;
	try {
		const failingApiResponse = await httpUtil.handleApiResponse(mockRes);
	} catch (err) {
		t.truthy(err);
		t.is(`Expected 2xx, found ${mockRes.status}`, err.message);
		t.is(err.statusCode, mockRes.status);
	}
});
