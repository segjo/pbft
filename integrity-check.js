'use strict';
var request = require('request');
const var_dump = require('var_dump')
const SHA256 = require("crypto-js/sha256");

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
//In Block 19 befindet sich eine Modifikation
function checkChain(blocks) {
	var prevHash;
	for(var nr in blocks){
		let block=blocks[nr];
		//Erstelle Block und Hash und vergleiche diesen
		if(block.hash!="genesis-hash"){
	    console.log("Block "+block.sequenceNo+" ("+nr+"):"+block.hash);
	    let lastHash = block.lastHash;
	    let timestamp = block.timestamp;
		  let dataString = block.data;
		  for(var x in block.data){
			  if('input' in block.data[x]){
				  if('data' in block.data[x].input){
					  if('msg' in block.data[x].input.data){
						  dataString += block.data[x].input.data.msg;
					  } 
				  }
			  }
		  }
	    let berechneterhash=SHA256(JSON.stringify(`${timestamp}${lastHash}${dataString}`)).toString();
	    console.log("Berechneter Hash:"+berechneterhash);
	    console.log("LastHash:"+block.lastHash);
   
	    
	    if(berechneterhash!=blocks[nr].hash){
	    	console.log("-----------------------------------------Modifikation erkannt (Block-Inhalt)---------------------------------------")
	    }
	    
	  
		    
		    	if(prevHash!=lastHash){
		    		console.log("Hash in vorherigen Block:"+prevHash);
		    		console.log("-----------------------------------------Hash ungleich vorheriger Block---------------------------------------")
		    	}
		    	
		    	
		    	
		    	
		    
		    	prevHash=block.hash;

	    
		}else{
			prevHash=block.hash;
		}
	    
	}
}

function getHash(data) {
	for(var nr in data){
	    console.log("Block:"+data[nr].hash);
	    
	}
}