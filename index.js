const repl = require('repl')
const promiseEval = require('./promiseEval')

function naliRepl (container, commands) {
  
  commands = commands || {}

  var cmd = repl.start({
    prompt: '> ',
    eval: promiseEval,
    input: process.stdin,
    output: process.stdout
  })

  // add commands
  Object.keys(commands).forEach(function (k) {
    cmd.context[k] = commands[k]
  })

  // add container services
  container.services.map(function (s) {
    container.fetch(s.name).then(function (i) {
      cmd.context[s.name] = i
    })
  })

  cmd.on('exit', function () {
    process.exit()
  })

  return cmd

}

module.exports = naliRepl