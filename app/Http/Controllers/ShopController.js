'use strict'
const Database = use('Database')
const Product = use('App/Model/Product')
const Category = use('App/Model/Category')
class ShopController {
  
        * index(request, response){
    const images = yield Database.select('avatar').from('profiles')
    const products = yield Database
  .from('products')
  .forPage(1, 10)
    const categories = yield Category.all()
    //const products = yield Category.query().has('products').fetch()
    yield response.sendView('shop', {images:images, products:products, categories:categories.toJSON()})
    }
    
}

module.exports = ShopController
