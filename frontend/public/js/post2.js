document.addEventListener('DOMContentLoaded', function() {
  // 제목 입력 필드에 입력된 글자 수를 실시간으로 확인하는 함수
  document.getElementById('post2title-input').addEventListener('input', function() {
    var maxLength = 26; // 최대 글자 수
    var currentLength = this.value.length; // 현재 입력된 글자 수
      
    // 현재 입력된 글자 수가 최대 글자 수를 초과하면 초과한 부분을 자름
    if (currentLength > maxLength) {
      this.value = this.value.slice(0, maxLength);
    }
  });
});

// 제목과 내용 입력 필드, 그리고 게시글 추가 버튼 요소 선택
var elPost2Helper1 = document.querySelector('.post2-helpertext1');
var elPost2Helper1Input = document.querySelector('#post2title-input');
var elPost2Helper2 = document.querySelector('.post2-helpertext2');
var elPost2Helper2Input = document.querySelector('#content');
var post2Btn = document.getElementById('post2btn');

// 제목 유효성 검사 함수
function isValidTitle(value) {
  return value.length > 0 && value.length <= 26;
}

// 내용 유효성 검사 함수
function isValidContent(value) {
  return value.length > 0;
}

// 제목 입력 필드의 키 입력 이벤트 리스너
elPost2Helper1Input.onkeyup = function () {
  if (isValidTitle(elPost2Helper1Input.value)) {
    elPost2Helper1.classList.add('hide');
  } else {
    elPost2Helper1.classList.remove('hide');
  }
}

// 내용 입력 필드의 키 입력 이벤트 리스너
elPost2Helper2Input.onkeyup = function () {
  if (isValidContent(elPost2Helper2Input.value)) {
    elPost2Helper2.classList.add('hide');
  } else {
    elPost2Helper2.classList.remove('hide');
  }
}

// 입력 상자의 값이 변경될 때마다 호출되는 함수
function handleInputChange() {
  var title = document.getElementById('post2title-input').value;
  var content = document.getElementById('content').value;
  var post2btn = document.getElementById('post2btn');

  // 제목과 내용이 모두 유효할 때만 게시글 추가 버튼을 활성화
  if (isValidTitle(title) && isValidContent(content)) {
    post2Btn.classList.remove('disabled');
    post2Btn.classList.add('active');
  } else {
    post2Btn.classList.remove('active');
    post2Btn.classList.add('disabled');
  }
}

// 입력 상자의 값 변경 이벤트를 감시하여 유효성 검사 및 버튼 상태 업데이트
document.getElementById('post2title-input').addEventListener('input', handleInputChange);
document.getElementById('content').addEventListener('input', handleInputChange);

// 게시글 작성 로직 추가
document.querySelector('#post2btn').addEventListener('click', async () => {
  const postTitle = document.querySelector('#post2title-input').value;
  const postContent = document.querySelector('#content').value;
  const now = new Date();
  const postDate = now.toISOString();  // 날짜 형식을 ISO 형식으로 변경

  // 게시글 작성 API 요청
  const response = await fetch('http://localhost:8080/api/posts', {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ postTitle, postContent, postDate })
  });

  const responseData = await response.json();

  // 응답 상태 코드에 따른 처리
  switch (responseData.status) {
    case 200:
      alert("게시글 작성 성공");
      setTimeout(() => {
        location.href='/post';
      }, 1000);
      return;
    case 400:
      alert("제목과 내용을 작성해주세요");
      return;
    default:
      alert("게시글 작성 실패");
  }
});
