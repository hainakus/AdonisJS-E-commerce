'use strict'
const Event = use('Event')
const User = use('App/Model/User');
const Product = use('App/Model/Product');
const Image = use('App/Model/Image');
const Helpers = use('Helpers');
const Category = use('App/Model/Category')
const Wishlist = use('App/Model/Wishlist')
const Database = use('Database')
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
     const wishlists = yield Wishlist.query('user').where('user_id', '=', request.currentUser.id).fetch()
         yield response.sendView('product.show', { product: product.toJSON(), images:images.toJSON(),
              productImages:productImages.toJSON(), productIs:productIs.toJSON(),
               categories:categories.toJSON(), wishlists:wishlists.toJSON() })
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
    * destroy(request,response){
      const id = request.param('id');
      const wishlistID = yield Database.from('product_wishlist').where('product_id', '=', id)
      const product = yield Product.find(wishlistID[0].product_id)
      yield Database
  .table('product_wishlist')
  .where('id', wishlistID[0].id)
  .delete()
         yield response.redirect('back')
    
    }

    * addToWishlist(request,response){
      const id = request.param('id');
      const product = yield Product.find(id)
      const wishID = request.input('wishlist')
      const wishlist = yield Wishlist.find(wishID);
      const user = request.currentUser
      yield wishlist.products().attach([product.id])
      yield response.redirect('back')
    }
}

module.exports = ProductController
