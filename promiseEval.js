var vm = require('vm')

module.exports = function promiseEval(code, context, file, cb) {
  var err, result;
  // first, create the Script object to check the syntax
  try {
    var script = vm.createScript(code, {
      filename: file,
      displayErrors: false
    });
  } catch (e) {
    console.error('parse error %j', code, e);
    err = e;
  }

  if (!err) {
    try {
      result = script.runInContext(context, { displayErrors: false });
    } catch (e) {
      err = e;
      if (err && process.domain) {
        console.error('not recoverable, send to domain');
        process.domain.emit('error', err);
        process.domain.exit();
        return;
      }
    }
  }

  if (err) { return cb(err) }
  
  if (result && typeof result.then === 'function') {
    return result.then(function (r) {
      cb(null, r)
    }, cb)
  } else if (typeof result === 'function') {
    var info = fninfo(result)
    console.log((info.name || 'Function') + '(' + info.params.join(', ') +')')
    cb(err, result)
  } else {
    cb(err, result)
  }
}
