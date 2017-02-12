'use strict'

const Lucid = use('Lucid')

class Color extends Lucid {
    user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Color
