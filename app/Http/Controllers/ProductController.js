'use strict'
const Product = use('App/Model/Product');
const Image = use('App/Model/Image');
const Helpers = use('Helpers');
const Category = use('App/Model/Category')
class ProductController {
    * index (request, response){
        const products = yield Category.with('products').fecth();
        yield response.sendView('shop', { products: products.toJSON() }) 
    }
    * show (request, response){
        const product = yield Product.findOrFail(request.param('id'))
        const images = yield product.images().fetch()
     const productImages = yield Image.all()
     const categories = yield Category.all() 
     const productIs = yield Product.query().has('images').fetch()
         yield response.sendView('product.show', { product: product.toJSON(), images:images.toJSON(), productImages:productImages.toJSON(), productIs:productIs.toJSON(), categories:categories.toJSON() })
    }
    * create (request, response){
        yield response.sendView('product.create')
    }
    * store (request, response){
        const postData = request.all() 
      
         const file = request.file('imagem')
            const fileName = `${new Date().getTime()}.${file.extension()}`
            
            yield file.move(Helpers.publicPath('uploads'), fileName)
            if (!file.move()){
                response.badRequest({error:file.errors()})
                
                return
            }
         const data = {
               src: fileName
           }
           
    
      const product = new Product()
      product.title = request.input('title'),
      product.description = request.input('description'),
      product.sku = request.input('sku'),
      product.price = request.input('price')
      
      yield product.save(product)   
      
       yield product.images().create(data) 
       
        
    
        response.redirect('back')
    }
   
    * update(request, response){
      const id = request.param('id');
      const product = yield Product.with().where({ id }).firstOrFail();
      const data = new Product()
        product.title = request.input('title'),
        product.description = request.input('description'),
        product.sku = request.input('sku'),
        product.price = request.input('price')  
      
      const dataCat = request.input('category')
          
        
      

      yield product.save(data)
      yield product.categories().sync([dataCat])
     
      response.redirect('back')
    }
}

module.exports = ProductController
