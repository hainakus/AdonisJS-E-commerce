'use strict'

const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
class CheckoutController {


    *index(request,response) {
       const user = User.findOrFail(request.currentUser.id)
       const profile = yield Profile.query().with('user').where('user_id', '=', 1).fetch() 
     





 yield response.sendView('checkout')
    }
  
}
module.exports = CheckoutController
