const express = require('express')
const { check } = require('express-validator')
const UserController  = require('../../Controllers/UserController/UserController')


const router = express.Router()
const iSAuthenticationUser = require('../../middleware/AuthenticationUser')


router
     .route('/')
     .get(iSAuthenticationUser,(req,res)=>{
         res.send('<h1>Hello Code Softic</h1>')
     })


// This are Signup Route  
router
   .route('/signup')
   .post(
         [
             check('name').isEmpty(),
             check('username').isEmpty().isEmpty(),
             check('email').isEmail().withMessage({
                    message: 'Not an email',
                    errorCode: 1,
                }),
            check('phoneNumber').isNumeric().isEmpty(),
            check('AlterNativeNumber').isNumeric().isEmpty(),
            check('password', 'The password must be 8+ chars long and contain a number')
                .not()
                .isIn(['123', 'password', 'god'])
                .withMessage('Do not use a common word as the password')
                .isLength({ min: 8 })
                .matches(/\d/),
            check('PasswordCofirm', 'The PasswordCofirm must be 8+ chars long and contain a number')
                .not()
                .isIn(['123', 'PasswordCofirm', 'god'])
                .withMessage('Do not use a common word as the password')
                .isLength({ min: 8 })
                .matches(/\d/),    
            
         ],
         UserController.signup
        )     



// This are Login Route    
router
.route('/login')   
.post(
       [
        check('email').isEmail().withMessage({
            message: 'Not an email',
            errorCode: 1,
        }),
        check('password', 'The password must be 8+ chars long and contain a number')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('Do not use a common word as the password')
        .isLength({ min: 8 })
        .matches(/\d/),
       ],
       UserController.login
    ) 


module.exports=router
