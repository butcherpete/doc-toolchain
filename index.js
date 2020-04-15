const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

fs.readFileSync('./input/xml/howto.xml', function(err,data){
	if(err) {
		console.log("Could not open file " + err);
		process.exit(1);
	}

	parser.parseString(data, function (err, result) {
		console.dir(result);
		console.log('Done');
		});

/*
let str= '<Customers>\
  <Customer>\
      <first>JIM</first>\
      <last>BEAM</last>\
      <address>22. JIM. RD.</address>\
      <age>24</age>\
      <age2>2.0</age2>\
      <Phone>206-555-0144</Phone>\
  </Customer>\
</Customers>'

*/

	parser.parseString(str, function (err, result) {
		console.dir(result);
		console.log('Done');
		console.log(JSON.stringify(result));
		return JSON.stringify(result);
		});
});

