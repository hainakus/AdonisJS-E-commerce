'use strict'

const Schema = use('Schema')

class CartsTableSchema extends Schema {

  up () {
    this.create('carts', (table) => {
      table.increments()
       table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').on('users');
      table.integer('product_id').unsigned();
      table.foreign('product_id').references('id').on('products');
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }

}

module.exports = CartsTableSchema
