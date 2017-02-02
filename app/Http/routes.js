'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
Route.get('/', 'HomeController.index')
Route.get('/shop', 'ShopController.index')
Route.post('/login', 'LoginController.login')
Route.get('/login', 'LoginController.index')
Route.get('/logout', 'RegisterController.doLogout')
Route.get('/register', 'RegisterController.index')
Route.post('register', 'RegisterController.doRegister')
Route.get('/products/:id', 'ProductController.show')
Route.get('/dashboard/:id', 'ProfileController.show').as('profile')
Route.post('/dashboard/:id', 'ProfileController.store')
Route.get('/products', 'ProductController.index')
Route.get('products/:id/images/create', 'ImageController.create')
Route.post('products/:id?/images', 'ImageController.store')
Route.get('images/:id', 'ImageController.show')
Route.get('images/:id/delete', 'ImageController.destroy')