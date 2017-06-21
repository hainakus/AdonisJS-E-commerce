'use strict'
const User = use('App/Model/User')
const Role = use('App/Model/Role')
const Profile = use('App/Model/Profile')
class UsersController {
    
    *index(request, response){
        const users = yield User.with('profile').fetch()

        yield response.send({users:users.toJSON()})
    }

    * show(request,response){
        const id = request.param('id') 
     
        const userWprofile = yield User.with('profile').where('id', '=', id).fetch()
        yield response.send({user:userWprofile})
    }

    *profileCreate(request, response){
        
        const id = request.param('id')
        const user = yield User.find(id)

        const data = request.all()
        // misses input file image for avatar at profile
     
        const profile = yield Profile.create({'avatar': data.profile.avatar,'address': data.profile.address, 'birthdate': data.profile.birthdate,'email': data.profile.email, 'mobile':data.profile.mobile, 'user_id': user.id})

         yield response.send({msg:'Profile Created to user' + user.username })
    }

     * doRegister(request, response) {
        const data = request.all()
    
        const user = yield User.create(data)
        const role = new Role()
        role.user_id = user.id
        yield role.save(role)

   
        const jwt = request.auth.authenticator('jwt')

 

        const token = yield jwt.generate(user)
            //model
        
            yield user.apiTokens().create({user_id:user.id, token:token})
            
                var registerMessage = {
                    success: 'Registration Successful! Now go ahead and login'
                }
            
        
        
            yield response.send({msg:registerMessage.success})
    }
}

module.exports = UsersController
