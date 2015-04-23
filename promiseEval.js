var vm = require('vm')
var babel = require('babel-core')
var fninfo = require('fninfo')

module.exports = function promiseEval(code, context, file, cb) {
  var err, result;


  code = /await /.test(code) ? '(async function () { return ' + code + '})()'
                             : code

  var compiled = babel.transform(code, {
    optional: ['runtime'],
    ast: false,
    stage:1
  })

  // un-strictify for easier variable definition
  compiled.code = compiled.code.substr('"use strict";'.length)

  // first, create the Script object to check the syntax
  try {
    var script = vm.createScript(compiled.code, {
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
    }
  }

  if (err) { return cb(err) }
  
  if (result && typeof result.then === 'function') {
    return result.then(function (r) {
      var t = typeof r
      if (t === 'object' && r.constructor && r.constructor.name) {
        t = r.constructor.name
      } else {
        t = t.substr(0,1).toUpperCase() + t.substr(1)
      }
      console.log('Promise<' + t + '>')
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
