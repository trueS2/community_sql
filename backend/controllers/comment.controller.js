const { addComment, getComment, updateComment, deleteComment } = require('../models/comment.model');
const db = require('../database/database.js'); // MySQL 데이터베이스 연결

module.exports = {
  // 댓글 생성
  createComment: async (req, res) => {
    const { comment, postId, userId } = req.body;
    if (!comment || !postId || !userId) {
      return res.status(400).json({ status: 400, message: "required_fields_missing", data: null });
    }

    try {
      // MySQL 데이터베이스에 새 댓글 추가
      const query = 'INSERT INTO comments (comment, upload_dt, post_id, user_id) VALUES (?, ?, ?, ?)';
      const upload_dt = new Date(); // 현재 시간 사용 (현재 시간이 자동으로 업로드 날짜로 저장되도록 설정)
      db.query(query, [comment, upload_dt, postId, userId], (err, result) => {
        if (err) {
          console.error('Error adding comment to MySQL:', err);
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        const newCommentId = result.insertId;
        return res.status(201).json({ status: 201, message: "comment_created", data: { comment_id: newCommentId } });
      });
    } catch (err) {
      console.error('Error creating comment:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 특정 게시물의 댓글 불러오기
  getCommentsByPostId: async (req, res) => {
    const postId = req.params.postId;

    try {
      // MySQL 데이터베이스에서 특정 게시물의 댓글 조회
      const query = 'SELECT * FROM comments WHERE post_id = ?';
      db.query(query, [postId], (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
        }

        return res.status(200).json({ status: 200, message: "comments_found", data: results });
      });
    } catch (err) {
      console.error('Error retrieving comments:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 댓글 업데이트
  updateComment: async (req, res) => {
    const commentId = req.params.commentId;
    const { comment } = req.body;

    try {
      // MySQL 데이터베이스에서 댓글 업데이트
      const query = 'UPDATE comments SET comment = ? WHERE comment_id = ?';
      db.query(query, [comment, commentId], (err, result) => {
        if (err) {
          console.error('Error updating comment in MySQL:', err);
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ status: 404, message: "comment_not_found", data: null });
        }

        return res.status(200).json({ status: 200, message: "comment_updated", data: { comment_id: commentId } });
      });
    } catch (err) {
      console.error('Error updating comment:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 댓글 삭제
  deleteComment: async (req, res) => {
    const commentId = req.params.commentId;

    try {
      // MySQL 데이터베이스에서 댓글 삭제
      const query = 'DELETE FROM comments WHERE comment_id = ?';
      db.query(query, [commentId], (err, result) => {
        if (err) {
          console.error('Error deleting comment from MySQL:', err);
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ status: 404, message: "comment_not_found", data: null });
        }

        return res.status(200).json({ status: 200, message: "comment_deleted", data: { comment_id: commentId } });
      });
    } catch (err) {
      console.error('Error deleting comment:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  }
};
