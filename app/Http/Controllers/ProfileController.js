'use strict'
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
const Wishlist = use('App/Model/Wishlist')
const Role = use('App/Model/Role')
const Helpers = use('Helpers')
const Product = use('App/Model/Product')
const Item = use('App/Model/Item')
const Database = use('Database')
class ProfileController {
    * index (request, response){
      return
    }

    * show(request, response){
       
    const admin = yield User.find(1)
        const isAdmin = yield admin.role().where('role', '=', 'admin').fetch()  
    const isLoggedIn = yield request.auth.check()    
    if (isAdmin.id == request.currentUser.id) {
        const id = request.param('id');
          const user = yield User
            .query()
            .with('Wishlist.products')
            .where('users.id', '=', id).fetch()
                    const profile = yield Profile.query().with('user').where('user_id', '=', id).fetch()
                     const carts = yield User
            .query()
            .with('Items.products')
            .where('users.id', '=', id).fetch()
        const sql = yield Database.schema.raw("SELECT  p.product_id, s.title, s.description, s.price, sum(p.quantity) as SumProductQuantity FROM products as S JOIN items as p on S.id = p.product_id WHERE p.quantity > 1 GROUP BY s.title, s.description, s.price,  p.product_id")
       

        yield response.sendView('dashboard.profile.show', {user:user.toJSON(), profile: profile.toJSON(), carts:carts.toJSON(), sql:sql}) 
          
        }
         const userId = request.currentUser.id 
        
    const user = yield User.findOrFail(userId)
 
 
 if (isLoggedIn && isAdmin.id !== userId) {
        const user = yield User
  .query()
  .with('Wishlist.products')
  .where('users.id','=', userId).fetch()
        const profile = yield Profile.query().with('user').where('user_id','=', userId).fetch()
         const carts = yield Cart.query().with('user').where('user_id', '=', userId).fetch()
        yield response.sendView('dashboard.profile.show', {user:user.toJSON(), profile: profile.toJSON(), carts:carts.toJSON()})
    } 
    
        yield response.status(403).send(request.currentUser.id)
       
    }
    * create(request, response){
         yield response.sendView('dashboard.profile.create')
    }
    * store(request,response) {
        const id = request.param('id');
        const user = yield User.with().where({ id }).firstOrFail();
    const file = request.file('imagem')
     const fileName = `${new Date().getTime()}.${file.extension()}`
     
       yield file.move(Helpers.publicPath('uploads'), fileName)
      if (!file.move()){
          response.badRequest({error:file.errors()})
         
          return
      }

         const profile = {
          avatar :fileName,
      address:request.input('address'),
      birthdate:request.input('birthdate'),
      email:request.input('email'),
      mobile: request.input('mobile'),
      user_id:user.id
      }
      
       yield Profile.create(profile) 
       yield response.redirect('back')
    }
}

module.exports = ProfileController
