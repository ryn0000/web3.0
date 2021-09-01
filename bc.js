import React, {Component} from 'react';
import Web3 from 'web3';


import Navbar1 from "./Navbar1";
import { BrowserRouter as Router , Switch, Route, Link} from "react-router-dom";
import Axios from 'axios';

import logo from '../ethersimge.png'

class bc extends Component{
    componentWillMount(){
        this.loadBlockchainData()
        
      }

    async loadBlockchainData(){
    
        const Tx = require("ethereumjs-tx").Transaction; 
    
        const Web3 = require("web3")
        const web3 = new Web3(/*Web3.givenProvider || */"https://ropsten.infura.io/v3/2689d4ed4b074836911f0fee0d7cc436")
        //const network = await web3.eth.net.getNetworkType()
        
        const pk= await web3.eth.accounts.create().privateKey
    
        const puk= await web3.eth.accounts.privateKeyToAccount(pk).address
        this.setState({publickey:puk})
    
        this.setState({privatekey:pk})


        const balance= await web3.eth.getBalance(puk)
        const ethbalance=  web3.utils.fromWei(balance, "ether")
        
        this.setState({add:ethbalance})

        /*const lastbalance = await web3.eth.getBalance(global.lastpuk);
        const lastethbalance= web3.utils.fromWei(lastbalance,"ether")
        this.setState({lb: lastethbalance})*/
        

        //const Web3 = require('web3')
        //const web3 = new Web3("https://ropsten.infura.io/v3/2689d4ed4b074836911f0fee0d7cc436") 
        
        const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
       
  
       
  
        const address =puk//"0xb61A9Fd4Ec721F0908F6Bb5733bfD094b5c20572"
        const contractAddress= "0x3208674597bce76E3E685f15892d1fBAaCE19541"
        
        const  contract =  new web3.eth.Contract(abi,contractAddress)
       
        const x = await contract.methods.balanceOf(address).call()
        
  
        const t = web3.utils.fromWei(x, "ether")
        this.setState({NTS:t})
        
    }

 

    
    constructor(props){
        super(props)
        this.state= { privatekey :''}
        this.state = {add :''}
        this.state= { publickey :''}
        this.state= { NTS :''}

        
       
      } 
      

      
    render(){

  
      



      const main = ()=>{

        
        Axios.post('http://localhost:3001/main',{
          puk: this.state.publickey,
          pk: this.state.privatekey,
          balance: this.state.NTS,
          balanceEther : this.state.add,
          headers: {
        'Content-Type': 'application/json'
            }
          

        
         }).then((response)=>{
          if(response.data.message!=null){
            
            document.getElementById("wallet_text").value=response.data.message[0].publicKey;
          
           document.getElementById("demo").innerHTML = "Ethereum Balance : "+response.data.message[0].balanceEther;
            document.getElementById("demo0").innerHTML = "NTSCOIN Balance : "+response.data.message[0].balanceNTS;
           
          }
          else if(response.data.message==null){
            document.getElementById("wallet_text").value=("Wallet Address");
        
            
          }
          else{
            
            document.getElementById("wallet_text").value=response.data.message[0].publicKey;
           document.getElementById("demo").innerHTML = "Ethereum Balance : "+response.data.message[0].balanceEther;
            document.getElementById("demo0").innerHTML = "NTSCOIN Balance : "+response.data.message[0].balanceNTS;
          }
        }).catch(function(error) {
        console.log(error);
      });
       };

       const hide =()=> {
        var x = document.getElementById("myDIV");
        //x.style.display = "block";
        var y= document.getElementById("wallet_text");
        y.value = this.state.publickey;
        //document.getElementById("demo").innerHTML = "Ethereum Balance : "+this.state.add;

        //document.getElementById("demo0").innerHTML = "NTSCOIN Balance : "+this.state.usdt;
      };       
      
    function df() {
      main();
      //hide();
    }
    //<p> your PrivateKey : {this.state.privatekey} </p> 
    return (
        <div  >
          <Navbar1/>


          <div /*onLoad={main}*/  className="container">

         


          <div className="row" style={{ marginTop:"50px"}}>
            <div className="col-md">
              <h3 style={{textAlign:"center"}}>DEPOSIT</h3>
            </div>
         
          </div>
            

            <div  className="row">
              <div className="col-md" >
                  <br></br>
                  <br></br>
                <img src={logo} alt="Örnek Resim"/>
                  
                <p id="demo"> Ethereum Balance : *** </p>

                  <br></br>
                <img src={logo} alt="Örnek Resim"/>
             
                <p id="demo0"> NTSCOIN Balance : *** </p>

              </div>
              <div className="col-md" id="myDIV" style={{ marginTop:"100px"}} > 
         


              <p>WalletAddress</p>
                <form >
  
                  <div className="form-group input-group">
                    
                  <input className="form-control" id="wallet_text" type="text"   readOnly/>
                  
        
                  </div>
                </form>
                <button  type="submit" className="btn btn-info btn-block " 
                  style={{width: "250px" }}
                  onClick={df}> Generate

                </button>   
              </div>
              
           
            
            </div>

            <br></br>
            <br></br>

            <div className="row">
            <div className="col-md">
              <h3 style={{textAlign:"center"}}>WITHDRAW</h3>
            </div>
         
          </div>

          <br></br><br></br><br></br>


          <div className="row">
            <div className="col-md">
              
                  <form>
                   
                    
                  
                   <div className="form-group input-group">
                   <input className="form-control" id="wallet_text" type="text"   />
         
                   </div>
                 </form>

            </div>
            <div className="col-md">
                <button type="submit" className="btn btn-info btn-block " 
                      style={{width: "250px" }}
                      > Withdraw Ethereum

                  </button> <br></br>



            </div>
            <div className="col-md">
              
                <form>
                   
                    
                  
                   <div className="form-group input-group">
                   <input className="form-control" id="wallet_text" type="text"   />
         
                   </div>
                 </form>


  
            </div>
            <div className="col-md">
              <button type="submit" className="btn btn-info btn-block " 
                  style={{width: "250px" }}
                  > Withdraw NTS

              </button> 

            </div>


          </div>









          <br></br> <br></br> <br></br> <br></br>


            <div className="row">
              <div className="col-md">

              </div>


              
              <div className="col-md">
                <form>
                   
                    
                  
                    <div className="form-group input-group">
                    <input className="form-control" id="wallet_text" type="text"   />
          
                    </div>
                  </form>
              </div>
              
            <div className="col-md">
      
              <button type="submit" className="btn btn-info btn-block " 
                  style={{width: "250px" }}
                  > BUY NTSCOIN

              </button>  
            </div>

            <div className="col-md">

            </div>
 


            </div>


          </div>

            
            
        </div>


     
   
    );
  }
}


export default bc;
