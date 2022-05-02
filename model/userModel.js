const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']})

module.exports =  mongoose.model("User", userSchema);