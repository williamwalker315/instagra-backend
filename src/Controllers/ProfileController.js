const User = require('../Models/User')
const Post = require('../Models/Post')

module.exports = {
    async getProfile(req,res){
        const {user_id} = req.params
        try{
        /*
            Capturar o perfil do user basta colocar o seu nome na URL
            localhost:3333/users/<user_id>, alem de capturar o perfil,
            vai capturar tbm os posts feitos por ele!
        */
            const userInfo = await User.findById(user_id)
            if(!userInfo) return res.status(400).send({
                nessage: 'User does not exists'
            })

            const userPosts = await Post.find({user: user_id,})
            return res.status(200).send({
                message: 'User found',
                userInfo: userInfo,
                userPosts: userPosts
            })

        }catch(err){

            return res.status(400).send(err)

        }
    }
}

