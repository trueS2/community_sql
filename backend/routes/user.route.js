const userController = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();

// 로그인
router.post('/login', userController.login);

// 회원가입
router.post('/signup', userController.signup);

module.exports = router;
