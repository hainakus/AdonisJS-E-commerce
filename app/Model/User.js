'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {
  static get rules () { 
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required',
    }
  }
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
  Wishlist() {
    return this.belongsToMany('App/Model/Wishlist')
  }
  products() {
    return this.hasManyThrough('App/Model/Product', 'App/Model/Wishlist')
  }
  cart(){
    return this.belongsToMany('App/Model/Cart')
  }
 
  Items(){
    return this.hasManyThrough('App/Model/Item', 'App/Model/Cart')
  }
  
}

module.exports = User
