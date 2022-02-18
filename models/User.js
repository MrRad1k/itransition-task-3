const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: String},
    status: {type: Boolean}
})

module.exports = model('User', userSchema)