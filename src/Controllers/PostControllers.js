const { findOne } = require('../Models/Post')
const Post = require('../Models/Post')

module.exports = {
    async createPost(req, res){

        const{
            picture,
            description,
        } = req.body

        const { user } = req.headers
            try{
                const newPost = await Post.create({
                    picture,
                    description,
                    user
                })
                
                return res.status(200).send({
                    message: 'Post created successfully',
                    data: newPost
                })

            }catch(err){
                return res.status(400).send(err)
            }
    },

    async listAllPosts(req, res){

        try{
            const allPosts = await Post.find()
           .populate('user')
            return res.status(200).send({
                message: 'All posts ',
                data: allPosts
            })
        }catch(err){
            return res.status(400).send({
                message: 'Error',
                data: err
            })
        }

    },

    async deletePost(req, res){

        const { post_id } = req.params
        const {user_id} = req.headers

        try{
            //Validando caso não seje um user autorizado, não irá deletar!
            const belongsToUser = await Post.findOne({user: user_id})
            if(!belongsToUser) return res.status(400).send('Operation is not Allowed!')

            //Verificando se post realmente existe!
            const postExists = await Post.findById(post_id)
            if(!postExists) return res.status(400).send('Post does not exists')

            const deletePost = await Post.findByIdAndDelete(post_id)  
            return res.status(200).send({
                message: 'Deleted sucessfully',
                data: deletePost
            })

        }catch(err){
            return res.status(400).send(err)
        }

    },

    async editPost(req, res){
        /*  Ele vai postar se tiver do id da foto.(na url)
            Condizendo com o id do user(no headers) que fez essa postagem!
        */
        const { post_id } = req.params
        const { description } = req.body
        const { user_id } = req.headers

        try{
            //Validando caso não seje um user autorizado, não irá deletar!
            const belongsToUser = await Post.findOne({user: user_id}).where({_id: post_id})
            if(!belongsToUser) return res.status(400).send('Operation is not Allowed!')

            //Verificando se post realmente existe!
            const postExists = await Post.findById(post_id)
            if(!postExists) return res.status(400).send('Post does not exists')

         const editPost = await Post.findByIdAndUpdate(post_id,{description},{new: true})
         return res.status(200).send({
            message: 'Update sucessfully',
            data: editPost
         })   
        } catch(err){
            return res.status(400).send(err)
        }
    }
}