'use strict'
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
const Wishlist = use('App/Model/Wishlist')
const Helpers = use('Helpers')
const Product = use('App/Model/Product')
class ProfileController {
    * index (request, response){
      return
    }

    * show(request, response){
      
        
    const id = request.param('id');
        const user = yield User
  .query()
  .with('Wishlist.products')
  .where('users.id', '=', id).fetch()
        const profile = yield Profile.query().with('user').where('user_id', '=', id).fetch()
        yield response.sendView('dashboard.profile.show', {user:user.toJSON(), profile: profile.toJSON()})
       
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
