onst Web3 = require('web3');
const ethNetwork = 'Project ID';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const getBsize = async () => {

        // set the block you want to measure from
        const block = 27016599;
        //set the amount of blocks to measure
        const goal = block + 13;
        for(let i = block; i<goal; i++) {
                var bsize = await web3.eth.getBlock(i);
                // get the amount of transactions in the block and log it to the console
                var txtotal = await web3.eth.getBlockTransactionCount(i);
                console.log(" In Block "+ bsize['number']+" there are "+ txtotal+ " transactions.");
        }
}

getBsize();

