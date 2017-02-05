'use strict'

const Schema = use('Schema')

class ProductWhishlistTableSchema extends Schema {

  up () {
    this.create('product_wishlist', (table) => {
      table.increments()
      table.integer('wishlist_id').unsigned().index();
      table.foreign('wishlist_id').references('id').on('wishlists').onDelete('cascade');
      table.integer('product_id').unsigned().index();
      table.foreign('product_id').references('id').on('products').onDelete('cascade');
   
    })
  }

 down () {
    this.drop('product_wishlist')
  }

}

module.exports = ProductWhishlistTableSchema
