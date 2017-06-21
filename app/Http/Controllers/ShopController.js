'use strict'
const Database = use('Database')
const Product = use('App/Model/Product')
const Category = use('App/Model/Category')
const User = use('App/Model/User')
class ShopController {
  
        * index(request, response){
    const images = yield Database.select('avatar').from('profiles')
    const products = yield Product.with('images', 'categories').fetch()
    const categories = yield Category.with('products').fetch()
    //var user = yield User.findOrFail(request.currentUser.id)
    //const profile = user.profile().fecth()
    //const products = yield Category.query().has('products').fetch()
    yield response.sendView('shop', {products:products.toJSON(), categories:categories.toJSON()})
    }
     * shop(request, response){
    const images = yield Database.select('avatar').from('profiles')
    const products = yield Product.with('images', 'categories').fetch()
    const categories = yield Category.with('products').fetch()
    //var user = yield User.findOrFail(request.currentUser.id)
    //const profile = user.profile().fecth()
    //const products = yield Category.query().has('products').fetch()
    yield response.send({ products:products.toJSON()})
    }
}

module.exports = ShopController
