'use strict'
const Cart = use('App/Model/Cart')
const User = use('App/Model/User')
const Item = use('App/Model/Item')
const Database = use('Database')
class CartController {
    * index (request, response){
        const carts = yield Cart.all()
        yield response.sendView('dashboard.profile.show', {carts:carts.toJSON()})
    }

    * addItem (request,response){
        const user = yield User.findOrFail(request.currentUser.id)

        const carts = yield user.cart().where('user_id', '=', user.id).fetch()
            
            
        if (carts === null) {

           

         var cart = yield Cart.create({user_id:user.id})
          
        }
        if (carts){
            var cart = {id:carts.id}
        }
           
        
            
        const Nitem = new Item()
            Nitem.cart_id = cart.id,
            Nitem.product_id = request.param('id'),
            Nitem.quantity = request.input('quantity')
        
         yield Nitem.save()
        
      yield response.redirect('back')
    }
    
    * updateQuantity(request,response){
        const user = yield User.findOrFail(request.currentUser.id)
       
        const cart = yield user.cart().where('carts.user_id', '=', user.id)
        
        const data = {
       cart_id : cart[0].id,
            product_id: request.param('id'),
            quantity: request.input('quantity')
        }
    var item = yield Database
  .select('product_id', 'cart_id', 'quantity')  
  .table('items')
  .where('product_id',request.param('id'))
  .groupBy('product_id', 'cart_id', 'quantity')
  .count('*', '>', 1)
  .distinct('product_id', 'quantity')
  .delete().then(function(rows) {
  return Database.insert(data).into('items');
})
     yield response.redirect('back')
    }
    
    * removeProduct(request,response){
     const id = request.param('id');
      
      yield Database
  .table('items')
  .where('product_id',id)
  .delete()
         yield response.redirect('back')
    
    }

}

module.exports = CartController


