const {Router} = require("express");
const { model } = require("mongoose");
const UserController = require("../Controllers/UserController");
const LoginController = require("../Controllers/LoginController");
const PostController = require("../Controllers/PostControllers");
const ProfileController = require("../Controllers/ProfileController");
const LikeController = require('../Controllers/LikeController');
const router = Router()

// Criar usúario
router.post('/users', UserController.createUser)
router.get('/users', UserController.listUser)

// Fazer login
router.post('/login',LoginController.login)

// Postar uma foto
router.post('/posts', PostController.createPost)
// Ver todas as fotos
router.get('/posts',PostController.listAllPosts)
// Deletar as fotos
router.delete('/posts/:post_id', PostController.deletePost)
// Editar uma foto
router.put('/posts/:post_id', PostController.editPost)

//Visualizar perfil de um usúario 
router.get('/users/:user_id', ProfileController.getProfile)

// Dar like em uma  foto
router.post('/posts/:post_id/like', LikeController.likePost)
router.post('/posts/:post_id/dislike', LikeController.dislikePost)

router.get('/',(req,res)=>{
    return res.send('Hello World!')
})


module.exports = router