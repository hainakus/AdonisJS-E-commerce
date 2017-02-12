'use strict'

const Schema = use('Schema')

class ColorsTableSchema extends Schema {

  up () {
    this.create('colors', (table) => {
      table.increments()
      table.text('rgba')
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').on('users');
      table.timestamps()
    })
  }

  down () {
    this.drop('colors')
  }

}

module.exports = ColorsTableSchema
