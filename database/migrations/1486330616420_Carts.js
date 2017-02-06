'use strict'

const Schema = use('Schema')

class CartsTableSchema extends Schema {

  up () {
    this.create('carts', (table) => {
      table.increments()
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }

}

module.exports = CartsTableSchema
