// 모달 열기 버튼
var openModalBtn = document.getElementById("postdelete");
// 모달
var modal = document.getElementById("myModal");
// 취소 버튼
var cancelBtn = document.getElementById("cancelBtn");
// 확인 버튼
var confirmBtn = document.getElementById("confirmBtn");

// 모달 열기 버튼 클릭 시 이벤트 처리
openModalBtn.onclick = function() {
  modal.style.display = "block";
}

// 취소 버튼 클릭 시 이벤트 처리
cancelBtn.onclick = function() {
  modal.style.display = "none";
}

// 확인 버튼 클릭 시 이벤트 처리
confirmBtn.onclick = function() {
  // 여기에 회원 탈퇴 로직을 추가할 수 있습니다.
  alert("게시글이 삭제되었습니다.");
  modal.style.display = "none";
}

// 모달 영역 외를 클릭 시 모달이 닫히도록 처리
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var openModalBtn2 = document.getElementById("commanddelete");
// 모달
var modal2 = document.getElementById("myModal2");
// 취소 버튼
var cancelBtn2 = document.getElementById("cancelBtn2");
// 확인 버튼
var confirmBtn2 = document.getElementById("confirmBtn2");

// 모달 열기 버튼 클릭 시 이벤트 처리
openModalBtn2.onclick = function() {
  modal.style.display = "block";
}

// 취소 버튼 클릭 시 이벤트 처리
cancelBtn2.onclick = function() {
  modal.style.display = "none";
}

// 확인 버튼 클릭 시 이벤트 처리
confirmBtn2.onclick = function() {
  // 여기에 회원 탈퇴 로직을 추가할 수 있습니다.
  alert("댓글이 삭제되었습니다.");
  modal.style.display = "none";
}


// 게시글 로직 추가
const urlPostId = Number(window.location.pathname.split("/")[2]);
// console.log(urlPostId);
(async () => {
  const response = await fetch(`http://localhost:8080/posts/${urlPostId}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    credentials: "include",
    method: "GET",
    body: null
  });
  const responseData = await response.json();
  const post = responseData.data;

  document.querySelector('#post1title').textContent = post.postTitle;
  document.querySelector('#post1writer').textContent = post.nickname;
  document.querySelector('#post1date').textContent = post.uploaddate;
  document.querySelector('#post1content').textContent = post.postContent;
})();
