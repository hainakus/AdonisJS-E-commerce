'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }
  profile() {
    return this.hasOne('App/Model/Profile')
  }
  images() {
    return this.hasManyThrough('App/Model/Image', 'App/Model/Product')
  }
  role() {
    return this.hasOne('App/Model/Role')
  }
}

module.exports = User
