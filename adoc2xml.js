/*
 * asciidoc2docbook.js
 * Copyright (C) 2020 tsmith2 <tsmith2@caml112971>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const fs = require('fs')
const asciidoctor = require('@asciidoctor/core')()
require('@asciidoctor/docbook-converter')()

const options = {
  attributes: { backend: 'docbook5', doctype: 'book' },
  standalone: true
}

const content = require('fs').readFileSync('./asciidoc-writers-guide.adoc');

const docbook = asciidoctor.convert(content, options);

//console.log(docbook);

fs.writeFile('./asciidoc.xml', docbook, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
