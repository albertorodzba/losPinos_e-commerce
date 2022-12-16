const mysql = require("mysql");
const { promisify } = require('util');
require('dotenv').config();
let n = 0;
// console.log("ejecucion numero", n++)

// try {
// } catch (error) {
//     console.log("--configDB",error);
// }
const pool = mysql.createPool({
    connectionLimit: 10, //25
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
});  
pool.query = promisify(pool.query);

pool.getConnection(function (err) {
    //error connection
    if (err) {
        console.log(err & err.code);
        return err;
    } else {
        console.log("Connected");
    }
});

const executeQuery = async (query) => {
    const results = await pool.query(query);
    return results;
};

const endPool = () => {
    pool.end(function (err) {
        if (err) {
            console.log(err & err.code);
            return err;
        }
    });
};
module.exports = {
    executeQuery,
    endPool,
    
};
