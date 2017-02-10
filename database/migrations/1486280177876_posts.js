'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {

  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title')
      table.text('content')
      table.text('excerpt')
      table.enum('status', ['draft', 'public']).default('draft')
      table.string('Oembed')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }

}

module.exports = PostsTableSchema
