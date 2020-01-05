const Block = require("./block");
const fs = require('fs');

class BlockPool {
  constructor() {
    this.list = [];
    fs.writeFileSync('chain.txt');
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
    fs.appendFile('chain.txt', block.timestamp+"\n", function (err) {
    	  if (err) throw err;
    	  console.log('added block to file');
    	});
  }

  // returns the blcok for the given hash
  getBlock(hash) {
    let exists = this.list.find(b => b.hash === hash);
    return exists;
  }
}

module.exports = BlockPool;
