require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./connect')
const mongoose = require ('mongoose')
const port = 3000

app.use(express.json())
// routers
const authRouter = require('./routes/auth')
const storeRouter = require('./routes/store')

app.use('/api/v1',authRouter)
app.use('/api/v1/store',storeRouter)

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('MONGO connected');
        app.listen(port,console.log(`server is listening on port ${port}`))
    } catch(error){
        console.log(error)
    }
}
start()
