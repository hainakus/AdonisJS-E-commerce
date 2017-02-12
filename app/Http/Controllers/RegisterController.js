'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Role = use('App/Model/Role')
class RegisterController {
    * index(request, response) {
        yield response.sendView('register')
    }

    * doRegister(request, response) {
    const data = request.only('name', 'email', 'password')
    const admin = yield User.find(1)

       
    
     if (admin){
       const user = new User()
        user.username = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')
        
        yield user.save()
        const role = new Role()
        role.user_id = user.id
        yield role.save(role)

   
  const jwt = request.auth.authenticator('jwt')

 

   const token = yield jwt.generate(user)
    //model
   
    yield user.apiTokens().create({user_id:user.id, token:token})
     } else {
     
 const user = new User()
        user.username = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')
        
        yield user.save()
        const role = new Role()
        role.role = 'admin'
        role.user_id = user.id
        yield role.save(data, {
            isAdmin: true
            })
        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }
      
  
    const jwt = request.auth.authenticator('jwt')

    const token = yield jwt.generate(user)
    //model
   
   yield user.apiTokens().create({user_id:user.id, token:token})
     }  
      yield response.redirect('/login')
    }
    * doLogout(request, response){
        yield request.auth.logout()
         response.redirect('/')
    }
}

module.exports = RegisterController