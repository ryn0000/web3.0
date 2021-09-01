var Tx =require('ethereumjs-tx')
const Web3= require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2689d4ed4b074836911f0fee0d7cc436')



const acc1= "0x0CFDC757f225bd15007ce382423Ebf3F55228862"
const acc2 = "0x9BB1AFa759acA745F9DD3fdf6C546aFcA659D27B"

const pk ="0xda4d546940b08ddb55388af4ca81be19e47fa70d9772b84d7ac0020c720d57be"
const priv1= new Buffer(pk,'hex')


const priv2 = 421


 web3.eth.getTransactionCount(acc1,(err,txCount)=>{


    const txObject={
        nonce: web3.utils.toHex(txCount),
        to: acc2,
        value: web3.utils.toHex(web3.utils.toWei('1','ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),


    }

    const tx = new Tx(txObject)
    tx.sign(priv1)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')


    web3.eth.sendSignedTransaction(raw, (err, txHash)=>{

        console.log('txHash:',txHash)
    })




 })