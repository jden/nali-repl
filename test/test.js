const nali = require('nali')
const repl = require('../index.js')

const container = nali()
repl(container, {
  hi: function () {
    return 'hi'
  }
})
