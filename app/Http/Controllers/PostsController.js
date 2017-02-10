'use strict'
const Post = use('App/Model/Post')
var embed = require("embed-video")
var moment = require("moment")
class PostsController {
    * index (request,response){
        var posts = yield Post.all()
        
        

       yield response.sendView('posts.index', {posts:posts.toJSON(), embed, moment}) 
    }

    * show( request, response){
        const id = request.param('id')
        const post = yield Post.findOrFail(id)
       
       const oembed = embed(post.Oembed)
        yield response.sendView('posts.show', {post:post.toJSON(), oembed:oembed})
    }
    * create(request, response){
        yield response.sendView('posts.create')
    }
    * store(request,response){
        

      
      const postData = request.only('title', 'content', 'excerpt', 'oembed') 
      const post = yield Post.create(postData) 
       yield response.redirect('/posts')
    }
    *edit(request,response){
        const post = yield Post.findOrFail(request.param('id'))
         yield response.sendView('posts.edit', {post:post.toJSON()})
    }

    *update(request, response){
        const post = yield Post.findOrFail(request.param('id'))
        const postData = request.only('title', 'content', 'excerpt', 'Oembed') 
        
        post.title = postData.title
        post.content = postData.content
        post.excerpt = postData.excerpt
        post.Oembed = postData.Oembed

        yield post.save()

        yield response.redirect('/posts')

    }



    * destroy(request, response){
        const post = yield Post.findOrFail(request.param('id'))

        yield post.delete()

        yield response.redirect('back')
    }
}

module.exports = PostsController
