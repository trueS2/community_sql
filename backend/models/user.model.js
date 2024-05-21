const users = require('../database/users.json');

const fs = require('fs');
const path = require('path');

module.exports = {
  addUser: data => {
    const newUserId = users.length+1;
    const newUser = {
      user_id: newUserId,
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      profile_img: data.profile_image
    }
    users.push(newUser);

    const filepath = path.join(__dirname, '..', 'database', 'users.json');
    fs.writeFileSync(filepath, JSON.stringify(users));
    
    return newUserId;
  }
}