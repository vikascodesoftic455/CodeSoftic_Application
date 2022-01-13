require('dotenv').config();
const mongoose  =require('mongoose')
const url =process.env.DATABASE
mongoose
    .connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useUnifiedTopology:false
           
        }
     )
  .then(()=> console.log('Database Connection Sucessfully...'))



  module.exports.mongoose