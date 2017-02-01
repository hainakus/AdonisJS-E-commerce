'use strict'
const Image = use('App/Model/Image')
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
const Product = use('App/Model/Product')
const Helpers = use('Helpers')
class ImageController {
    * create(request,response){
        const id = request.param('id');
         const product = yield Product.with().where({ id }).firstOrFail();
        yield response.sendView('image.create', {product:product.toJSON()})
    }
    * store (request, response) {
        const id = request.param('id');
       
        const product = yield Product.with().where({ id }).firstOrFail();
    if (product) {
            const file = request.file('imagem')
            const fileName = `${new Date().getTime()}.${file.extension()}`
            
            yield file.move(Helpers.publicPath('uploads'), fileName)
            if (!file.move()){
                response.badRequest({error:file.errors()})
                
                return
            }
           const image = new Image()
            image.src = fileName, 
            image.product_id = product.id
            
            product.images().create(image) 
        }
         yield response.sendView('image.create')
    }
    * destroy (request,response){
        image = yield Image.findOrFail(request.param('id'))
        image.destroy()
        return
    }
}

module.exports = ImageController
