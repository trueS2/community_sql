const { addUser, getUserByEmail, updateUser, deleteUser } = require('../models/user.model');
const db = require('../database/database.js');

module.exports = {
  // 로그인
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 400, message: 'email_or_password_required', data: null });
    }

    try {
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

  // 회원가입
  signup: async (req, res) => {
    const { email, password, nickname, profile_image } = req.body;
    if (!email || !password || !nickname) {
      return res.status(400).json({ status: 400, message: "required", data: null });
    }

    try {
      const queryCheckEmail = 'SELECT * FROM users WHERE email = ?';
      db.query(queryCheckEmail, [email], async (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
        }

        if (results.length > 0) {
          return res.status(404).json({ status: 404, message: "invalid_email", data: null });
        }

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

  // 사용자 정보 조회
  getUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const query = 'SELECT * FROM users WHERE user_id = ?';
      db.query(query, [userId], (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
        }

        if (results.length === 0) {
          return res.status(404).json({ status: 404, message: "user_not_found", data: null });
        }

        const user = results[0];
        return res.status(200).json({ status: 200, message: "get_user_success", data: user });
      });
    } catch (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 사용자 정보 수정
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { email, password, nickname, profile_image } = req.body;

    try {
      const query = 'UPDATE users SET email = ?, password = ?, nickname = ?, profile_image = ? WHERE user_id = ?';
      db.query(query, [email, password, nickname, profile_image, userId], (err, result) => {
        if (err) {
          console.error('Error updating user in MySQL:', err);
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ status: 404, message: "user_not_found", data: null });
        }

        return res.status(200).json({ status: 200, message: "update_success", data: { user_id: userId } });
      });
    } catch (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  },

  // 사용자 삭제
  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const query = 'DELETE FROM users WHERE user_id = ?';
      db.query(query, [userId], (err, result) => {
        if (err) {
          console.error('Error deleting user from MySQL:', err);
          return res.status(500).json({ status: 500, message: "internal_server_error", data: null });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ status: 404, message: "user_not_found", data: null });
        }

        return res.status(200).json({ status: 200, message: "delete_success", data: { user_id: userId } });
      });
    } catch (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
  }
};
