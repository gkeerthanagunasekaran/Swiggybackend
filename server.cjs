const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const {Restaurant} = require('./schema.cjs')

const app = express()
app.use(bodyParser.json())
app.use(cors())


async function connectToDb() {
    try{
        await mongoose.connect('mongodb+srv://Keerthana:0423Keerthu@cluster0.2szxvqv.mongodb.net/swiggy?retryWrites=true&w=majority')
        console.log('DB connection established')
        const port = process.env.Port || 8000
            app.listen(port, function(request, response){
            console.log(`Listening on port ${port}...`)
})
    }catch(error){
            console.log(error)
            console.log('couldn\'t establish the connection')
    }
}
connectToDb()

app.post('/add-restaurants', async function(request, response){
    try {
        await Restaurant.create({
            "avgRatings" : request.body.avgRatings,
            "costForTwo" : request.body.costForTwo,
            "foodCuisines" : request.body.foodCuisines,
            "resArea" : request.body.resArea,
            "resName" : request.body.resName
        })
        response.status(201).json({
            "status" : "success",
            "message" : "restaurant entry successful"
            
        })
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "restaurant entry unsuccessful",
            "error" : error
        })
    }
})
app.get('/get-restaurant-details', async function(request, response){
    try{
      const restaurantDetails = await Restaurant.find()
     response.status(200).json(restaurantDetails)
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch",
            "error" : error
        })
    }
})

app.delete('/delete-restaurant-detail/:id',async function(request,response){
    try{
       const restaurant = await Restaurant.findById(request.params.id)
       if(restaurant){
        await Restaurant.findByIdAndDelete(request.params.id)
        response.status(201).json({
            "status" : "success",
            "message" : "deleted successfully"
            })
       }
       else{
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not found"
        })
       }
        
    } catch (error){
 response.status(500).json({
            "status" : "failure",
            "message" : "could not delete",
            "error" : error
        })
    }
})

app.post('/create-new-user', async function(request, response) {
    try {
         await Users.create({
             
             "contact" : request.body.contact,
             "email" : request.body.email,
             "password" : request.body.password,
             "userName" : request.body.username
         })
         response.status(201).json({
         "status" : "success",
         "message" : "user created"
         })
    } catch(error) {
         response.status(500).json({
             "status" : "failure",
             "message" : "internal server error"
         })
    }
 })
 
 app.post('/validate-user', async function(request, response) {
 try{
     const user = await Users.findOne({
        "email" : request.body.email,
        "password" : request.body.password

     })
     if(user){
        response.status(200).json({
            "message" : "valid user"
        })
     }
     else{
        response.status(401).json({
            "message" : "invalid user"
        })
     }
 } catch(error){
    response.status(500).json({
        "message" : "internal server error"
    })
 }
 })