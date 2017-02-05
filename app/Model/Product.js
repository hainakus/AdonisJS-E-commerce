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
   
}

module.exports = Product
