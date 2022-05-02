const express = require('express');
const asyncHandler = require('express-async-handler')
const router = express.Router();
const User = require('../model/userModel')
const bcrypt = require('bcrypt')

const saltRounds = 10;



// @desc     Register a new User
// @route    /api/users
// @access   Public
router.post('/register', asyncHandler( async (req,res) => {

    const {name, email, password} = req.body;
    if(!name || !password || !email ){
        res.status(400)
        throw new Error('Please includes all fields')
    }

    // Find User already exists
    const userExist = await User.findOne({email: email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }
    

    bcrypt.hash(password, saltRounds, (err, hash) => {
    const user =  User.create({
        name,
        email,
        password : hash
    })
    if(user){
        res.status(201).json({
            name: user.name,
            email: user.email
        })
    }
    else{
    res.status(400)
    throw new Error('Invalid User data')
}
    })
}))


// @desc     Login User
// @route    /api/users/login
// @access   Public
router.post('/login',asyncHandler( async (req,res) => {
    const { email, password } = req.body;


    const user = await User.findOne({email : email})

    if(user){
        bcrypt.compare(password, user.password, (err,result) => {
            if(result === true){
                res.status(200).json({
                    name: user.name,
                    email : user.email,
                    message: 'Logged In !'
                })
            }
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
}))


module.exports = router