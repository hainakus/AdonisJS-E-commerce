'use strict'

const Schema = use('Schema')

class ProfileTableSchema extends Schema {

 up () {
    this.create('profiles', table => {
      table.increments()
      table.string('avatar')
      table.string('address')
      table.date('birthdate')
      table.string('email')
      table.integer('mobile')
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').on('users');
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfileTableSchema
