'use strict';
var request = require('request');
const var_dump = require('var_dump')
const SHA256 = require("crypto-js/sha256");

var url = 'http://192.168.1.200:3000/blocks';

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
//In Block 19 befindet sich eine Modifikation
function checkChain(blocks) {
	var patt = /.[0-9]{13}/i;
	for(var nr in blocks){
		let block=blocks[nr];
		
		if(block.hash!="genesis-hash"){
	    let timestampBlock = block.timestamp;
		  let dataString = block.data;
		  for(var x in block.data){
			  if('input' in block.data[x]){
				  if('data' in block.data[x].input){
					  if('msg' in block.data[x].input.data){
						  let msg=block.data[x].input.data.msg;
						  
						  console.log(block.sequenceNo+";"+timestampBlock+";"+msg.match(patt))
					  } 
				  }
			  }
		  }
		}
	    
	}
}
