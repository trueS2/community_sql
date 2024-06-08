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
    return posts.find(post => post.id == postId);
  },

  updatePost: (postId, updatedData) => {
    const index = posts.findIndex(post => post.id == postId); // 업데이트할 게시글 인덱스 찾기
    if (index === -1) return null; // 게시글이 존재하지 않으면 null 반환
    posts[index] = {...posts[index], ...updatedData}; // 게시글 데이터 업데이트
    fs.writeFileSync(path.join(__dirname, '..', 'database', 'posts.json'), JSON.stringify(posts)); // 변경된 내용 파일에 적용
    return postId; // 업데이트된 게시글 ID 반환
  },

  deletePost: postId => {
    const index = posts.findIndex(post => post.id == postId); // 삭제할 게시글 인덱스 찾기
    if (index === -1) return false; // 게시글이 존재하지 않으면 false 반환
    posts.splice(index, 1); // 배열에서 게시글 삭제
    fs.writeFileSync(path.join(__dirname, '..', 'database', 'posts.json'), JSON.stringify(posts)); // 변경된 내용 파일에 적용
    return true; // 성공적으로 삭제되면 true 반환
  }

}