(async () => {
  try {
    const response = await fetch('http://localhost:8080/api/posts', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const responseData = await response.json();
    const posts = responseData.data;

    const boardContainer = document.querySelector('.board-container');

    if (posts.length === 0) {
      const needPost = document.createElement('div');
      needPost.textContent = '게시글이 없습니다';
      boardContainer.appendChild(needPost);
      return;
    }

    posts.forEach(post => {
      const postCard = document.createElement('a');
      postCard.className = 'posting-card';
      postCard.href = `/post1/${post.id}`;
      postCard.innerHTML = `
        <div id='posttitle1'>${post.postTitle}</div>
        <div class="posting-wrapper">
          <div class="posting-info">
            <div class="like-post">좋아요 0</div>
            <div class="comment-post">댓글 0</div>
            <div class="view-post">조회수 0</div>
          </div>
          <div class="posting-time">
            <div id="postingdate1">${post.uploaddate}</div>
          </div>
        </div>
        <div class= "cw-container">
          <img id = "postimage1" alt="이미지" width="20px" height="20px">
          <div class="writer" id="postwriter1">${post.nickname}</div>
        </div>
      `;
      boardContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
})();
