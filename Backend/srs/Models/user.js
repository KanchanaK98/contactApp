const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: 'string',
        required: true
    },
    role:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    contact:{
        type: 'string',
        required: true
    },
    address:{
        type: 'string',
        required: true
    },
    picture:{
        type: 'string',
        required: true
    }

});

const User = mongoose.model("User",userSchema);
module.exports = User;