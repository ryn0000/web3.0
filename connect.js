 var md5 = require('md5');


const express = require("express");
//const { post } = require("jquery");
const mysql = require ("mysql");


const socketIo = require("socket.io");

const session = require('express-session');

//const{nb}= require('../src/Components/newBalance');
const { SafeAnchor } = require('react-bootstrap');
const { response } = require('express');



//const{encrypt, decrypt} = require('../src/Components/EncryptionHandlers')
//const{newB}= require('../src/Components/newBalance')

//Create connection

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MyN3wP4ssw0rd",
    database: "nts",
});
//mysql -u root -p    systemctl restart mysql
//connect to mysql

db.connect(err =>{
    if(err){
        throw err;
    }
    console.log("Mysql Connected");
});

const app = express();

app.use(express.json());
const cors = require("cors");
app.use(cors());





db.on('error', function(err) {
    console.log("[mysql error]",err);
  });

//nb("0xb61A9Fd4Ec721F0908F6Bb5733bfD094b5c20572")




app.post('/main',(req,res)=>{
    
    const pk = req.body.pk;
    const puk= req.body.puk;
    const  balance= req.body.balance;
    const balanceEther= req.body.balanceEther;
    const email="san54san54@gmail.com";

    
 
    /*db.query(
        "INSERT INTO wallet (email ,publicKey ,privateKey ,balanceUsdt) VALUES (?,?,?,?)",
        [email, puk, pk, balance],
        (err, result)=>{
            console.log(err);
        }
        );*/

    /*db.query(
            "UPDATE wallet SET balanceEther=? WHERE email=?; ",
            [lastethbalance ,email ],
            (err, result)=>{
         
                console.log(result)
                console.log(err)
                
               
            }
            
       
        );*/
    





    
    db.query(
        "SELECT publicKey,balanceNTS,balanceEther FROM wallet WHERE email = ?;",
        [email],
        (err, result)=>{
        
        if(err){
            res.send({err:err})
        }
                
        if(result[0].publicKey!= null){
            res.send({message: result})
            console.log(result)

            
                   
        }

        else if(result[0].publicKey== null ){
            
            db.query(
                "UPDATE wallet SET publicKey=? ,privateKey=? ,balanceNTS=?,balanceEther=? WHERE email=? ;",
                [puk, pk, balance,balanceEther ,email ],
                (err, result)=>{
                    console.log(err)
                    
                   
                }
                
           
                );

                db.query(
                    "SELECT publicKey,balanceNTS,balanceEther FROM wallet WHERE email = ?;",
                    [email],
                    (err, result)=>{
                    
                    if(err){
                        res.send({err:err})
                    }
                            
                    if(result[0].publicKey!= null){
                        res.send({message: result})
                        console.log(result)
                        
                               
                    }});
            




               
        }
  
        
            }
            );       
            
            

             
    /*db.query(
        "SELECT publicKey,balanceNTS,balanceEther FROM wallet WHERE email = ?",
        [email],
        (err, result)=>{
            if (result[0].balanceNTS<nb("0xb61A9Fd4Ec721F0908F6Bb5733bfD094b5c20572")){
                console.log("1")

            }
            else {
                console.log("2")
                console.log(typeof result[0].publicKey)
                //nb(result[0].publicKey)
                
            }
    
          
        });*/

        //nb("0xb61A9Fd4Ec721F0908F6Bb5733bfD094b5c20572")



});


app.post('/login',(req,res)=>{

  
    const password = md5(req.body.password);
    const email = req.body.email;

    

    db.query(
    "SELECT * FROM users WHERE password = ? AND email =?",
    [password, email],
    (err, result)=>{

        if(err){
             res.send({err:err})
        }
        
        if(result.length>0){
            res.send(result)
           
        }
        else{
            res.send({message:"Wrong email or password"});
        }
        


    }
    );

});



app.post('/register', (req, res)=>{

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    
    //const hashedPassword= encrypt(password);
    const hashedPassword= md5(password)
    db.query(
    "INSERT INTO users(firstName ,lastName ,password ,email ,phoneNumber) VALUES (?,?,?,?,?)",
    [firstName, lastName, hashedPassword, email, phoneNumber ],
    (err, result)=>{
        console.log(err);
        response.send("sa");
        
    }
    );

    db.query(
        "INSERT INTO wallet(email) VALUES (?)",
        [email],
        );

});






app.listen("3001",()=>{
    console.log("server started");
});









/*app.get("/createdb", (req, res)=>{
    let sql =" CREATE DATABASE STCcoina"
    db.query(sql, (err)=>{
        if(err){
            throw err;
        }
        res.send("Database Created");
    });

});*/



