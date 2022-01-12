const express = require('express')
const UserController  = require('../../Controllers/UserController/UserController')

const router = express.Router()


router
     .route('/')
     .get((req,res)=>{
         res.send('<h1>Hello Code Softic</h1>')
     })


// This are Signup Route  
router
   .route('/signup')
   .post(UserController.signup)     



   // This are Login Route    
router
.route('/login')   
.post(UserController.login) 


module.exports=router
