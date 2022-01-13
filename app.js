require('dotenv').config();
const express = require('express')
const functions = require("firebase-functions");
const db = require('./DB/Db')
const UserRoute = require('./Router/BusinessUserRoutes/UserRoute')
const ProductRoute =require('./Router/Add_Product_Router/ProductRouter')
const app = express()

const port =process.env.PORT


//*********************Midlleware********************** */
app.use(express.urlencoded({extended:false}))
app.use(express.json())
           
 const logger =(req,res,next)=>{
     req.requestTime = new Date().toISOString()
     next()
 }
 app.use(logger)


app.use('/',UserRoute)
app.use('/api',ProductRoute)


app.listen(port,()=>{
    console.log(`Server is running ${port}`)
    //  if (
    //     environment !== "production" &&
    //     environment !== "development" &&
    //     environment !== "testing"
    //   ) {
    //     console.error(
    //       `NODE_ENV is set to ${environment}, but only production and development are valid.`
    //     );
    //     process.exit(1);
    //   }
})




exports.app = functions.https.onRequest(app);
