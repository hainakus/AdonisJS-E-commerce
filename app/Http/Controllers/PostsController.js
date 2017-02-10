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
        

      
      const postData = request.only('title', 'content') 
      const post = yield Post.create(postData) 
       yield response.sendView('posts.show',{post:post.toJSON()})
    }
}

module.exports = PostsController
