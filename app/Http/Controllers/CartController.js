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

        const userCart = yield user.Items().first()
            
            
        if (userCart === null) {

           

         const cart = yield Cart.create({user_id:user.id})
          
          const data = {
            cart_id : cart.id,
            product_id: request.param('id'),
            quantity: request.input('quantity')
        }
            var item = yield Item.create(data)
           
        }
            
        const Nitem = new Item()
            Nitem.cart_id = userCart.cart_id,
            Nitem.product_id = request.param('id'),
            Nitem.quantity = request.input('quantity')
        
         yield Nitem.save()
       
      yield response.redirect('back')
    }
    
    * updateQuantity(request,response){
        const user = yield User.findOrFail(request.currentUser.id)
       
        const userCart = yield user.Items().first()
        
        const data = {
       cart_id : userCart.cart_id,
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


