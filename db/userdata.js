const mongoose = require("mongoose");
const validator = require('validator');

mongoose.connect("mongodb://localhost:27017/Kushdynamic",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection successful");
}).catch((error)=>{
    console.log(error);
})


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    message:{
        type:String,
        required:true,
        minLength:3
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// we need a collection
const User = mongoose.model("User",userSchema);

module.exports = User;