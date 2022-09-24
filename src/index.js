const express = require("express")
const router = require("./Utils/router")
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const mongoConnection = process.env.MONGO_URI
mongoose.connect(mongoConnection,{
    useUnifieldTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, ()=> console.log('Connected to database!'))

app.use(cors())
app.use(express.json())
app.use(router)
app.use(morgan('dev'))

app.listen(process.env.PORT || 3333,(req,res)=>{
    console.log('Server Running! ')
})


