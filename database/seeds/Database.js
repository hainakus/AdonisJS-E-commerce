'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')

class DatabaseSeeder {

  * run () {
   
    
     yield Factory.model('App/Model/Product').create(10)
     yield Factory.model('App/Model/Wishlist').create(20)
  
  const users = yield Factory.model('App/Model/User').create(1)
    users.each(function * (user) {
      const role = Factory.model('App/Model/Role').make()
      const profile = Factory.model('App/Model/Profile').make()
      
      yield user.role().save(role);
      yield user.profile().save(profile);
      
    })
  }
}

module.exports = DatabaseSeeder
