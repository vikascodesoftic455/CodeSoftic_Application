const BusinessUser =require('../../Model/BusinessUserSchema')
const bcrypt =require('bcrypt')

const signup = async(req,res,next)=>{
    try{ 
           const { name,username, email,phoneNumber,AlterNativeNumber, password , PasswordCofirm } = req.body

           let existingUser
                try{
                       existingUser = await BusinessUser.findOne({Email:email})
                }catch(err){
                    res
                         .status(500)
                         .json({
                             status:"fail",
                             message:err,
                            HowToCreateUsreSignup:req.requestTime
                         })
                }    
//*******************************check user already exits ya not************************************************************************************************ */
                    if(existingUser){
                       res
                           .status(201)
                           .json({
                               status:'Sucess',
                               message:'User is already exits',
                               HowToCreateUsreSignup:req.requestTime
                           })
                    }

//********************************************hashpassword hacker cannot be hack the password******************************************************** */  
          let hashpassword
              try{ 
                    hashpassword = await bcrypt.hash(password,12)
                 }
                catch(err){
                    res
                    .status(201)
                    .json({
                        status:'Fail',
                        message:err,
                        HowToCreateUsreSignup:req.requestTime
                    })
                }        
          const newUser  = new BusinessUser(
                        {
                            Name:name,
                            UserName:username,
                            Email:email,
                            PhoneNumber:phoneNumber,
                            AlterNativePhoneNumber:AlterNativeNumber,
                            Password:hashpassword
                        }
                   )
//*******************************************Before Data Save from database so Comparing the Password And Confirm Password  are Same Ya Not******************************************************************************************************************** */                   
                    if(password===PasswordCofirm){
                        //************password and confirm password are same so the Svae thr ftom database And Respone back**********************/
                        newUser.save()
                        res
                           .status(201)
                           .json({
                            status:"Sucess",
                             HowToCreateUsreSignup:req.requestTime,
                                data:{   
                                    user:newUser
                                }
                            })
                    }else{
                        //*******************************Not Same So error Are Show and response Back fail msg */
                        res
                          .status(400)
                          .json({
                              status:'Fail',
                              message:"Password And Confirm Password Not Be Match && Please Fill THE Password and Confirm Password Also Same",
                              HowToCreateUsreSignup:req.requestTime,
                          })
                    }
                
    }catch(err){
              res
                  .status(500)
                  .json({
                  status:"fail",
                  message:err,
                  HowToCreateUsreSignup:req.requestTime
              })
    }
}

const login = async(req,res,next)=>{
  try{
      const {email,password} =req.body
        if(!email || !password){
            res
                .status(400)
                .json({
                    status:'fail',
                    message:"'please provide the email && password'"

                })
        }
      let User 
            try{
                User = await BusinessUser.findOne({Email:email})
            }catch(err){
               res
                .status(501)
                .json({
                    status:"fail",
                    HowToCreateUsreSignup:req.requestTime,
                    data:{
                      err
                    }
                })
            } 
            if(!User){
                res
                    .status(400)
                    .json({
                    status:"fail",
                    HowToCreateUsreSignup:req.requestTime,
                    msg:`User Does Not extis Please Signup`
                })
            }

      const match = await bcrypt.compare(password,User.password)  
        if(match){
            let token 
                    try{
                        token  = jwt.sign({
                             UserId:User.id,
                             Name:User.Name,
                             UserName:User.UserName,
                             Email:User.Email,
                             PhoneNumber:User.PhoneNumber,
                             Staus:User.Active
                        },SecretKey,{ expiresIn :'1h' })
                    }
                    catch(err){
                        res
                        .status(501)
                        .json({
                            status:"fail",
                            HowToCreateUsreSignup:req.requestTime,
                            data:{
                              err
                            }
                        })
                    }
                    res.json({
                        message:"User logged in successfully",
                            UserId:User.id,
                             Name:User.Name,
                             UserName:User.UserName,
                             Email:User.Email,
                             PhoneNumber:User.PhoneNumber,
                             Staus:User.Active
                       })         
        }else{
            res
            .status(501)
            .json({
                status:"fail",
                HowToCreateUsreSignup:req.requestTime,
                data:{
                  err
                }
            })
        }               


  }catch(err){
        res
        .status(501)
        .json({
            status:"fail",
            HowToCreateUsreSignup:req.requestTime,
            data:{
              err
            }
        })
  }
}


const signoput  =()=>{
    console.log("logout")
}



module.exports.signup =signup
module.exports.login=login
