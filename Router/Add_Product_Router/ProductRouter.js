const express = require('express')
const Product =require('../../Controllers/ProductControllers/ProductController')

const router = express.Router()

const iSAuthenticationUser =require('../../middleware/AuthenticationUser')



router
      .route('/Product')
      .post(iSAuthenticationUser,Product.addProduct)
      .get()

module.exports= router    