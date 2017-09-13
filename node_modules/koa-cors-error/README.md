# koa-cors-error

Bug fixed [bug](https://github.com/evert0n/koa-cors/issues/17) whith 4xx or 5xx not sent while cross-domain requests.
koa `onerror` method have been completely replaced.


## Installation

```sh
$ npm install koa-stylish
```


## Use
```javascript
var corsError = require('koa-cors-error');

app.post('/api/cors', cors, corsError, function *() {
  this.throw(401);
});
```
