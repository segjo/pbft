'use strict';
var request = require('request');
const var_dump = require('var_dump')

var url = 'http://localhost:3000/blocks';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is already parsed as JSON:
      //console.log(var_dump(data));
      checkChain(data);
    }
});
//In Block 20/21 befindet sich eine Modifikation
function checkChain(data) {
	for(var nr in data){
	    console.log("Block:"+data[nr].hash);
	    console.log("Berechneter Hash:"+data[nr].hash);
	    
	}
}

function getHash(data) {
	for(var nr in data){
	    console.log("Block:"+data[nr].hash);
	    
	}
}