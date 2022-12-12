const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email : {type: String},
    password : {type: String},
    name: {type: String},
    age : {type: Number},
});

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
};