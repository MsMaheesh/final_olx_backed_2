const mongoose = require('mongoose')
const vender_register = new mongoose.Schema({
    name:{
        type:String,
        required:true  
    },
    email:{
        type:String,                  
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    item:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"item"
        }
    ]

})
const vendor=mongoose.model("vender-register",vender_register)
module.exports=vendor