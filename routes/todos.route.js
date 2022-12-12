const express = require("express");

const {TodoModel} = require("../models/Todo.model");

const todosRouter = express.Router();

todosRouter.get("/", async (req,res) => {
    const todos = await TodoModel.find();
    res.send(todos);
});

todosRouter.post("/create", async (req,res) => {
    const payload = req.body;
    console.log(req.body);
    try{
        const new_todo =  TodoModel(payload);
        await new_todo.save();
        res.send({"msg" : "Todo Added successfully"})
    }
    catch(err){
        console.log(err);
        res.send({"err" : "Something went wrong"})
    }
});

todosRouter.patch("/update/:todoID", async (req,res) => {
    const todoID = req.params.todoID
    const userID = req.body.userID
    const todo = await TodoModel.findOne({_id: todoID})
    if(userID !== todo.userID){
        res.send("Not authorized");
    }
    else{
        await TodoModel.findByIdAndUpdate({_id : todoID}, payload)
        res.send({"msg" : "Note updated succesfully"});
    }
});


todosRouter.delete("/delete/:todoID", async (req,res) => {
    const todoID = req.params.todoID
    const userID = req.body.userID
    const todo = await TodoModel.findOne({_id: todoID})
    if(userID !== todo.userID){
        res.send("Not authorized");
    }
    else{
        await TodoModel.findByIdAndDelete({_id : todoID})
        res.send({"msg" : "Note deleted succesfully"});
    }
});

module.exports = {todosRouter}