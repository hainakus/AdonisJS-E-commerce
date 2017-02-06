'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {
    products(){
        return this.belongsTo('App/Model/Product')
    }
    carts(){
        return this.belongsTo('App/Model/Cart')
    }
}

module.exports = Item
