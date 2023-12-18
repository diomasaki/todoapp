const routes = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const { STATUS } = require("./status")

dotenv.config()

//Register
routes.post("/c", async (req,res) => {
    console.log(req.body.password)
    const salt = 10
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })

    try{
        const savedUser = await user.save()
        return STATUS(res, 201, "Success", "Register success!", savedUser)

    }catch(err) {
        return STATUS(res, 500, "Failed", "Register failed!", err)
    }
}) 

//Login
routes.post("/signin", async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) return STATUS(res, 401, "Failed", "Invalid user!", "Not Authorized!");

    const comparePassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!comparePassword) return STATUS(res, 401, "Failed", "Invalid password!", "Not Authorized!")

    const {password, ...others} = user._doc

    const token = jwt.sign({
        user: user._id,
    }, process.env.JWT, {expiresIn: "3d", algorithm: "HS256"})

    try{
        return STATUS(res, 200, "Success", "User authenticated!", {...others, token})
    }catch (err) {
        return STATUS(res, 500, "Failed", "Something went wrong!", err)
    }
})





module.exports = routes