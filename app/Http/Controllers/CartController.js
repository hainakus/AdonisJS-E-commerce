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

        const Cart = yield user.Items().where('items.cart_id', '>=', 1)
            
            
        if (Cart=== null) {

           

         var cart = yield Cart.create({user_id:user.id})
          
        }
        if (Cart){
            var cart = {id:Cart.cart_id}
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
       
        const Cart = yield user.Items().where('items.cart_id', '>=', 1)
        
        const data = {
       cart_id : Cart.cart_id,
            product_id: request.param('id'),
            quantity: request.input('quantity')
        }
    var item = yield Database
  .table('items')
  .where('product_id', request.param('id'))
  .update(data)
  
     yield response.redirect('back')
    }


}

module.exports = CartController


