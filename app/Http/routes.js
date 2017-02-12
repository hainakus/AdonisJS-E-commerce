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
Route.group('api', () => {
  Route
    .resource('products', 'APIControllers')
    .only(['index','show', 'store', 'update', 'destroy'])//.middleware('auth:jwt')
})
.prefix('/api/v1')
.formats(['json'], true) // all urls needs to have .json extension
Route.group('login', () => {
Route.post('/login', 'LoginController.login')
Route.get('/login', 'LoginController.index')
Route.get('/logout', 'RegisterController.doLogout')
Route.get('/register', 'RegisterController.index')
Route.post('register', 'RegisterController.doRegister')
})
.formats(['html'])
Route.group('backend', () => {
Route.get('/dashboard/:id', 'ProfileController.show').as('profile')
Route.post('/dashboard/:id', 'ProfileController.store')
Route.post('/dashboard/:id/edit', 'ProfileController.update')
Route.get('/shop', 'ProductController.index')
Route.post('/products/:id/wishlists', 'ProductController.addToWishlist')
Route.get('/products/:id', 'ProductController.show')
Route.post('/products', 'ProductController.store')
Route.put('/products/:id', 'ProductController.update')
Route.get('/products/:id/deleteWish', 'ProductController.destroyWish')
Route.get('/products/:id/delete', 'ProductController.destroy')
Route.post('/products/:id/images', 'ImageController.store')
//Route.get('categories', 'CategoryController.index')
Route.post('/shop', 'CategoryController.store')
//Route.get('images/:id', 'ImageController.show')
Route.get('images/:id/delete', 'ImageController.destroy')

Route.get('/users', 'AdminController.index')

Route.post('wishlists', 'WishlistController.store')

Route.get('/posts', 'PostsController.index').as('blog')

Route.get('/posts/create', 'PostsController.create')
Route.post('/posts', 'PostsController.store')
Route.get('/posts/:id', 'PostsController.show')
Route.get('/posts/:id/edit', 'PostsController.edit')
Route.post('posts/:id/edit', 'PostsController.update')
Route.get('/posts/:id/delete', 'PostsController.destroy')



Route.post('/product/:id/addToCart', 'CartController.addItem')
Route.post('/dashboard/:id/updateCart', 'CartController.updateQuantity')
Route.post('/dashboard/:id/removeProduct', 'CartController.removeProduct')
Route.post('/color/create', 'ProfileController.bkcolor')
Route.post('/dashboard/:id/stripe', 'ProfileController.checkout')

}).prefix('/backend')
.middleware('auth')
.formats(['html'])

//Route.any('*', 'NuxtController.render')
