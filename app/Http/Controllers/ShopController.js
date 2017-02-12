'use strict'
const Database = use('Database')
const Product = use('App/Model/Product')
const Category = use('App/Model/Category')
const User = use('App/Model/User')
class ShopController {
  
        * index(request, response){
    const images = yield Database.select('avatar').from('profiles')
    const products = yield Product.all()
    const categories = yield Category.all()
    var user = yield User.findOrFail(request.currentUser.id)
    const profile = user.profile().fecth()
    //const products = yield Category.query().has('products').fetch()
    yield response.sendView('shop', {images:images, products:products.toJSON(), categories:categories.toJSON(), profile:profile.toJSON()})
    }
    
}

module.exports = ShopController
