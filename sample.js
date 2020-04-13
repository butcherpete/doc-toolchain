let convert = require('xml-js');
let xml = require('fs').readFileSync('./howto.xml', 'utf8');
let options = {ignoreComment: true, alwaysChildren: true, spaces: 4};

let result = convert.xml2json(xml, options); //{compact: true, spaces: 4});
console.log(result);
