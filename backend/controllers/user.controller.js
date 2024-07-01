const { addUser } = require('../models/user.model');
const db = require('../database/database.js'); // MySQL 데이터베이스 연결

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 400, message: 'email_or_password_required', data: null });
    }
    
    try {
      // MySQL 데이터베이스에서 사용자 조회
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], async (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
        }

        if (results.length === 0) {
          return res.status(404).json({ status: 404, message: 'no_such_user', data: null });
        }

        const user = results[0];
        
        // 비밀번호 검증 (실제로는 bcrypt 등을 사용하여 비밀번호를 안전하게 검증해야 합니다)
        if (user.password !== password) {
          return res.status(404).json({ status: 404, message: 'invalid_email_or_password', data: null });
        }

        return res.status(200).json({ status: 200, message: "login_success", data: user });
      });
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  signup: async (req, res) => {
    const { email, password, nickname, profile_image } = req.body;
    if (!email || !password || !nickname) {
      return res.status(400).json({ status: 400, message: "required", data: null });
    }

    try {
      // 중복 이메일 체크
      const queryCheckEmail = 'SELECT * FROM users WHERE email = ?';
      db.query(queryCheckEmail, [email], async (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
        }

        if (results.length > 0) {
          return res.status(404).json({ status: 404, message: "invalid_email", data: null });
        }

        // 사용자 추가
        const queryAddUser = 'INSERT INTO users (email, password, nickname, profile_image) VALUES (?, ?, ?, ?)';
        db.query(queryAddUser, [email, password, nickname, profile_image], async (err, result) => {
          if (err) {
            console.error('Error adding user to MySQL:', err);
            return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
          }

          const newUserId = result.insertId;
          return res.status(201).json({ 
            status: 201, 
            message: "register_success", 
            data: { user_id: newUserId }
          });
        });
      });
    } catch (err) {
      console.error('Error during signup:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },
};
