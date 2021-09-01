


async function nb(pukk) {
    const Tx = require("ethereumjs-tx").Transaction; 
    
    const Web3 = require("web3")
    const web3 = new Web3("https://ropsten.infura.io/v3/2689d4ed4b074836911f0fee0d7cc436")
    //const network = await web3.eth.net.getNetworkType()
   


    const balance= await web3.eth.getBalance(pukk)
    const ethbalance= await  web3.utils.fromWei(balance, "ether")
  
    return ethbalance
}

console.log(nb("0xb61A9Fd4Ec721F0908F6Bb5733bfD094b5c20572"))

//nb("0xb61A9Fd4Ec721F0908F6Bb5733bfD094b5c20572")

    
/*function nb(pukk) {
    var Tx = require("ethereumjs-tx").Transaction; 
    var Web3 = require("web3")



        
    var web3 = new Web3("https://ropsten.infura.io/v3/2689d4ed4b074836911f0fee0d7cc436")

    
   web3.eth.getBalance(pukk, function  (error, wei) {
        if (!error) {
            var balance = web3.utils.fromWei(wei, 'ether');
            var etherbalance= balance

        
            return etherbalance
        
        }
    
    });

    
};  */

module.exports={nb};