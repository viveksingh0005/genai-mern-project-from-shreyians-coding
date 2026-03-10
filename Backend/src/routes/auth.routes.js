const {Router}  = require('express')
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")


const authRouter = Router()

/**
 * @route Post/api/auth/register
 * @description register a new user
 * @access Public
 */

authRouter.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access public 
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route get /api/auth/logout
 * @description clear cookie from user cookie  and add the token in blaacklist
 * @access private
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @route get /api/auth/get-me
 * @description get the corent loggedin user details
 * @access private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports = authRouter