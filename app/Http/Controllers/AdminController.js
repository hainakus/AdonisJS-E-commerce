'use strict'
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
class AdminController {
      * index (request, response){
        //const users = yield User.all();
        const users = yield User.with('profile').fetch()
        yield response.sendView('dashboard.admin', { users: users.toJSON() }) 
    }

   /* * show(request, response){
        const user = User.find(request.param('id'))
        
        yield response.sendView('dashboard.admin', {user:user.toJSON(), profile:profile.toJSON()})
       

    }*/
    * listUsers (request, response){
        //const users = yield User.all();
        const users = yield User.with('profile').fetch()
        yield response.send( { users: users.toJSON() }) 
    }
}

module.exports = AdminController
