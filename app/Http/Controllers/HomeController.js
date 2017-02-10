'use strict'

const Product = use('App/Model/Product')
const Database = use('Database')
class HomeController {
    * index(request, response){
    const images = yield Database.table('images')
    const products = yield Product.all()
    yield response.sendView('welcome', {images:images, products:products.toJSON()})
    }
}

module.exports = HomeController
