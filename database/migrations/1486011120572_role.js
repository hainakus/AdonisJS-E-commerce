'use strict'

const Schema = use('Schema')

class RoleTableSchema extends Schema {

 up () {
    this.create('roles', (table) => {
      table.increments()
      table.enum('role', ['admin', 'client', 'revisor']).default('client')
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').on('users');
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }

}

module.exports = RoleTableSchema
