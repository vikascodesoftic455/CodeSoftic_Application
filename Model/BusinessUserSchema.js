const { trim } = require('lodash')
const mongoose = require('mongoose')
const validator = require('validator');

const BusinessUserSchema  = mongoose.Schema({
    Name:{
        type:String,
        required:[true,'Please tell us your name'],
    },
    UserName:{
        type:String,
        required:true,
        unique:[true,'This UserName is Already registerd && Please fill to an another UserName '],   
        minLength:[5,'User Name should be min 3 letter'],
        maxLength: [25,'name should be max 15 letter'],
        trim:true    
    },
    Email:{
        type:String,
        required:true,
        unique:[true,'This Email is Already registerd && Please fill to an another Email'],
        minLength:[3,'name should be min 3 letter'],
        maxLength: [25,'name should be max 15 letter'],
        validate:[validator.isEmail,'Please provide a valid email'],
        trim:true
    },
    PhoneNumber:{
        type:Number,
        required:true,
        unique:[true,'This Phone  is Already registerd && Please fill to an another Phone Number'],
        min:[10,'pHONE NUMBER Should be 10 digit']
    },
    AlterNativePhoneNumber:{
        type:Number
    },
    Password:{
        type:String,
        required:[true,'Please provide a  password'],
        minlength:8,
    },
    Active:{
        type:Boolean,
        default:true,
        select:false
    },
    createdate:{
        type:Date,
        default:Date.now()
    }

})



const BusinessUser =new mongoose.model('BusinessModel',BusinessUserSchema)

module.exports=BusinessUser