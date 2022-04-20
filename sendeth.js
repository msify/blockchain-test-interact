onst Web3 = require('web3');
const ethNetwork = 'infura project url';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const API_KEY = "Infura project URL";
const PRIVATE_KEY = "0x"+"sender wallet private key";
const sendto = "Receiver address";
const projectid = "Infura Project ID"; // without the "https://mainet-infura.io/v3"
const projectsecret = "Project Secret";
const PUBLIC_KEY = "Sender wallet address";

// Send eth and get tx hash receipt
async function sendEth() {
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,'latest');
        const tx = {
          'from': PUBLIC_KEY,
          'to': sendto,
          'nonce': nonce,
          'value': 100, // THe amount you want to send
          'gas' : 30000,
        };


        const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        signPromise.then((signedTx) => {
          web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(err,hash) {
            if (!err) {
                console.log("The hash of your transaction is:",hash);
            } else {
                console.log("Transaction failed try again", err);
            }
          });
        }).catch((err) => {
          console.log("Promise failed",err);
        });
}

async function main() {
   const today = new Date();
   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   console.log("Eth was sent at: ", time);
   await sendEth();
}

main();

