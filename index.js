const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

fs.readFile('howto.xml', function(err,data){
	parser.parseString(data, function(err, result) {
		console.log(result);
		});
	});

