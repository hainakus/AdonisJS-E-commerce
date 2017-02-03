'use strict'

const Schema = use('Schema')

class ProductCategoryTableSchema extends Schema {

 up () {
    this.create('category_product', (table) => {
      table.increments()
      table.integer('category_id').unsigned().index();
      table.foreign('category_id').references('id').on('categories').onDelete('cascade');
      table.integer('product_id').unsigned().index();
      table.foreign('product_id').references('id').on('products').onDelete('cascade');
   
    })
  }

 down () {
    this.drop('category_product')
  }

}

module.exports = ProductCategoryTableSchema
