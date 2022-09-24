const User = require('../Models/User')

module.exports = {
    async login(req, res){
        const {username, password} = req.body


        try {
            //Username validation
            const validUsername = await User.findOne({username})
            if(!validUsername) return res.status(400).send({message: 'User doesn´t exists!'})

            //Password validation
            const validPassword = await User.findOne({
                password: password
            }).where({
                username: username
            })
            if(!validPassword) return res.status(400).send({message: 'Invalid password!'})

            const LoggedIn = validPassword

            return res.status(200).send({message: 'Success', data: LoggedIn})

        } catch ({err}) {
            return res.status(400).send(err)
        }
    }
}