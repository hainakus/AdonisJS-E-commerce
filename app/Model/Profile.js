'use strict'

const Lucid = use('Lucid')

class Profile extends Lucid {
    user () {
    return this.belongsTo('App/Model/User')
  }
  images(){
    return this.hasOne('App/Model/Image')
  }
}

module.exports = Profile
