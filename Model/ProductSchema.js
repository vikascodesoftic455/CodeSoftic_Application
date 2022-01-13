const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
        ProductName:{
            type:String
        },
        Maximum_Retail_Price:{
            type:Number
        },
        CoverImage:String,
        Images:[String],
        Price:{
            type:Number
        },
        Discount:{
            type:Number
        },
        email:{
            type:String
        },
        PhoneNumber:{
             type:Number
        },    
        Colour:{
            type:String
        },
        Ink_Colour:{
            type:String
        },
        Brand:{
            type:String
        },
        Material:{
            type:String
        },
        Item_Dimensions:{
            type:String
        },
        Manufacturer:{
            type:String
        },
        Model_Number:{
            type:Number
        },
        Closure:{
            type:String
        },
        Grip_Type:{
            type:String
        },
        Number_of_Items:{
            type:Number
        },
        Size:{
            type:String
        },
        Capacity:{
            type:String
        },
        Point_Type:{
            type:String
        },
        Manufacturer_Part_Number:{
            type:String
        },
        Country_of_Origin:{
            type:String
        },
        Imported_By:{
            type:String
        },
        ASIN:{
            type:String
        },
        Customer_Reviews:{
            type:String
        },
        Best_Sellers_Rank:{
            type:String
        },
        Date_First_Available:{
            type:Date
        },
        Packer:{
            type:String
        },
        Importer:{
            type:String
        },
        Item_Weight:{
            type:String
        },
        Net_Quantity:{
            type:Number
        },
     Product_description:{
         type:String
        },
        createdate:{
            type:Date,
            default:Date.now(),
            select:false
        }
})


const Product = new mongoose.model('Product',ProductSchema)

module.exports = Product