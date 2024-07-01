const db = require('../database/database.js'); // database.js 파일을 가져옴

module.exports = {
  addPost: (data, callback) => {
    const newPost = {
      user_id: data.user_id,
      post_title: data.post_title,
      post_content: data.post_content,
      post_img: data.post_img,
      type: data.type || 'text' // 기본값 'text' 설정
    };

    const query = 'INSERT INTO posts (user_id, post_title, post_content, post_img, type) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [newPost.user_id, newPost.post_title, newPost.post_content, newPost.post_img, newPost.type], (err, result) => {
      if (err) {
        console.error('Error adding post to MySQL:', err);
        return callback(err, null);
      }

      const newPostId = result.insertId; // 삽입된 행의 ID를 가져옴
      return callback(null, newPostId);
    });
  },

  getPost: (postId, callback) => {
    const query = 'SELECT * FROM posts WHERE post_id = ?';
    db.query(query, [postId], (err, result) => {
      if (err) {
        console.error('Error fetching post from MySQL:', err);
        return callback(err, null);
      }

      if (result.length === 0) {
        return callback(null, null); // 게시글이 존재하지 않으면 null 반환
      }

      return callback(null, result[0]); // 게시글 반환
    });
  },

  updatePost: (postId, updatedData, callback) => {
    const query = 'UPDATE posts SET post_title = ?, post_content = ?, post_img = ?, type = ? WHERE post_id = ?';
    db.query(query, [updatedData.post_title, updatedData.post_content, updatedData.post_img, updatedData.type, postId], (err, result) => {
      if (err) {
        console.error('Error updating post in MySQL:', err);
        return callback(err, null);
      }

      if (result.affectedRows === 0) {
        return callback(null, null); // 게시글이 존재하지 않으면 null 반환
      }

      return callback(null, postId); // 업데이트된 게시글 ID 반환
    });
  },

  deletePost: (postId, callback) => {
    const query = 'DELETE FROM posts WHERE post_id = ?';
    db.query(query, [postId], (err, result) => {
      if (err) {
        console.error('Error deleting post from MySQL:', err);
        return callback(err, null);
      }

      if (result.affectedRows === 0) {
        return callback(null, false); // 게시글이 존재하지 않으면 false 반환
      }

      return callback(null, true); // 성공적으로 삭제되면 true 반환
    });
  }
};
