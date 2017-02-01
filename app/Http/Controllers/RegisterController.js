'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class RegisterController {
    * index(request, response) {
        yield response.sendView('register')
    }

    * doRegister(request, response) {
        const user = new User()
        user.username = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')

        yield user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        yield response.redirect('/login')
    }
    * doLogout(request, response){
        yield request.auth.logout()
         response.redirect('/')
    }
}

module.exports = RegisterController