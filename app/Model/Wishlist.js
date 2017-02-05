'use strict'

const Lucid = use('Lucid')

class Wishlist extends Lucid {
     products(){
       return this.belongsToMany('App/Model/Product')
    }
    users(){
       return this.belongsToMany('App/Model/User')
    }
}

module.exports = Wishlist
