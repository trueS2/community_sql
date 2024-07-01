const db = require('../database/database.js'); // database.js 파일을 가져옴

module.exports = {
  addUser: (data, callback) => {
    const newUser = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      profileimage: data.profileimage
    };
    
    const query = 'INSERT INTO users (email, password, nickname, profileimage) VALUES (?, ?, ?, ?)';
    db.query(query, [newUser.email, newUser.password, newUser.nickname, newUser.profileimage], (err, result) => {
      if (err) {
        console.error('Error adding user to MySQL:', err);
        return callback(err, null);
      }
      
      const newUserId = result.insertId; // 삽입된 행의 ID를 가져옴
      return callback(null, newUserId);
    });
  }
};
