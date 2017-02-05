'use strict'

const Schema = use('Schema')

class WishlistTableSchema extends Schema {

    up () {
    this.create('wishlists', (table) => {
      table.increments()
      table.string('title')
      table.text('description')
      table.enum('status', ['draft', 'public']).default('draft')
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').on('users');
      table.integer('product_id').unsigned();
      table.foreign('product_id').references('id').on('products');
      table.timestamps()
    })
  }

  down () {
    this.drop('wishlists')
  }

}

module.exports = WishlistTableSchema
