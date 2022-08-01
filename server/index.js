const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const cors=require("cors");
const mysql=require("mysql2");
const { application } = require("express");

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:'Dhanyam@123',
    database:'curd-react'
});



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
    const sql="select * from todo";
     db.query(sql,(err,result)=>{      
        res.send(result)
    });
})

app.post('/api/post',(req,res)=>{
    const{heading,description}=req.body
     const sql=`insert into todo(heading,description) values(?,?)`;
    db.query(sql,[heading,description],(err,result)=>{
        console.log("error"+err);       
    })
})

app.delete('/api/remove/:id',(req,res)=>{
    const{id}=req.params
     const sqlRemove=`delete from todo where id= ?`;
    db.query(sqlRemove,id,(err,result)=>{
        console.log("error"+err);       
    })
})

app.get('/api/get/:id',(req,res)=>{
    const{id}=req.params
    const sql="select * from todo where id=?";
     db.query(sql,id,(err,result)=>{      
        res.send(result)
        if(err) console.log(err)

    });
})

app.put('/api/update/:id',(req,res)=>{
    const{id}=req.params;
    const {heading,description,status,comment}=req.body;
    
    const sql="update todo set heading=?,description=?,status=?,comment=? where id=?";
     db.query(sql,[heading,description,status,comment,id],(err,result)=>{      
        res.send(result)
        if(err) console.log(err)

    });
})


app.listen(5000,()=>{
    console.log("Server is running on prt 5000")
})