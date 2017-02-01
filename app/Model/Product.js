'use strict'

const Lucid = use('Lucid')

class Product extends Lucid {
    images(){
       return this.belongsToMany('App/Model/Image')
    }
}

module.exports = Product
