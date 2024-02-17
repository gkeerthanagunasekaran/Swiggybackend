// importing mongoose package
const mongoose = require('mongoose')

// defining the schema
const restaurantSchema = new mongoose.Schema({
    avgRatings : {
        type : Number,
        required: true
    },
    costForTwo : {
        type : String,
        required: true
    },
    foodCuisines : {
        type : Array,
        required: true
    },
    resArea : {
        type : String,
        required: true
    },
    resName : {
        type : String,
        required: true
    } 
}, {versionKey : false})

// model
const Restaurant = mongoose.model('resList', restaurantSchema)

const userSchema = new mongoose.Schema({
    
    contact :{
        type : String,
        required : true,
        unique : true
     
    },
    email :{
        type : String,
        required : true,
        unique : true
     
    },
    password :{
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    }
    
   
},{versionKey : false})
const Users = mongoose.model('Detail',userSchema)

// export model
module.exports = {Restaurant, Users}