'use strict'

const Lucid = use('Lucid')

class Cart extends Lucid {
    user(){
        return this.belongsTo('App/Model/User')
    }
    items(){
        return this.hasMany('App/Model/Item')
    }
}

module.exports = Cart
