# util-box :wrench:

> A minimal toolbox of helper methods

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
  debug('Debuggin statement') // grey, requires process.env.DEBUG to be set
```