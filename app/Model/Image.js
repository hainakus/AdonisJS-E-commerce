'use strict'

const Lucid = use('Lucid')

class Image extends Lucid {
    static get deleteTimestamp () {
    return null
  }
     profile () {
    return this.belongsToMany('App/Model/Profile')
  }
    products(){
        return this.belongsToMany('App/Model/Product')
    }
    
}

module.exports = Image
