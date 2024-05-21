const fs = require('fs');
const path = require('path');

const posts = require('../database/posts.json');

module.exports = {
  addPost: data => {
    const newPostId = posts.length + 1;
    const newPost = {
        id: newPostId,
        postTitle: data.postTitle,
        postContent: data.postContent,
        uploaddate: data.postDate,
        // 인증, 세션 구현
        nickname: null,
        profileimg: null,
        postimg: null,
    }
    posts.push(newPost);

    const filepath = path.join(__dirname, '..', 'database', 'posts.json');
    fs.writeFileSync(filepath, JSON.stringify(posts));
    
    return newPostId;
  },
  
  getPost: postId => {
    return posts[postId-1];
  }
}