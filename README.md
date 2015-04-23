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

## cli
```sh
> npm i -g nali-repl
# installs `nali` cli tool to start a repl from a container file

> nali container.js
# start a repl attached to the target nali container file
```

A container file is a javascript file which exports a nali container
or a factory function which returns a nali container.


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
