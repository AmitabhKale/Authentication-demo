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

const secret = 'ThisisSecret'
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']})

module.exports =  mongoose.model("User", userSchema);