const Post = require('../Models/Post')

module.exports = {
    async likePost(req, res){
        const { post_id } = req.params
        const { user_id } = req.headers

        try{

            //Verificando se post realmente existe!
            const likedPost = await Post.findById(post_id)
            if(!likedPost) return res.status(400).send('Post does not exist')

            //Verificando se já curtiu esse post!
            if(likedPost.likes.includes(user_id)) return res.status(400).send('Post already liked')

            //Adicionando o id no post curtido!
            likedPost.likes.push(user_id)

            //likedPost.likes.pull(user_id)
            await likedPost.save()

            return res.status(200).send({
                message: 'Post liked',
                likedPost: likedPost
            })

        } catch(err){

            return res.status(400).send(err)
            
        }
    },

    async dislikePost(req,res){
        const {post_id} = req.params
        const {user_id} = req.headers

        try{
            const dislikedPost = await Post.findById(post_id)
            if(!dislikedPost) return res.status(400).send('Post does not exists')

            if(!dislikedPost.likes.includes(user_id)) return res.status(400).send('Post not liked yet!')
            //sdsds
            dislikedPost.likes.pull(user_id)
            await dislikedPost.save()
            return res.status(200).send({
                message: 'Post-unLiked',
                dislikedPost: dislikedPost
            })

        }catch(err){
            return res.status(400).send(err)
        }
    }
}