'use strict'
const Image = use('App/Model/Image')
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
const Product = use('App/Model/Product')
const Helpers = use('Helpers')
class ImageController {
    * show (request,response){
        const id = request.param('id');
         const product = yield Product.with().where({ id }).firstOrFail();
        yield response.sendView('product.show')
    }
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
         const data = {
               src: fileName,
               product_id: product.id
           }
            yield product.images().create(data) 
        }
         response.redirect('back')
    }
    * destroy (request,response){
       const id = request.param('id');

    const image = yield Image.query().where({ id }).firstOrFail();
    yield image.delete()
        response.redirect('back')
    }
}

module.exports = ImageController
