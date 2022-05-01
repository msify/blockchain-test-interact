onst Web3 = require('web3');
const ethNetwork = 'https://polygon-mumbai.infura.io/v3/9dc2e639bd894ef6a03b511c7f41a84c';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
// configuration for Infura APi, wallet keys and contract address
const API_KEY = "infura api key";
const PRIVATE_KEY = "0x"+"private key";
const CONTRACT_ADDRESS = "0x1eCefAc6fc3a90768ec0C19143C3Bf82115e3FA2";
const projectid = "project id";
const projectsecret = "project secret";
const contract = require("../send/contracts/storage.json");
const PUBLIC_KEY = "publlic key";
const storageContract = new web3.eth.Contract(contract, CONTRACT_ADDRESS);
//make transaction
async function newprofit(revenue,expenditure) {
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,'latest');
        const gasEstimate = await storageContract.methods.profit(revenue,expenditure).estimateGas();
        const tx = {
          'from': PUBLIC_KEY,
          'to': CONTRACT_ADDRESS,
          'nonce': nonce,
          'gas' : gasEstimate,
          'data': storageContract.methods.profit(revenue,expenditure).encodeABI()
        };


        const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        signPromise.then((signedTx) => {
          web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(err,hash) {
            if (!err) {
                console.log("The hash of your transaction is:",hash);
                const today = new Date();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("Transaction submitted at", time);
                console.log("Checking transaction status...");
                var balance = await storageContract.methods.retrieve().call();
                do {
                 var newbalance = await storageContract.methods.retrieve().call();
                 if (newbalance != balance) {
                   const today = new Date();
                   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                   console.log("Completed at: ", time);
                   console.log("The profit is:  " + newbalance)
                   break;
                 }
                }
                while ( newbalance = balance);

            } else {
                console.log("Transaction failed try again", err);
            }
          });
        }).catch((err) => {
          console.log("Promise failed",err);
        });


}

async function main() {
   // input random integers for contracct function
   var revenue = Math.trunc(Math.random()*10000) + 5000;
   var expenditure = Math.trunc(Math.random()*4000) + 100;
   console.log("The calculation of profit from revenue "+ revenue+" and expenditure "+ expenditure+" is under process");
   await newprofit(revenue,expenditure);
}

main();
