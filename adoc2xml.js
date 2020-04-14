/*
 * asciidoc2docbook.js
 * Copyright (C) 2020 tsmith2 <tsmith2@caml112971>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const asciidoctor = require('@asciidoctor/core')()
require('@asciidoctor/docbook-converter')()

const options = {
	backend: 'docbook5', 
	doctype: 'article',
  standalone: true,
	safe: 'safe',
	to_file: './output/jack.xml'
}

asciidoctor.convertFile('./input/quickstart.adoc', options);
