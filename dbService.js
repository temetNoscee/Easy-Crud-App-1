const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,

})

connection.connect((err)=>{
    if(err){
        throw err;
    }
    //console.log('db is connected');
    //console.log('db' + connection.state)
})


class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }


    async getAllData(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT * FROM names";
                connection.query(query, (err,results)=>{
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(results);   
                })

            })

            //console.log(response);
            return response;

        }catch(err){
            console.log(err);
        }
    }

    async insertNewName(name){
        try{
            const dateAdded = new Date();
            const insert = await new Promise((resolve,reject)=>{
                const query = "INSERT INTO names (name,dateAdded) VALUES (?,?)";
                connection.query(query,[name,dateAdded],(err,result)=>{
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(result.insertId); //insertId is the key of the result object
                })

            })
            return {
                id: insert,
                name: name,
                dateAdded: dateAdded
            };
        }catch(err){
            console.log(err);
        }
    }
}


module.exports = DbService;