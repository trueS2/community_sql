const postController = require('../controllers/post.controller.js');
const express = require('express');
const router = express.Router();

// 모든 게시글 렌더링
router.get('/', postController.render);

// 새 게시글 생성
router.post('/', postController.createPost);

// 특정 게시글 조회
router.get('/:id', postController.readPost);

// 게시글 업데이트
router.patch('/:id', postController.updatePost);

// 게시글 삭제
router.delete('/:id', postController.deletePost);

module.exports = router;
