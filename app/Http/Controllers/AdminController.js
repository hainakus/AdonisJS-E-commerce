'use strict'
const User = use('App/Model/User')
class AdminController {
      * index (resquest, response){
        const users = yield User.all();
        yield response.sendView('dashboard.admin', { users: users.toJSON() }) 
    }

    * show(request, response){
        const user = User.find(request.param('id'))
        
        yield response.sendView('dashboard.admin', {user:user.toJSON(), profile:profile.toJSON()})
       

    }
}

module.exports = AdminController
