const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
});


const PORT = process.env.PORT || 5000

app.use(express.static('public'))


app.use(express.json({extended: true}))
app.use('/api/auth', require('./routers/authRouter'))

async function start() {
    try { 
        await mongoose.connect('mongodb+srv://MrRadik:9205953@cluster0.vuyt2.mongodb.net/Task3?retryWrites=true&w=majority')

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {console.log(err)}
}
start()