# Transform-stream-backpressure [![Build Status](https://secure.travis-ci.org/noblesamurai/transform-stream-backpressure.png?branch=master)](http://travis-ci.org/noblesamurai/transform-stream-backpressure) [![NPM version](https://badge-me.herokuapp.com/api/npm/transform-stream-backpressure.png)](http://badges.enytc.com/for/npm/transform-stream-backpressure)

> A transform stream that applies backpressure based on a check function.

## Purpose
Creates a pass through stream where backpressure is governed by the provided
`check()` function.

## Usage

```js
const fs = require('fs');

function check () {
  return new Promise((resolve) => {
    setTimeout(500, resolve);
  });
}

const readable = fs.createReadStream('myfile');
const writable = fs.createWriteStream('other');

const transform = require('transform-stream-backpressure')(myfunc, { objectMode: true, highWaterMark: 20 });
readable.pipe(transform).pipe(writable);

```

## API

<a name="module_Creates a transform stream with backpressure governed by the check_new function."></a>

## Creates a transform stream with backpressure governed by the check() function. ⇒ <code>Transform</code>
**Returns**: <code>Transform</code> - A transform stream.

| Param | Type | Description |
| --- | --- | --- |
| check | <code>function</code> | function that returns a promise. If it resolves to truthy, chunk is passed through. |
| config | <code>object</code> | general stream config passed to new Transform(). |


Note: To regenerate this section from the jsdoc run `npm run docs` and paste
the output above.

## Installation

This module is installed via npm:

``` bash
$ npm install transform-stream-backpressure
```
## License

The BSD License

Copyright (c) 2018, Tim Allen

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Tim Allen nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

