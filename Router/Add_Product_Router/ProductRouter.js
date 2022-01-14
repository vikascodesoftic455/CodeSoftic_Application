const express = require('express')
const { get } = require('mongoose')
const Product =require('../../Controllers/ProductControllers/ProductController')

const router = express.Router()

const iSAuthenticationUser =require('../../middleware/AuthenticationUser')


router
     .route('/')
     .get(Product.getAllProduct)


router
      .route('/Product')
      .post(
            iSAuthenticationUser,
            Product.uploadProductImage,
            Product.resizeImage,
            Product.addProduct
            )

module.exports= router    