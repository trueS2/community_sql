const express = require('express');
const postController = require('../controllers/post.controller');
const router = express.Router();

// 모든 게시글 조회
router.get('/', postController.render);

// 특정 게시글 조회
router.get('/:id', postController.readPost);

// 게시글 작성
router.post('/', postController.createPost);

// 게시글 수정
router.patch('/:id', postController.updatePost);

// 게시글 삭제
router.delete('/:id', postController.deletePost);

module.exports = router;
