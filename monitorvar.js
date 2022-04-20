const Web3 = require('web3');
const ethNetwork = 'Infura Project URL';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
const CONTRACT_ADDRESS = "0x73cf5c7d86d959EB653CA5fcfF58F2f3983BB2Fd"; /
/this is my contract but assuming you have a similar contract just replace it and also you will want to replace the methods to your respective contract
const contract = require("../send/contracts/storage.json"); // contract abi
const storageContract = new web3.eth.Contract(contract, CONTRACT_ADDRESS);

async function getP() {
        var profit = await storageContract.methods.retrieve().call();
        console.log("Current profit: "+ profit);
        // checks the public variable profit until it updated with new calculations and records the time its updated
        do {
                var newprofit = await storageContract.methods.retrieve().call();
                if (newprofit != profit) {
                        const today = new Date();
                        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        console.log("Profit was updated at:  ", time);
                        console.log("New value is: " + newprofit)
                        break;
                }
        }
        while ( newprofit = profit);
}

getP();

