'use strict'
const Product = use('App/Model/Product')
class ProductsController {
        *index(request, response){
        const products = yield Product.with('images').fetch()

        yield response.send({products:products.toJSON()})
    }

}

module.exports = ProductsController
