const model = require('../model/model')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const key = process.env.key

const tokenverify = async(req,res,next)=>{
    // console.log("1111#",req.body)
    // console.log("1111",req.body.token)
    // const token = await req.headers.token  
    //  const token = await req.body.headers.token  
    // console.log("21111",token)
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    
    if(!token){ 
        return res.send('token is not found') 
    } 
    try{
    const decode=jwt.verify(token,key)
    // console.log("3",decode)
    const vender= await model.findById(decode.id)
    // console.log("4",vender)
    if(!vender){
       return res.send("vender not found")
    }
    req.venderid=vender._id
    next()
    }
    catch(err){
        res.send("invalid token")
    }
}
module.exports=tokenverify