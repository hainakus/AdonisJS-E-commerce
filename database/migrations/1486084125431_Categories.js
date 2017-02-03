'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

   up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('title')
      table.text('description')
      table.enum('status', ['draft', 'public']).default('draft')
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
