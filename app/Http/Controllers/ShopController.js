'use strict'
const Database = use('Database')
const Product = use('App/Model/Product')
const Category = use('App/Model/Category')
class ShopController {
  
        * index(request, response){
    const images = yield Database.select('avatar').from('profiles')
    const products = yield Product.all()
    const categories = yield Category.all()
    //const products = yield Category.query().has('products').fetch()
    yield response.sendView('shop', {images:images, products:products.toJSON(), categories:categories.toJSON()})
    }
    
}

module.exports = ShopController
