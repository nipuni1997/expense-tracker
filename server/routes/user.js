const express = require("express");



const router = express.Router();


const mysql = require("mysql");
const { response } = require("express");
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"977450063",
    database:"login",
    });
    db.connect(error => {
        if (error) throw error;
        console.log("Successfully connected to the database.");
      });




router.post('/registercustomer', async (req,res)=>{
    const userName =req.body.userName;
    const email =req.body.email;
    const password=req.body.password;
    const userrole='customer';
console.log(userName,email,password);

bcrypt.hash(password,saltRound,(err,hash) =>{
    if(err){
        console.log(err);
    }
    db.query("INSERT INTO user (email,name,password,userrole) VALUES (?,?,?,?)",
    [email,userName,hash,userrole],
    (err,result)=>{
        console.log(err);
        res.send(result);
    }
    );
})


});

router.post('/registerrepair',async (req,res)=>{
    const userName = req.body.userName;
    const email =req.body.email;
    const address=req.body.address;
    const city=req.body.city;
    const province=req.body.province;
    const tel=req.body.tel;
    const description=req.body.description;
    const password=req.body.password;
    const confirm=req.body.confirm;
    const userrole='repair';
    console.log(userName,email,password);


    bcrypt.hash(password,saltRound,(err,hash) =>{
        if(err){
            console.log(err);
        }
    db.query("INSERT INTO user (email,name,password,userrole) VALUES (?,?,?,?)",
    [email,userName,hash,userrole],
    (err,result)=>{
        if(err){
        console.log(err);}else{
db.query("Select * from user WHERE email=?",[email],(err,result)=>{
//  const userId=result[0].id;
// console.log(result[0].id);
db.query("INSERT INTO repair (address,city,province,tel,description,name,userId) VALUES (?,?,?,?,?,?,?)",
[address,city,province,tel,description,userName,result[0].id],
(err,result)=>{
    if(err)
    console.log(err);
    return res.send(result);

});


})
        // const userId=result[0].id;
     
        }
    }
    
    );
})
// const userId=db.query("SELECT id from user WHERE email=?",[email],
// (err,result)=>{
//     console.log(err);
// }
// );
   
});

router.get('/getAll',(req,res)=>{
    const sqlSelect="SELECT * FROM expense";
    db.query(sqlSelect,(err,result)=>{
       
        
       console.log(result);
             res.send(result);
        
    });
});
router.delete('/deleteAdd/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM addvertisement WHERE id = ?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

router.post('/login' , async (req,res)=>{
    const userEmail = req.body.email;
    const password = req.body.password;
    // const userId= req.body.userId;
    // console.log(userId); 
console.log(userEmail,password);
    db.query("SELECT * from user WHERE email=?",[userEmail],
    (err,result)=>{
        console.log(err);
    //    if(err){
    //     //    res.send({err:err});
    //     console.log("user cant find");
    //    }
       if(result.length>0){
        bcrypt.compare(password,result[0].password,(error,response)=>{
            if(response){
                req.session.user=result;
                console.log(req.session.user);
                // const accessToken=req.session.user.id;
                console.log(result[0].id);
                // const accessToken = sign(
                //     {  id: result[0].id},
                //     'secret'
                //   );
                //   res.json(accessToken);
                return res.send(result);
               
                
            
            }else{
                console.log("Password incorrect");
               return res.send({message : "User and password do not match."});
            }
            // const accessToken = sign(
            //     {  id: result[0].id},
            //     'secret'
            //   );
            //   res.json(accessToken);

        })
       }else{
        console.log("cant find user");
         return  res.send('Cant find user');
           
       }
    }
    );
    console.log(session.user);
});

//Add Advertisements

router.post('/addAdd', async (req,res)=>{
    const heading =req.body.heading;
    const brand =req.body.brand;
    const year=req.body.year;
    const country=req.body.country;
    const condition = req.body.condition;
    const description=req.body.description;
    const price = req.body.price;
console.log(heading,brand,year);


    db.query("INSERT INTO addvertisement (heading,brand,year,country,condition,discription,price) VALUES (?,?,?,?,?,?,?)",
    [heading,brand,year,country,condition,description,price],
    (err,result)=>{
        console.log(err);
    }
);
  
});






module.exports = router ;
