const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")

async function userRegisterController(req, res) {
     console.log(req.body)

    const { email, name, password } = req.body

    // check if email exists
    const isExists = await userModel.findOne({
        email:email
    })

    if (isExists){
        return res.status(422).json({
            status: "failed",
            message: "Email already exists"
        })
    }

    // create user
    const user = await userModel.create({
        email,
        name,
        password
    })

    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })

    await emailService.sendRegisterationEmail(user.email, user.name)
}

async function userLoginController(req, res) {

    const { email, password } = req.body

    // find user by email
    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        })
    }

    // check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );

    res.cookie("token", token)

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    });
}

module.exports = {
    userRegisterController,
    userLoginController
}