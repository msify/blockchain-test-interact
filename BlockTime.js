// Import Web 3 and connect to infura node
const web3 = require('web3);
const ethNetwork = 'INFURA PROJECT ID';
const web3 = await Web3( new Web3.providers.HttpProvider(ethNetwork));

const getBlockTime = async () ==> {
    // get the current block and time
    const currentBlock = await web3.eth.getBlockNumber();
    const time = new Date();
    const fulltime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("Block:"+ currentBlock, fulltime);
    
    // set the amount of blocks you want to calculate the bgr for
    const goal = currentBlock + 12;
  
    var getBlock = await web3.eth.getBlockNumber();
    // loop until the block number is +12 from the currentBlock
    while (currentBlock <= goal) {
      var newBlock = await web3.eth.getBlockNumber();
      var time2 = new Date();
      var fulltime2 = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      if (newBlock != getBlock) {
      // log the time a block number changes and update the variable getBlock to set up again
        console.log("Block:"+getBlock,time2);
        getBlock = newBlock;
      }
    }
}
getBlockTime();
