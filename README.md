# nali-repl
make an interactive repl from any nali container

## usage

```js

const nali = require('nali')
const repl = require('nali-repl')

const container = nali()
repl(container, {
  hi: function () {
    return 'hi'
  }
})

```


## api
`NaliRepl(container : NaliContainer, commands? : Dictionary<String,Function>) => Repl`

## installation

    $ npm install nali-repl


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXV jden <jason@denizac.org>. See LICENSE.md
