'use strict'

const Lucid = use('Lucid')

class Product extends Lucid {
    images(){
       return this.belongsToMany('App/Model/Image')
    }
    categories(){
       return this.belongsToMany('App/Model/Category')
    }
}

module.exports = Product
