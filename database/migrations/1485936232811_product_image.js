'use strict'

const Schema = use('Schema')

class ProductImageTableSchema extends Schema {

  up () {
    this.create('image_product', (table) => {
      table.increments()
      table.integer('product_id').unsigned().index();
      table.foreign('product_id').references('id').on('products').onDelete('cascade');
      table.integer('image_id').unsigned().index();
      table.foreign('image_id').references('id').on('images').onDelete('cascade');
   
    })
  }

 down () {
    this.drop('image_product')
  }

}

module.exports = ProductImageTableSchema
