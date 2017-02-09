'use strict'
const Event = use('Event')
const User = use('App/Model/User');
const Product = use('App/Model/Product');
const Image = use('App/Model/Image');
const Helpers = use('Helpers');
const Category = use('App/Model/Category')
const Wishlist = use('App/Model/Wishlist')
const Database = use('Database')
class APIControllers {
    * index (request, response){
        const products = yield Category.query().with('products').fetch()
        yield response.json( {Categories: products.toJSON() }) 
    }
    * show (request, response){
        const product = yield Product.findOrFail(request.param('id'))
        const images = yield product.images().fetch()
  
     
     
         yield response.json({ product: product.toJSON(), images:images.toJSON() })
    }
    
    * store (request, response){
        const postdata = request.all() 
      
        var index;
        var a = postdata.images;
        var v;
        var file;
for (index = 0; index < a.length; ++index) {
   v = a[index]['src'];
   if (v!== undefined) {
       file = v; 
}
}
            
         const data = {
               src: file
           }
           
    
      const product = new Product()
      product.title = postdata.product.title,
      product.description = postdata.product.description,
      product.sku = postdata.product.sku,
      product.price = postdata.product.price
      
      yield product.save(product)   
      
       yield product.images().create(data) 
       
        
    
        response.json(product)
    }
   
    * update(request, response){
      const datap = request.all() 
      const product = yield Product.with().where({ id: datap.id }).firstOrFail();
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

module.exports = APIControllers
