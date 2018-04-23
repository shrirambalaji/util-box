const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..");
const httpUtil = require(path.join(HOMEDIR, "http.util"));
test("returns a querystring when provided with request params", t => {
  t.plan(1);
  let mockReqParams = {
    firstName: "Walter",
    lastName: "White",
    quote: "I'm the one who knocks!"
  };
  let queryString = httpUtil.makeQueryString(mockReqParams);
  t.is(
    queryString,
    "?firstName=Walter&lastName=White&quote=I'm the one who knocks!"
  );
});
