'use strict'

const Schema = use('Schema')

class ImageTableSchema extends Schema {

 up () {
    this.create('images', (table) => {
      table.increments()
      table.string('src')
      table.integer('profile_id').unsigned();
      table.foreign('profile_id').references('id').on('profiles');
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageTableSchema
