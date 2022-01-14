const Product = require('../../Model/ProductSchema')
const multer  = require('multer')
const sharp = require('sharp');
const multerStorae=multer.memoryStorage()

//Filter file with multer
const multerFilter =(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload =multer({
     storage:multerStorae,
     fileFilter:multerFilter
})




// multer Fields
const uploadProductImage =upload.fields([
    {name:"CoverImage",maxCount:1},
    {name:"Images",maxCount:5}
])

const  resizeImage = async(req,res,next)=>{
    const Uploadpath =`./public/CoverImage/`
    const fileUrl =`images-$-${Date.now()}-cover.jpg`;

    //1) cover image
     const data =   await sharp(req.files.CoverImage[0].buffer)
          .resize(2000, 1300)
          .toFormat('jpg')
          .jpeg({ quality: 90 })
          .toFile(`${Uploadpath}/${fileUrl}`); 

     //Multiple Image
       req.body.images =[]
          req.files.Images.map(async(file,i)=>{
            const Uploadpath =`./public/Images/`
             const filename = `images-S-${Date.now()}-${i + 1}.jpg`;
                await sharp(file.buffer)
                    .resize(2000, 1300)
                    .toFormat('jpg')
                    .jpeg({ quality: 90 })
                    .toFile(`${Uploadpath}/${filename}`);
                
                req.body.images.push(filename)         
         })
        next()   
}
const addProduct =(req,res,next)=>{
    console.log(req.files.CoverImage.originalname)
    let finalImage=[]
     req.files.Images.map(async(file,i)=>{
        const filename = `images-S-${Date.now()}-${req.files.originalname}-${i + 1}.jpg`;
        finalImage.push(filename)
     })
      console.log(finalImage)

     try{
           const newProduct = new Product({
             ProductName:req.body.ProductName,
             Maximum_Retail_Price:req.body.Maximum_Retail_Price,
             Image:finalImage
           })
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

const getAllProduct =async(req,res,next)=>{
      try{
           const product =await Product.find()
             res
                .status(200)
                .json({
                    status:"Sucess",
                    HowToCreateUsreSignup:req.requestTime,
                    data:product
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
module.exports.uploadProductImage=uploadProductImage
module.exports.resizeImage=resizeImage
module.exports.getAllProduct=getAllProduct