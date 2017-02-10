'use strict'
const Post = use('App/Model/Post')
class PostsController {
    * index (request,response){
        const posts = yield Post.all()

       yield response.sendView('posts.index', {posts:posts.toJSON()}) 
    }

    * show( request, response){
        const id = request.param('id')
        const post = yield Post.findOrFail(id)

        yield response.sendView('posts.show', {post:post.toJSON()})
    }
    * create(request, response){
        yield response.sendView('posts.create')
    }
    * store(request,response){
        

      
      const postData = request.only('title', 'content', 'excerpt', 'oembed') 
      const post = yield Post.create(postData) 
       yield response.redirect('/posts')
    }
    * destroy(request, response){
        const post = yield Post.findOrFail(request.param('id'))

        yield post.delete()
    }
}

module.exports = PostsController
