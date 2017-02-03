'use strict'
const Category = use('App/Model/Category')
class CategoryController {
    * index (request,response){
        const categories = yield Category.all()
        yield response.sendView('category.index', {categories:categories.toJSON()})
    }
    * create(request, response){
        yield reponse.sendView('/')
    }
    * store (request, response){

      const category = new Category()
        category.title = request.input('title')
        category.description = request.input('description')
     yield category.save(category)

      yield response.redirect('back')
    }
}

module.exports = CategoryController
