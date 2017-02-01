'use strict'

const Schema = use('Schema')

class ProductTableSchema extends Schema {

 up () {
    this.create('products', (table) => {
      table.increments()
      table.string('title')
      table.text('description')
      table.integer('price')
      table.integer('sku')
      table.enum('status', ['draft', 'public']).default('draft')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}


module.exports = ProductTableSchema
