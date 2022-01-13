const Product = require('../../Model/ProductSchema')
const multer  = require('multer')

multer.memoryStorage()


const addProduct =(req,res,next)=>{
     try{
           const newProduct = new Product(req.body)
           newProduct.save()
           res
              .status(201)
              .json({
                  status:'Sucess',
                  message:'Data Add SucessFully',
                  HowToCreateUsreSignup:req.requestTime,
                  data:newProduct
              })
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

module.exports.addProduct =addProduct
