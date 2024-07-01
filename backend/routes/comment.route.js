const commentController = require('../controllers/comment.controller.js');
const express = require('express');
const router = express.Router();

// 댓글 생성
router.post('/comments', commentController.createComment);

// 특정 게시물의 모든 댓글 불러오기
router.get('/comments/post/:postId', commentController.getCommentsByPostId);

// 댓글 업데이트
router.patch('/comments/:commentId', commentController.updateComment);

// 댓글 삭제
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;
