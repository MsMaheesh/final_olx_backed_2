const express = require("express")
const dotenv= require('dotenv')
const mongoose= require('mongoose')
const person_routes= require('./routes/person_routes')
const item_routes= require('./routes/item_routes')
const cors = require('cors')

    
const app = express()  
app.use(express.json())
const port=4444      
app.use(cors()) 

// Set up static file serving
app.use(express.static('uploads'));
      
dotenv.config() 
app.use('/person',person_routes)
app.use('/item',item_routes) 

  
mongoose.connect(process.env.url)
.then(()=>{
    console.log("mongoose connected sucessfully")
})
.catch((err)=>{ 
    console.log(err)
})



app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`server running on the ${port} port`)
}) 