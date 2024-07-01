const db = require('../database/database.js');

module.exports = {
  addUser: (data, callback) => {
    const newUser = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      profile_image: data.profile_image
    };
    
    const query = 'INSERT INTO users (email, password, nickname, profile_image) VALUES (?, ?, ?, ?)';
    db.query(query, [newUser.email, newUser.password, newUser.nickname, newUser.profile_image], (err, result) => {
      if (err) {
        console.error('Error adding user to MySQL:', err);
        return callback(err, null);
      }
      
      const newUserId = result.insertId;
      return callback(null, newUserId);
    });
  },

  getUserByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) {
        console.error('Error fetching user from MySQL:', err);
        return callback(err, null);
      }
      if (result.length === 0) {
        return callback(null, null);
      }
      return callback(null, result[0]);
    });
  },

  getUserById: (userId, callback) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user from MySQL:', err);
        return callback(err, null);
      }
      if (result.length === 0) {
        return callback(null, null);
      }
      return callback(null, result[0]);
    });
  },

  updateUser: (userId, data, callback) => {
    const query = 'UPDATE users SET email = ?, password = ?, nickname = ?, profile_image = ? WHERE user_id = ?';
    db.query(query, [data.email, data.password, data.nickname, data.profile_image, userId], (err, result) => {
      if (err) {
        console.error('Error updating user in MySQL:', err);
        return callback(err, null);
      }
      if (result.affectedRows === 0) {
        return callback(null, null);
      }
      return callback(null, userId);
    });
  },

  deleteUser: (userId, callback) => {
    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user from MySQL:', err);
        return callback(err, null);
      }
      if (result.affectedRows === 0) {
        return callback(null, false);
      }
      return callback(null, true);
    });
  }
};
