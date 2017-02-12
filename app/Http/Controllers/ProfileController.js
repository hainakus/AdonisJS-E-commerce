'use strict'
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
const Wishlist = use('App/Model/Wishlist')
const Role = use('App/Model/Role')
const Helpers = use('Helpers')
const Product = use('App/Model/Product')
const Item = use('App/Model/Item')
const Database = use('Database')
const Image = use('App/Model/Image')
const Color = use('App/Model/Color')
class ProfileController {
    * index (request, response){
      return
    }

    * show(request, response){
        const color = yield Color.query().with('user').where('user_id', '=', request.currentUser.id)
        const admin = yield User.find(request.currentUser.id)
        const isAdmin = yield admin.role().where('role', '=', 'admin').fetch()  
    const isLoggedIn = yield request.auth.check()    
    if (isAdmin){
        const id = request.param('id');
          const user = yield User
            .query()
            .with('Wishlist.products.images')
            .where('users.id', '=', id).fetch()
                    const profile = yield Profile.query().with('user').where('user_id', '=', id).fetch()
                
                    
         const sql =  yield Database.table('products').innerJoin('items', function () {
  this
    
    .on('products.id', 'items.product_id')
}).innerJoin('images', function () {
  this
    
    .on('products.id', 'images.product_id')
})
.select('items.product_id', 'products.title', 'products.description', 'products.price', 'images.src')
.sum('items.quantity as quantityProducts')
.where('items.user_id', '=', id)
.groupBy('items.product_id', 'products.title', 'products.description', 'products.price', 'images.src')

var index;
var a = sql;
var total = 0;
var v;
for (index = 0; index < a.length; ++index) {
   v = a[index]['price'] * a[index]['quantityProducts'];
       total += v; 
}

        yield response.sendView('dashboard.profile.show', {user:user.toJSON(), profile: profile.toJSON(), sql:sql, total:total, color:color}) 
          
        }
         const userId = request.currentUser.id 
        
    const user = yield User.findOrFail(userId)
 
 
 if (isLoggedIn && !isAdmin) {
        const user = yield User
  .query()
  .with('Wishlist.products.images')
  .where('users.id','=', userId).fetch()
        const profile = yield Profile.query().with('user').where('user_id','=', userId).fetch()
        const sql =  yield Database.table('products').innerJoin('items', function () {
  this
    
    .on('products.id', 'items.product_id')
}).innerJoin('images', function () {
  this
    
    .on('products.id', 'images.product_id')
})
.select('items.product_id', 'products.title', 'products.description', 'products.price', 'images.src')
.sum('items.quantity as quantityProducts')
.where('items.user_id', '=', userId)
.groupBy('items.product_id', 'products.title', 'products.description', 'products.price', 'images.src')
var index;
var a = sql;
var total = 0;
var v;
for (index = 0; index < a.length; ++index) {
   v = a[index]['price'] * a[index]['quantityProducts'];
       total += v; 
}

       yield response.sendView('dashboard.profile.show', {user:user.toJSON(), profile: profile.toJSON(), sql:sql, total:total, color:color})
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
    
         var profile = {
          avatar :fileName,
      address:request.input('address'),
      birthdate:request.input('birthdate'),
      email:request.input('email'),
      mobile: request.input('mobile'),
      user_id:user.id
        }
      } else { 
          var profile = {
          avatar :'avatar.jpg',
      address:request.input('address'),
      birthdate:request.input('birthdate'),
      email:request.input('email'),
      mobile: request.input('mobile'),
      user_id:user.id
    }
      }
      
       yield Profile.create(profile) 
       yield response.redirect('back')
    }
    * update(request,response){
        const id = request.param('id')
        const user = yield User.findOrFail(id)
        const file = request.file('imagem')
    if (file){
     var fileName = `${new Date().getTime()}.${file.extension()}`
     
       yield file.move(Helpers.publicPath('uploads'), fileName)
      if (!file.move()){
          response.badRequest({error:file.errors()})
         
          return
      }
    
    }

        const data = {
            avatar :fileName,
      address:request.input('address'),
      birthdate:request.input('birthdate'),
      email:request.input('email'),
      mobile: request.input('mobile'),
      user_id:user.id
        } 
        
        yield Database
        .select('user_id')  
        .table('profiles')
        .where('user_id',id)
        .groupBy('user_id')
        .count('*', '>', 1)
        .distinct('user_id')
        .delete()
       yield user.profile().create(data)

       yield response.route('profile',{ id: user.id})

    }


     * checkout(request,response){
        const data = request.all()
        const id = request.param('id');
        const user = yield User.with().where({ id }).firstOrFail()

       var item = yield Database
        .select('product_id', 'cart_id', 'quantity')  
        .table('items')
        .where('product_id',request.param('id'))
        .groupBy('product_id', 'cart_id', 'quantity')
        .count('*', '>', 1)
        .distinct('product_id', 'quantity')
        .delete()
        yield response.redirect('/shop')

  }
  * bkcolor(request,response){
      const colordata = request.input('jscolor')
      const id = request.param('id');
        const color = new Color()
        color.rgba = colordata
        color.user_id = request.currentUser.id

        yield color.save(color)
        yield response.redirect('back')
  }
}

module.exports = ProfileController
