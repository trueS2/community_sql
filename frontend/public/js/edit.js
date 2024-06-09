function toggleDropdown() {
    document.getElementById("dropdownContent").classList.toggle("show");
  }
  
  // 클릭한 항목에 따라 각각의 페이지로 이동하는 함수들
  function goToEditPage() {
    window.location.href = "http://localhost:8080/edit"; // 여기에 회원정보 수정 페이지의 URL을 넣으세요
  }
  
  function goToPasswordEditPage() {
    window.location.href = "http://localhost:8080/passwordedit"; // 여기에 비밀번호 수정 페이지의 URL을 넣으세요
  }
  
  function logout() {
    window.location.href = "http://localhost:8080/"; // 로그아웃 시 이동할 URL
  }
  
  // 사용자가 드롭다운 영역을 클릭한 후 다른 곳을 클릭할 때 드롭다운이 닫히도록 하는 코드
  window.onclick = function(event) {
    if (!event.target.matches('.otter')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
  var elEditNameHelper1 = document.querySelector('.helpertext-edit1');
  var elEditNameHelper2 = document.querySelector('.helpertext-edit2');
  var elEditNameHelper3 = document.querySelector('.helpertext-edit3');
  var elEditNameInput = document.querySelector('#name-edit');
  
  function validateEditedName(name) {
    // 닉네임을 입력하지 않은 경우
    if (!name) {
        elEditNameHelper1.classList.remove('hide');
        elEditNameHelper2.classList.add('hide');
        elEditNameHelper3.classList.add('hide');
        return false;
    }
  
    // 닉네임이 11자 이상인 경우
    if (name.length > 10) {
        elEditNameHelper1.classList.add('hide');
        elEditNameHelper2.classList.add('hide');
        elEditNameHelper3.classList.remove('hide');
        return false;
    }
  
    // 모든 검사 통과 시
    elEditNameHelper1.classList.add('hide');
    elEditNameHelper2.classList.add('hide');
    elEditNameHelper3.classList.add('hide');
    return true;
  }
  
  // 닉네임 입력 필드의 변경 이벤트 리스너 추가
  elEditNameInput.addEventListener('input', function() {
    validateEditedName(elEditNameInput.value);
  })
  
  function showToast() {
  var toastContainer = document.getElementById("toastContainer"); // 토스트 메시지 컨테이너 요소를 가져옴
  toastContainer.textContent = "수정 완료"; // 토스트 메시지 내용 설정
  toastContainer.style.display = "block"; // 토스트 메시지 표시
  
  setTimeout(function() {
    toastContainer.style.display = "none"; // 일정 시간(3초) 후에 토스트 메시지 숨김
  }, 3000); // 3초
  }
  
  // 모달 열기 버튼
  var openModalBtn = document.getElementById("signoutBtn");
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
    alert("회원 탈퇴가 완료되었습니다.");
    modal.style.display = "none";
  }
  
  // 모달 영역 외를 클릭 시 모달이 닫히도록 처리
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  fetch('edit.json')
    // 데이터를 JSON 형태로 변환
    .then(response => response.json())
    // 변환된 데이터를 콘솔에 출력
    // data는 윗줄의 response.json()의 결과값을 말함.
    .then(data => console.log(data))
    // 오류 처리
    .catch(error => console.error('Fetch 오류:', error));