const express = require("express")
const routes = express.Router()
const item = require('../model/Items')
const model=require('../model/model')
const multer = require('multer')
const middlware = require('../middleware/tokenverify')
const path = require('path')

const storage= multer.diskStorage({
    destination: function (req, file,cb){ 
        cb(null,'uploads')  
    },
    filename: function (req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
});

const upload=multer({storage:storage});



routes.post('/add', middlware, upload.single('image'), async(req,res)=>{
    // console.log("$",req.body)

    try{ 
        // console.log("mshi",req.body)
        // console.log("mshi@",req.body.sellData) 
        // console.log("1",req.file)
        const image = req.file ? req.file.filename:undefined  
        const vender=await model.findOne(req.venderid._id)
        // console.log(req.venderid._id,"&&&")
        const {name,price,message,category,place}= await req.body
        // console.log("2",req.body,image)

        if(!vender){   
            res.send("vendor not found")
        }
        const da=new item({name,price,message,category,place,image,vendor:vender._id})
        console.log("da",da)
        const data=await da.save()
        vender.item.push(data)
        await vender.save()
        res.send("product added") 

    }
    catch(err){
        console.log(err)
    }
} )

routes.get('/all-items',async(req,res)=>{
    try{
        const Items = await item.find()
        res.send(Items)
    }
    catch(err){
        console.log(err)
    }

})
routes.get('/single-item/:id', async(req,res)=>{
    // console.log(req.params.id)
    try{
        const id =  req.params.id
        const sit = await item.findById(id)
        console.log(sit)
        return res.json(sit)

        }
    catch(err){
        console.log(err)
    }
})

routes.delete('/:itemid', async (req,res)=>{
    try{
        const id = req.params.itemid
        const delet_item = await item.findByIdAndDelete(id)
    if(!delet_item){
        return res.send("item not found")
    }
    else{
        return res.send("ok")
    }
    }
    catch(err){
        console.log(err)
    }

})

routes.get('/itemsplace/:place',async (req,res)=>{
    try{
        const place = req.params.place
        console.log(place)
        const place_items = await item.find({place: place})
        res.send(place_items)

    }
    catch(err){
        console.log(err)
    }
})
routes.get('/itemscategory/:category', async (req, res) => {
    try {
        const category = req.params.category;
        console.log(category);
        // Assuming your model has a field called 'category'
        const items = await item.find({ category: category});
        console.log(items);
        res.send(items);
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred');
    }
});
module.exports= routes