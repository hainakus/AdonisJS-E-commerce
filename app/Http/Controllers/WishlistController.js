'use strict'
const Wishlist = use ('App/Model/Wishlist')
const User = use('App/Model/User')
class WishlistController {
    * index(request,response){
        const user = yield User.find(request.currentUser.id)
        const wishlists = yield user.Wishlist().fetch()
        yield response.sendView('dashboard.profile.show', {wishlists: wishlists.toJSON()})
    }
    * store(request, response){
        const user = yield User.find(request.currentUser.id)
        const data = new Wishlist()
         data.title = request.input('title'),
         data.description = request.input('description'),
         data.user_id = user.id
         data.product_id = request.param('id')
         yield data.save()
       yield user.Wishlist().attach([data.id])

       yield response.redirect('back')

    }
}

module.exports = WishlistController
