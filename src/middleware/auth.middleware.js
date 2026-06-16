const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    const token =
        req.cookies.token ||
        req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findById(decoded.userId);

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Unauthorized access, invalid token"
        });

    }
};

const authSystemUserMiddleware = async (req, res, next) => {

    const token =
        req.cookies.token ||
        req.headers.authorization?.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        });

    console.log("REQ USER:", req.user)
    console.log("REQ USER ID:", req.user?._id)

    const accounts = await accountModel.find()

    console.log(accounts)      

    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel
            .findById(decoded.userId)
            .select("+systemUser");

        if (!user.systemUser) {

            return res.status(403).json({
                message:
                    "Access denied, only system users can perform this action"
            });

        }

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Unauthorized access, invalid token"
        });

    }
};

module.exports = {
    authMiddleware,
    authSystemUserMiddleware
};