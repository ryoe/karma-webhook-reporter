(function() {
  'use strict';
  var needle = require('needle');

  var WebHookReporter = function(options) {
    options                   = options                    || {};
    options.url               = options.url                || null;
    options.notify            = options.notify             || {};
    options.notifyRunComplete = options.notify.runComplete || true;
    options.notifyRunStart    = options.notify.runStart    || true;
    options.notifySpecFailure = options.notify.specFailure || true;
    options.notifySpecSkipped = options.notify.specSkipped || false;
    options.notifySpecSuccess = options.notify.specSuccess || false;

    this.onRunStart = function() {
      if (options.url === null) {
        write('WARN: karma-webhook-reporter: option.url is not set. No webhook will be called.');
      } else if (options.notifyRunStart) {
        postData(options.url, 'runStart', { });
      }
    };

    this.onSpecComplete = function(browser, result) {
      var type;

      if (result.skipped) {
        type = options.notifySpecSkipped ? 'specSkipped' : null;
      } else if (result.success) {
        type = options.notifySpecSuccess ? 'specSuccess' : null;
      } else {
        type = options.notifySpecFailure ? 'specFailure' : null;
      }

      if (type !== null) {
        postData(options.url, type, { browser: browser.name, result: result });
      }
    };

    this.onRunComplete = function(browsers, results) {
      if (options.notifyRunComplete) {
        postData(options.url, 'runComplete', { browsers: browsers, results: results });
      }
    };
  };

  WebHookReporter.$inject = ['config.webHookReporter'];

  module.exports = { 'reporter:webhook': ['type', WebHookReporter] };

  function write(msg) {
    process.stdout.write(msg + '\n');
  };

  function postData(url, type, data) {
    if (!url) { return; }

    var payload = {
        type: type,
        data: data
      }, opts = {
        json: true
      };

    needle.post(url, payload, opts, function(err, resp) {
      if (err) {
        console.log(err);
      } else if (resp.statusCode < 200 || resp.statusCode > 299) {
        console.log('received http status: ' + resp.statusCode)
      }
    });
  };
})();
