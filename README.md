>  A minimal toolbox of helper methods

[![Build Status](https://travis-ci.org/Shriram-Balaji/util-box.svg?branch=master)](https://travis-ci.org/Shriram-Balaji/util-box)

## Usage

### Add util-box to your project

```console
$ npm install --save util-box
```

### http-util

 Minimal utility methods for HTTP Requests and Responses.

```js
const { httpUtil } = require("util-box");
let reqParams = {
    firstName: "Walter",
    lastName: "White",
    quote: "I'm the one who knocks!"
  };
  const reqUrl = httpUtil.makeQueryString(reqParams, 'https://randomdomain.com')
```

The `reqUrl` should return a value like ```https://randomdomain.com?firstName=Walter&lastName=White&quote=I'm the one who knocks!```

### output-util

Methods for color-coded logging.

```js
  const {error, success, debug} = require("util-box");
  success('Hello'); // green
  error('This is an Error!'); // red
  debug('Debuggin statement'); // grey, requires process.env.DEBUG to be set
```

## Documentation

### httpUtil.removeTrailingSlash(url)

Removes a trailing slash from the end of a url, if present.

### httpUtil.makeQueryString(reqParams)

Converts request parameters into a queryString. The input `reqParams` is an object with key-value pairs of each query parameter and their corresponding values.


### httpUtil.handleApiResponse(response)

This handles a generic Api Response from different request libraries by returning a Promise. Additionally, it also rejects with an error for `non-2xx` responses.

### outputUtil.success(message)

Logs the specified message to stdout in chalk green.:

### outputUtil.error(message)

Logs the specied message to stdout as an error in chalk red.

### outputUtil.debug(message)

Logs the specified message to stdout in chalk grey, only if the `DEBUG` variable is set in `process.env`