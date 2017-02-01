'use strict'
const Product = use('App/Model/Product');
const Image = use('App/Model/Image');
const Helpers = use('Helpers');
class ProductController {
    * index (request, response){
        const products = yield Product.all();
        yield response.sendView('shop', { products: products.toJSON() }) 
    }
    * show (request, response){
        const product = yield Product.findOrFail(request.param('id'))
        const images = yield product.images().fetch()
         yield response.sendView('product.show', { product: product.toJSON(), images:images.toJSON() })
    }
    * create (request, response){
        yield response.sendView('product.create')
    }
    * store (request, response){
        const postData = request.only('title', 'description', 'sku', 'price') 
         const file = request.file('image')
        const fileName = `${new Date().getTime()}.${file.extension()}`
     
       yield file.move(Helpers.publicPath('uploads'), fileName)
      if (!file.move()){
          response.badRequest({error:file.errors()})
         
          return
      }
      const product = new Product()
      product.title = request.input('title'),
      product.description = request.input('description'),
      product.sku = request.input('sku'),
      product.price = request.input('price')
      
      yield product.save(product)   
      
      const image = new Image()
      
       image.src = fileName, 
       image.product_id = product.id
      
      yield product.images().save(image) 
       
        
    
        response.redirect('/')
    }
   
    
}

module.exports = ProductController
