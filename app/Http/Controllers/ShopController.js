'use strict'
const Database = use('Database')
const Product = use('App/Model/Product')
class ShopController {
  
        * index(request, response){
    const images = yield Database.select('avatar').from('profiles')
    const products = yield Product.all()
    yield response.sendView('shop', {images:images, products:products.toJSON()})
    }
    
}

module.exports = ShopController
