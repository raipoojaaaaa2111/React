const mysql = require('mysql2');
require("dotenv").config();
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DATABASE:", process.env.DB_NAME);
console.log("PORT:", process.env.DB_PORT);
console.log("PASSWORD LENGTH:", process.env.DB_PASSWORD?.length);
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
});

db.getConnection((err, connection) => {
    if(err){
        console.error("Database connection failed:", err.message)
    }
    else{
        console.log("Database connected")
        connection.release();
    }
})

module.exports = db;