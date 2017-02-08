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
                
        
        const sql =  yield Database.table('products').innerJoin('items', function () {
  this
    
    .on('products.id', 'items.product_id')
})
.select('items.product_id', 'products.title', 'products.description', 'products.price')
.sum('items.quantity as quantityProducts')
.where('items.quantity', '>=', 1, 'items.user_id', '=', id)
.groupBy( 'products.title', 'products.description', 'products.price','items.product_id')

var index;
var a = sql;
var total = 0;
var v;
for (index = 0; index < a.length; ++index) {
   v = a[index]['price'] * a[index]['quantityProducts'];
       total += v; 
}

        yield response.sendView('dashboard.profile.show', {user:user.toJSON(), profile: profile.toJSON(), sql:sql, total:total}) 
          
        }
         const userId = request.currentUser.id 
        
    const user = yield User.findOrFail(userId)
 
 
 if (isLoggedIn && isAdmin.id !== userId) {
        const user = yield User
  .query()
  .with('Wishlist.products')
  .where('users.id','=', userId).fetch()
        const profile = yield Profile.query().with('user').where('user_id','=', userId).fetch()
        const sql =  yield Database.table('products').innerJoin('items', function () {
  this
    
    .on('products.id', 'items.product_id')
})
.select('items.product_id', 'products.title', 'products.description', 'products.price')
.sum('items.quantity as quantityProducts')
.groupBy('items.product_id', 'products.title', 'products.description', 'products.price')
var index;
var a = sql;
var total = 0;
var v;
for (index = 0; index < a.length; ++index) {
   v = a[index]['price'] * a[index]['quantityProducts'];
       total += v; 
}

       yield response.sendView('dashboard.profile.show', {user:user.toJSON(), profile: profile.toJSON(), sql:sql, total:total})
    } 
    
        yield response.status(403).send('come back later')
       
    }
    * create(request, response){
         yield response.sendView('dashboard.profile.create')
    }
    * store(request,response) {
        const id = request.param('id');
        const user = yield User.with().where({ id }).firstOrFail();
    const file = request.file('imagem')
    if (file){
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
      } 
          const profile = {
          avatar :'avatar.jpg',
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
