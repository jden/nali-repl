#!/usr/bin/env node

const file = process.argv[2]

if (!file) {
  console.log('usage: nali <container.js>')
  process.exit(22)
}

const fs = require('fs')
const path = require('path')
const repl = require('./index')

if (!(fs.existsSync(file) || fs.existsSync(file + '.js'))) {
  console.log('File not found:', file)
  process.exit(2)
}

require('babel/register')({
  ignore: /(request|lodash)/,
  stage:1
})
const container = require(path.resolve(process.cwd(), file))

function isContainer(x) {
  return x && Array.isArray(x.services) && typeof x.fetch === 'function'
}

if (isContainer(container)) {
  repl(container)
} else if (typeof container === 'function') {
  // factory
  try {
    const instance = container()
    repl(instance)
  } catch (e) {
    console.log('could not initialize container')
    process.exit(1)
  }
} else {
  console.log(file, 'is not a nali container')
  process.exit(22)
}

