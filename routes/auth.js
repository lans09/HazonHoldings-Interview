const express = require('express')
const router = express.Router()

const { login,signUp,signout } = require('../authController')


router.post('/signup', signUp)
router.post('/login',login)
router.post('/signout',signout)


module.exports = router