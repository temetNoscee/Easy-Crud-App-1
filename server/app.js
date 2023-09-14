const express = require('express');
const cors = require('cors');
const dbService  =require('./dbService');

const dotenv = require('dotenv');
const DbService = require('./dbService');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))



//create
app.post('/insert',(req,res)=>{
    const {name} = req.body;
    const db = dbService.getDbServiceInstance();   
    const result = db.insertNewName(name);  
    
    result.then(data => res.json({data : data})).catch(err=> console.log(err));
})

//read
app.get('/getInfo',(req, res)=>{
    const db = dbService.getDbServiceInstance();    
    const result = db.getAllData();
    result
    .then((data)=>{
        res.json({data: data})
    }).catch(err=> console.log(err)); 
})

//update

//delete


app.listen(process.env.PORT,()=>console.log(`app is running on port ${process.env.PORT}`)) 
                                                                                          


