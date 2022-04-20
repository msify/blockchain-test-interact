onst Web3 = require('web3');
const ethNetwork = 'Infura ID';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
// You can also import all the details from another file using "require filename;"
const API_KEY = "hInfura ID";
const PRIVATE_KEY = "0x"+"Wallet Private Key";
const CONTRACT_ADDRESS = "0x73cf5c7d86d959EB653CA5fcfF58F2f3983BB2Fd";
const projectid = "Infura project ID"; // just the ID DO NOT include the "https://mainnet.infura.io/v3"
const projectsecret = "Infura Project Secret";
const contract = require("../send/contracts/storage.json"); //Contract ABI (Put the contract ABI into the storage.json file)
const PUBLIC_KEY = "Wallet Public Key";
const storageContract = new web3.eth.Contract(contract, CONTRACT_ADDRESS);

async function newprofit(revenue,expenditure) {
        // make the transaction 
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,'latest');
        const gasEstimate = await storageContract.methods.profit(revenue,expenditure).estimateGas();
        const tx = {
          'from': PUBLIC_KEY,
          'to': CONTRACT_ADDRESS,
          'nonce': nonce,
          'gas' : gasEstimate,
          'data': storageContract.methods.profit(revenue,expenditure).encodeABI()
        };

        //sign the transaction
        const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        signPromise.then((signedTx) => {
          web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(err,hash) {
          //checks transaction for error and gets the transaction hash
            if (!err) {
                console.log("The hash of your transaction is:",hash);
                const today = new Date();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("Transaction submitted at", time);
                console.log("Checking transaction status...");
                //waits for contract completion and displays the calculated profit
                setTimeout(async () => {
                   try {
                        let st = await web3.eth.getTransaction(hash);
                        if (st != null) {
                                var today2 = new Date();
                                var time2 = today2.getHours() + ":" + today2.getMinutes() + ":" + today2.getSeconds();
                                console.log("Transactions completed at: ",time2);
                                console.log("Getting Profit...");
                                let get = await storageContract.methods.retrieve().call();
                                console.log("The profit is "+ get);

                        }
                   } catch(err) {
                        console.error(err);
                   }
                }, 60000);
            } else {
                console.log("Transaction failed try again", err);
            }
          });
        }).catch((err) => {
          console.log("Promise failed",err);
        });


}

async function main() {
   // generates random variables to calculate ( You can delete all this and set your own variables)
   var revenue = Math.trunc(Math.random()*10000) + 5000;
   var expenditure = Math.trunc(Math.random()*4000) + 100;
   console.log("The calculation of profit from revenue "+ revenue+" and expenditure "+ expenditure+" is under process");
   await newprofit(revenue,expenditure);
}

main();


