'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
     users () {
    return this.belongsTo('App/Model/User')
  }
   isAdmin() {
      var userId = currentUser.id
        this.users().find(userId)
            if (role.role == 'admin')
            {
                return true;
            }
        

        return false;
  }
}

module.exports = Role
