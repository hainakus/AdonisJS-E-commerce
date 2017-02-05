'use strict'

const Schema = use('Schema')

class UserWishlistTableSchema extends Schema {

 
  up () {
    this.create('user_wishlist', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').on('users').onDelete('cascade');
      table.integer('wishlist_id').unsigned().index();
      table.foreign('wishlist_id').references('id').on('wishlists').onDelete('cascade');
   
    })
  }

 down () {
    this.drop('user_wishlist')
  }

}

module.exports = UserWishlistTableSchema
