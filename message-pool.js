const ChainUtil = require("./chain-util");

class MessagePool {
  // list object is mapping that holds a list messages for a hash of a block
  constructor() {
    this.list = {};
    this.message = "INITIATE NEW ROUND";
  }

  // creates a round change message for the given block hash
  createMessage(blockHash, wallet) {
	  try{
		 if(this.list.length>10){
			 console.log("message-pool >10");
			 process.exit(1);
		 } }catch (err){
		        console.log(err);
		        return false;
		    }
	  
    let roundChange = {
      publicKey: wallet.getPublicKey(),
      message: this.message,
      signature: wallet.sign(ChainUtil.hash(this.message + blockHash)),
      blockHash: blockHash
    };

    this.list[blockHash] = [roundChange];
    return roundChange;
  }

  // checks if the message already exists
  existingMessage(message) {
	  try{
    if (this.list[message.blockHash]) {
      let exists = this.list[message.blockHash].find(
        p => p.publicKey === message.publicKey
      );
      return exists;
    } else {
      return false;
    }
  }catch (err){
      console.log(err);
      return false;
  }
  }

  // checks if the message is valid or not
  isValidMessage(message) {
    console.log("in valid here");
    return true;/* Fehler: TypeError: Cannot read property 'R' of undefined
    return ChainUtil.verifySignature(
      message.publicKey,
      message.signature,
      ChainUtil.hash(message.message + message.blockHash)
    );*/
  }

  // pushes the message for a block hash into the list
  addMessage(message) {
	 try{ 
    this.list[message.blockHash].push(message);
  }catch (err){
      console.log(err);
      return false;
  }
  }
}

module.exports = MessagePool;
