// 모달 열기 버튼
const openModalBtn = document.getElementById("postdelete");
// 모달
const modal = document.getElementById("myModal");
// 취소 버튼
const cancelBtn = document.getElementById("cancelBtn");
// 확인 버튼
const confirmBtn = document.getElementById("confirmBtn");

// 모달 열기 버튼 클릭 시 이벤트 처리
openModalBtn.onclick = function() {
  modal.style.display = "block";
}

// 취소 버튼 클릭 시 이벤트 처리
cancelBtn.onclick = function() {
  modal.style.display = "none";
}

// 확인 버튼 클릭 시 이벤트 처리
confirmBtn.onclick = async function() {
  const urlPostId = Number(window.location.pathname.split("/")[2]);
  try {
    const response = await fetch(`http://localhost:8080/posts/${urlPostId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if(data.status === 200) {
      alert("게시글이 삭제되었습니다.");
      window.location.href = '/post'; // 삭제 후 게시글 목록 페이지로 리다이렉트
    } else {
      alert("게시글 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("게시글 삭제 중 문제가 발생했습니다.");
  }
  modal.style.display = "none";
}

// 모달 영역 외를 클릭 시 모달이 닫히도록 처리
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

const openModalBtn2 = document.getElementById("commanddelete");
const modal2 = document.getElementById("myModal2");
const cancelBtn2 = document.getElementById("cancelBtn2");
const confirmBtn2 = document.getElementById("confirmBtn2");

openModalBtn2.onclick = function() {
  modal2.style.display = "block";
}

cancelBtn2.onclick = function() {
  modal2.style.display = "none";
}

confirmBtn2.onclick = function() {
  alert("댓글이 삭제되었습니다.");
  modal2.style.display = "none";
}

// 게시글 로직 추가
const urlPostId = Number(window.location.pathname.split("/")[2]);

(async () => {
  try {
    const response = await fetch(`http://localhost:8080/posts/${urlPostId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      credentials: "include",
      method: "GET"
    });
    const responseData = await response.json();
    const post = responseData.data;

    document.getElementById('post1title').textContent = post.postTitle;
    document.getElementById('post1writer').textContent = post.nickname;
    document.getElementById('post1date').textContent = post.uploaddate;
    document.getElementById('post1content').textContent = post.postContent;
  } catch (error) {
    console.error('Error fetching post:', error);
    alert("게시글을 불러오는 중 문제가 발생했습니다.");
  }
})();
