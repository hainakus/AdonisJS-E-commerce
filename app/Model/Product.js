'use strict'

const Lucid = use('Lucid')

class Product extends Lucid {
    images(){
       return this.belongsToMany('App/Model/Image')
    }
    categories(){
       return this.belongsToMany('App/Model/Category')
    }
    wishlist(){
       return this.belongsToMany('App/Model/Wishlist')
    }
    item(){
        return this.belongsTo('App/Model/Item')
    }
}

module.exports = Product
