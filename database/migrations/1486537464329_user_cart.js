'use strict'

const Schema = use('Schema')

class UserCartTableSchema extends Schema {

  up () {
    this.create('cart_user', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index();
      table.foreign('user_id').references('id').on('users').onDelete('cascade');
      table.integer('cart_id').unsigned().index();
      table.foreign('cart_id').references('id').on('carts').onDelete('cascade');
   
    })
  }

  down () {
    this.drop('cart_user')
  }

}

module.exports = UserCartTableSchema
