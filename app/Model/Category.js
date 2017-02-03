'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    products(){
        return this.belongsToMany('App/Model/Product')
    }
}

module.exports = Category
