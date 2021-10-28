const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 app = express();
 
 const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
	

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type:'application/json'}));




const db = mysql.createConnection({
user:"root",
host:"localhost",
password:"977450063",
database:"expenses",
});
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

//   const usersRouter = require('./routes/user');
// app.use('/user', usersRouter);

// const repairRouter =require('./routes/repair');
// app.use('/repair',repairRouter);

// const getDataRouter= require('./routes/user');
// app.use('/getData',getDataRouter);
// const deleteDataRouter= require('./routes/user');
// app.use('/delete',deleteDataRouter);

// const AddvertisementRouter= require('./routes/user');
// app.use('/addAdd',AddvertisementRouter);

// const deleteMechanicDataRouter= require('./routes/repair');
// app.use('/deleteMechanic',deleteMechanicDataRouter);

// const getMechanicDataRouter= require('./routes/repair');
// app.use('/getMechanic',getMechanicDataRouter);
// const getRepairhome= require('./routes/repair');
// app.use('/getRepair',getRepairhome);

// const getAllExpense= require('./routes/user');
// app.use('/getAll',getAllExpense);

app.get('/getAll',(req,res)=>{
    const sqlSelect="SELECT * FROM expense";
    db.query(sqlSelect,(err,result)=>{
       
        
       console.log(result);
             res.send(result);
        
    });
});

app.get('/getAmount',(req,res)=>{
    const sqlSelect="SELECT amount FROM wallet Where id='1'";
    db.query(sqlSelect,(err,result)=>{
       
        
       console.log(result);
             res.send(result);
        
    });
});

app.delete('/deleteExpense/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM expense WHERE id = ?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
  });

  app.post('/addExpense', async (req,res)=>{
    const category =req.body.category;
    const amount =req.body.amount;
    const date=req.body.date;
    
  // console.log(userName,email,password);
  
    db.query("INSERT INTO expense (category,amount,date) VALUES (?,?,?)",
    [category,amount,date],
    (err,result)=>{
        console.log(err);
    }
    );
  });

  app.put('/updateExpense',  (req,res)=>{
    
    const amount =req.body.amount;
    const id=req.body.id;
    
  // console.log(userName,email,password);
  
    db.query("UPDATE expense SET amount=? WHERE id= ? ",
    [amount,id],
    (err,result)=>{
        console.log(err);
    }
    );
  });

  app.put('/updateWallet',  (req,res)=>{
    
    const amount =req.body.amount;
    
    console.log(amount);
   
  // console.log(userName,email,password);
  
    db.query("UPDATE wallet SET amount=? WHERE id=? ",
    [amount,1],
    (err,result)=>{
        console.log(err);
    }
    );
  });





app.listen(3001,()=> {
    console.log("running sever");
});