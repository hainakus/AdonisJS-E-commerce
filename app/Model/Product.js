'use strict'

const Lucid = use('Lucid')
const Slugify = use('App/Services/Slugify')
class Product extends Lucid {
 /**
   * lifecycle method called by Lucid internally
   */
  static boot () {
    super.boot()
    Slugify.register(this)
  }

  /**
   * key/value pair to be used for creating
   * slugs.
   *
   * @return {Object}
   */
  static get sluggable () {
    return {
      key: 'slug',
      source: 'title'
    }
  }



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
