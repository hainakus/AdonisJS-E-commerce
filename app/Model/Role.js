'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
     users () {
    return this.belongsTo('App/Model/User')
  }
  isAdmin() {
      
        this.users().find(1)
            if (role.role == 'admin')
            {
                return true;
            }
        

        return false;
  }
}

module.exports = Role
