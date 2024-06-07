const express = require("express")
const path = require('path')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const routes = express.Router()
const model=require('../model/model')


dotenv.config()
const key = process.env.key

routes.post('/register',async(req,res)=>{
    console.log(req.body)
    const {name,email,password}=req.body
    try{
        let exist = await model.findOne({email})
        let exist1 = await model.findOne({password})
        if(exist){
            return res.send('email already resiater')
        }
        if(exist1){ 
            return res.send('password already resiater')
        }
        const da=new model({name, email, password})
        await da.save()
        res.send("register successfully")
    }
    catch(err){
        console.log(err)
    }
})

routes.post('/login',async(req,res)=>{
    const {email,password}=req.body
    let exist = await model.findOne({email})
    // console.log(exist.password)
    try{
        if (!exist){
            res.send("email")
        }
        else if (exist.password != password) {
            res.send("password")
        }
        else{
            // res.send("login sucessfully")
            const token=jwt.sign({id:exist._id},key)
            res.status(200).json({token,'personid':exist._id})
            console.log("id",exist._id)
        }
        // const token=jwt.sign({id:exist._id},key)
        // res.send(token)

    }
    catch (err){
        console.log(err)
    }
})

routes.get('/items/:id',async(req,res)=>{
    try{
        const id = await req.params.id
        const pi = await model.findById(id).populate('item')

        if(!pi){
            return res.send("person not found")
        }
        else{
            return res.send(pi.item)
        }
    }
    catch(err){
        console.log(err)
    }
})

routes.get('/uploads/:image',(req,res)=>{
    const imagename = req.params.image;
    console.log("imagename", imagename)
    const imagePath = path.join(__dirname, '..', 'uploads', imagename);
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(err.status || 500).send('Error sending file');
        }
    });
})


module.exports= routes