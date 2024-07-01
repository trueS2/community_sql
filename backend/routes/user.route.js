const userController = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();

// 로그인
router.post('/login', userController.login);

// 회원가입
router.post('/signup', userController.signup);

// 사용자 정보 조회
router.get('/:id', userController.getUser);

// 사용자 정보 수정
router.put('/:id', userController.updateUser);

// 사용자 삭제
router.delete('/:id', userController.deleteUser);

module.exports = router;
