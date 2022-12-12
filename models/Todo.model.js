const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    taskname : {type: String},
    status : {type: String, enum : ['pending', 'done'], default: 'done'},
    tag : {type: String, enum : ['personal', 'official', 'family'], default: 'official'},
    userID : {type: String}
});

const TodoModel = mongoose.model("todo", todoSchema)

module.exports = {
    TodoModel
};