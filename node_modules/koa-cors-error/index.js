'use strict';

/**
 * Original code in koa/lib/context.js
 */

var assert = require('assert');
var statuses = require('statuses');

module.exports = function *(next) {
  try {
    yield *next;
  } catch(err) {
    // don't do anything if there is no error.
    // this allows you to pass `this.onerror`
    // to node-style callbacks.
    if (null == err) return;

    if (!(err instanceof Error)) err = new Error('non-error thrown: ' + err);

    // delegate
    // lusever: not send duplicate error message
    //this.app.emit('error', err, this);

    // nothing we can do here other
    // than delegate to the app-level
    // handler and log.
    if (this.headerSent || !this.writable) {
      err.headerSent = true;
      return;
    }

    // unset all headers
    // lusever: no send duplicate error message
    //this.res._headers = {};

    // force text/plain
    this.type = 'text';

    // ENOENT support
    if ('ENOENT' == err.code) err.status = 404;

    // default to 500
    if ('number' != typeof err.status || !statuses[err.status]) err.status = 500;

    // respond
    var code = statuses[err.status];
    var msg = err.expose ? err.message : code;
    this.status = err.status;
    this.length = Buffer.byteLength(msg);
    this.res.end(msg);

    // lusever: break event loop in top
    throw err;
  }
};
