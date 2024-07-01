const db = require('../database/database.js');

// MySQL의 datetime 형식으로 변환하는 함수
function formatDateToMySQL(datetime) {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  // 모든 게시글을 렌더링
  render: async (req, res) => {
    try {
      const query = 'SELECT * FROM posts';
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
        }
        return res.status(200).json({ status: 200, message: "render_success", data: results });
      });
    } catch (err) {
      console.error('Error rendering posts:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 새 게시글 생성
  createPost: async (req, res) => {
    const { postTitle, postContent, postDate } = req.body;

    console.log('Request Body:', req.body);  // 요청 본문 로그

    if (!postTitle || !postContent) {
      console.log('Validation Error: Missing title or content');
      return res.status(400).json({ status: 400, message: "invalid_title_or_content", data: null });
    }

    const formattedDate = formatDateToMySQL(postDate);

    try {
      const query = 'INSERT INTO posts (post_title, post_content, upload_dt) VALUES (?, ?, ?)';
      db.query(query, [postTitle, postContent, formattedDate], (err, result) => {
        if (err) {
          console.error('Error adding post to MySQL:', err);  // 데이터베이스 쿼리 오류 로그
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        const newPostId = result.insertId;
        console.log('Post created with ID:', newPostId);  // 성공 로그
        return res.status(200).json({ status: 200, message: "create_success", data: { post_id: newPostId } });
      });
    } catch (err) {
      console.error('Error creating post:', err);  // 다른 서버 오류 로그
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 특정 게시글 불러오기
  readPost: async (req, res) => {
    const postId = req.params.id;

    try {
      const query = 'SELECT * FROM posts WHERE post_id = ?';
      db.query(query, [postId], (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
        }

        if (results.length === 0) {
          return res.status(404).json({ status: 404, message: "post_not_found", data: null });
        }

        const post = results[0];
        return res.status(200).json({ status: 200, message: "read_success", data: post });
      });
    } catch (err) {
      console.error('Error reading post:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 게시글 업데이트
  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { postTitle, postContent, postDate } = req.body;

    const formattedDate = formatDateToMySQL(postDate);

    try {
      const query = 'UPDATE posts SET post_title = ?, post_content = ?, upload_dt = ? WHERE post_id = ?';
      db.query(query, [postTitle, postContent, formattedDate, postId], (err, result) => {
        if (err) {
          console.error('Error updating post in MySQL:', err);
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ status: 404, message: "post_not_found", data: null });
        }

        return res.status(200).json({ status: 200, message: "update_success", data: { post_id: postId } });
      });
    } catch (err) {
      console.error('Error updating post:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 게시글 삭제
  deletePost: async (req, res) => {
    const postId = req.params.id;

    try {
      const query = 'DELETE FROM posts WHERE post_id = ?';
      db.query(query, [postId], (err, result) => {
        if (err) {
          console.error('Error deleting post from MySQL:', err);
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ status: 404, message: "post_not_found", data: null });
        }

        return res.status(200).json({ status: 200, message: "delete_success", data: { post_id: postId } });
      });
    } catch (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  }
};
