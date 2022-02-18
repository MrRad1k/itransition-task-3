const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static('public'))


app.use(express.json({extended: true}))
app.use('/api/auth', require('./routers/authRouter'))

async function start() {
    try { 
        await mongoose.connect(process.env.MONGO_URL)

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {console.log(err)}
}
start()