const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const { authenticate } = require("./middlewares/authenticate");
const { todosRouter } = require("./routes/todos.route");

require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Welcome to app");
});

app.post("/signup", async (req,res) => {
    const {email, password} = req.body
    const userPresent = await UserModel.findOne({email});
    if(userPresent?.email){
        res.send("User already exist");
    }
    else{
        try{
            bcrypt.hash(password, 5, async function(err,hash) {
                const user = new UserModel({email,password : hash})
                await user.save()
                res.send("Sign up Successful");
            })
        }
        catch(err){
            console.log(err);
            res.send("Something went wrong, Please try again later");
        }
    }
});

app.post("/login", async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await UserModel.find({email});
        if(user.length>0){
            const hashed_password = user[0].password;
            bcrypt.compare(password, hashed_password, function(err, result) {
                if(result){
                    const token = jwt.sign({"userID" : user[0]._id}, process.env.KEY);
                    res.send({"msg" : "Login Successful", "token" : token});
                }
                else{
                    res.send("Login Failed");
                }
            })
        }
        else{
            res.send("Login Failed");
        }
    }
    catch(err){
        res.send("Something went wrong, please try again later");
    }
});

app.use(authenticate);

app.use("/todos", todosRouter);

app.listen(process.env.PORT, async () => {
    try{
        await connection;
        console.log("Connected to DB Succesfully");
    }
    catch(err){
        console.log("Error Connecting to DB");
        console.log(err);
    }
    console.log(`Listening to http://localhost:${process.env.PORT}`);
})