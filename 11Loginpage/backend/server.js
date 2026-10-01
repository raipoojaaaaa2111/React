// import express from "express"/
const express = require("express")
// import dotenv from "dotenv"
const dotenv = require("dotenv")
const cors = require("cors")
const bcrypt = require("bcryptjs")

dotenv.config()
 const db = require("./db")

console.log("Hii")


const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})
const handleDatabaseError = (res, err, operation) => {
    console.error(`${operation} failed:`, err.message)
    if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "This email is already registered. Please log in instead." })
    }
    if (err.fatal || ["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "PROTOCOL_CONNECTION_LOST"].includes(err.code)) {
        return res.status(503).json({ message: "Database unavailable. Check the database connection." })
    }
    return res.status(500).json({ message: "Request failed. Please try again." })
}

const sendLoginSuccess = (res, user) => {
    res.status(200).json({
        message: "Login successful",
        user: { name: user.name, email: user.email },
    })
}

app.post("/signup", async (req,res)=>{
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." })
    }

    let passwordHash;
    try {
        passwordHash = await bcrypt.hash(password, 12)
    } catch (err) {
        console.error("Password hashing failed:", err.message)
        return res.status(500).json({ message: "Signup failed. Please try again." })
    }

    const q = "INSERT INTO users (`name`,`email`,`password`) VALUES (?, ?, ?)"
    const values = [name, email, passwordHash]
    db.query(q, values, (err)=>{
        if(err){
            return handleDatabaseError(res, err, "Signup")
        }
        return res.status(201).json({ message: "User registered successfully" })
    })
})

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." })
    }

    db.query("SELECT name, email, password FROM users WHERE email = ?", [email], (err, rows) => {
        if (err) {
            return handleDatabaseError(res, err, "Login")
        }
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password." })
        }

        const user = rows[0]
        const isBcryptHash = /^\$2[aby]\$\d{2}\$/.test(user.password)
        const passwordCheck = isBcryptHash
            ? bcrypt.compare(password, user.password)
            : Promise.resolve(password === user.password)

        passwordCheck.then((matches) => {
            if (!matches) {
                return res.status(401).json({ message: "Invalid email or password." })
            }
            if (isBcryptHash) {
                return sendLoginSuccess(res, user)
            }

            return bcrypt.hash(password, 12).then((passwordHash) => {
                db.query("UPDATE users SET password = ? WHERE email = ?", [passwordHash, email], (updateError) => {
                    if (updateError) {
                        return handleDatabaseError(res, updateError, "Password upgrade")
                    }
                    return sendLoginSuccess(res, user)
                })
            })
        }).catch((hashError) => {
            console.error("Password verification failed:", hashError.message)
            if (!res.headersSent) {
                res.status(500).json({ message: "Login failed. Please try again." })
            }
        })
    })
})
app.listen( 8800,()=>{
    console.log("Backend server is running")
})
