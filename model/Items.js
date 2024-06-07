const mongoose = require('mongoose')
const item_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true        
    },
    message:{
        type:String, 
        required:true
    },
    category:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    image:{
        type:String, 
        required:true
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vendor'

        }
    ] 
})
const item = mongoose.model("item",item_schema)
module.exports=item