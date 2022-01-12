const mongoose  =require('mongoose')

mongoose
    .connect(db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useUnifiedTopology:false
           
        }
     )
  .then(()=> console.log('Database Connection Sucessfully...'))



  module.exports.mongoose