'use strict'
const Validator = use('Validator')
const User = use('App/Model/User')
class LoginController {
    * index(request, response) {
        yield response.sendView('login')
    }

    * login (request, response) {
    const email = request.input('email')
    const password = request.input('password')
    const login = yield request.auth.attempt(email, password) 
    const user = yield request.auth.getUser()
    
    if (login) {
     
      response.route('profile', {id: user.id})
    }

    response.unauthorized('Invalid credentails')
  }
}

module.exports = LoginController
