'use strict'

const Schema = use('Schema')

class ItemsTableSchema extends Schema {

  up () {
    this.create('items', (table) => {
      table.increments()
      table.integer('cart_id')
      table.integer('product_id')
      table.integer('quantity')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }

}

module.exports = ItemsTableSchema
