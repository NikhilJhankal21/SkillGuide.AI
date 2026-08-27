const express=require('express')  // Same Syntax - const {Router}=require('express')
const authController=require('../controllers/auth.controller') 
const authMiddleware=require('../middlewares/auth.middleware')
const authRouter=express.Router()  // Same Syntax - const authRouter=Router()

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @acess Public
 */ 
authRouter.post('/register',authController.registerUserController)


/**
 *@route POST /api/auth/login
 *@description Login user with email and password
 *@access Public 
 */ 

authRouter.post('/login',authController.loginUserController)

/**
 *@route GET /api/auth/logout
 *@description Clear token from user cookie and add token in the blacklist
 *@access Public
 */ 

authRouter.get('/logout',authController.logoutUserController)

/**
 *@routes GET /api/auth/get-me
 *@description get the current logged in user details
 *@access Private 
 */ 

authRouter.get('/get-me',authMiddleware.authUser , authController.getMeController)

module.exports=authRouter


