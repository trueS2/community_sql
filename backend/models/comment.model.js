const db = require('../database/database.js'); // database.js 파일을 가져옴

module.exports = {
  addComment: (data, callback) => {
    const newComment = {
      comment: data.comment,
      post_id: data.post_id,
      user_id: data.user_id
    };

    const query = 'INSERT INTO comments (comment, post_id, user_id) VALUES (?, ?, ?)';
    db.query(query, [newComment.comment, newComment.post_id, newComment.user_id], (err, result) => {
      if (err) {
        console.error('Error adding comment to MySQL:', err);
        return callback(err, null);
      }

      const newCommentId = result.insertId; // 삽입된 행의 ID를 가져옴
      return callback(null, newCommentId);
    });
  },

  getCommentsForPost: (postId, callback) => {
    const query = 'SELECT * FROM comments WHERE post_id = ?';
    db.query(query, [postId], (err, results) => {
      if (err) {
        console.error('Error fetching comments from MySQL:', err);
        return callback(err, null);
      }

      return callback(null, results); // 해당 포스트의 모든 댓글 반환
    });
  },

  deleteComment: (commentId, callback) => {
    const query = 'DELETE FROM comments WHERE comment_id = ?';
    db.query(query, [commentId], (err, result) => {
      if (err) {
        console.error('Error deleting comment from MySQL:', err);
        return callback(err, null);
      }

      if (result.affectedRows === 0) {
        return callback(null, false); // 댓글이 존재하지 않으면 false 반환
      }

      return callback(null, true); // 성공적으로 삭제되면 true 반환
    });
  }
};
