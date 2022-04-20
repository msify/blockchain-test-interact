const Web3 = require('web3');
const ethNetwork = 'project id';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const getBsize = async () => {

        /setBlock you want to measure from ( could also use web3.eth.getBlock('latest') for real time 
        const block = 14565105;
        
        // set how many blocks you want to measure
        const goal = block + 13;
        
        //loop until the goal is reached
        for(let i = block; i<goal; i++) {
                var bsize = await web3.eth.getBlock(i);
                //filter to only display the size of the block
                var size = bsize['size'];
                console.log("Block size for block "+bsize['number'] + " is "+ size);
        }
}

getBsize();
