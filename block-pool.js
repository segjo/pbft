const Block = require("./block");
const fs = require('fs');
const var_dump = require('var_dump')

class BlockPool {
  constructor() {
    this.list = [];
    //fs.writeFileSync('chain-'+process.env.SECRET+'.txt'); //Store Blockchain to File-System
  }

  // check if the block exisits or not
  exisitingBlock(block) {
    let exists = this.list.find(b => b.hash === block.hash);
    return exists;
  }

  // pushes block to the chain
  addBlock(block) {
    this.list.push(block);
    console.log("added block to pool");
    var data =  `Block : 
        Timestamp   : ${block.timestamp}
        Last Hash   : ${block.lastHash}
        Hash        : ${block.hash}
        Data        : ${block.data}
        proposer    : ${block.proposer}
        Signature   : ${block.signature}
        Sequence No : ${block.sequenceNo}`;
    
    /*Store Blockchain to File-System
     * 
     * fs.appendFile('chain-'+process.env.SECRET+'.txt', "\n"+data, function (err) {
    	  if (err) throw err;
    	  console.log('added block to file');
    	});
     * */
    
    
    //------------------------Fügt eine nachträtliche Modifikation in Block 19 und 14 ein--------------------------------
    if(this.list.length==20){
    	this.modifyTransactionData(block.lastHash);
    }
    if(this.list.length==15){
    	this.modifyBlockData(block.lastHash);
    }
    //------------------------------------------------------------------------------------------------------------
  }
  

  modifyTransactionData(lastHash){
	  console.log('Lese Block: '+lastHash);
	  let block = this.getBlock(lastHash);
	  console.log('Param to Modify: '+block.data[0].input.data.msg);
	  block.data[0].input.data.msg = "modifikation";
  }
  
  modifyBlockData(lastHash){
	  console.log('Lese Block: '+lastHash);
	  let block = this.getBlock(lastHash);
	  block.timestamp = "1578486211033";
  }

  // returns the blcok for the given hash
  getBlock(hash) {
    let exists = this.list.find(b => b.hash === hash);
    return exists;
  }
}

module.exports = BlockPool;
