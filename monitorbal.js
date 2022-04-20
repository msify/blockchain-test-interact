const Web3 = require('web3');
const ethNetwork = 'Infura Project URL';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

//runs wallet balance request until the balance changes and records the time the currency was recieved
async function getB() {
        var balance = await web3.eth.getBalance("wallet address");
        console.log("Current balance:" +balance);
        do {
                var newbalance = await web3.eth.getBalance("wallet address");
                if (newbalance != balance) {
                        const today = new Date();
                        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        console.log("Eth was recieved at: ", time);
                        console.log("New balance is: " + newbalance)
                        break;
                }
        }
        while ( newbalance = balance);
}

getB();
