function showToast() {
    var toastContainer = document.getElementById("toastContainer"); // 토스트 메시지 컨테이너 요소를 가져옴
    toastContainer.textContent = "수정 완료"; // 토스트 메시지 내용 설정
    toastContainer.style.display = "block"; // 토스트 메시지 표시
    
    setTimeout(function() {
      toastContainer.style.display = "none"; // 일정 시간(3초) 후에 토스트 메시지 숨김
    }, 3000); // 3초
  }
  
  var elPasswordEdit1Helper1 = document.querySelector('.passwordedit1-helper1');
  var elPasswordEdit1Helper2 = document.querySelector('.passwordedit1-helper2');
  var elPasswordEditInput1 = document.querySelector('#passwordedit1');
  
  var elPasswordEdit2Helper1 = document.querySelector('.passwordedit2-helper2');
  var elPasswordEdit2Helper2 = document.querySelector('.passwordedit2-helper1');
  var elPasswordEditInput2 = document.querySelector('#passwordedit2');
  
  function isValidPassword(password) {
    // 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 함
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return regex.test(password);
  }
  
  function isValidRePassword(password) {
    // 입력 상자 2의 값이 입력 상자 1의 값과 일치하는지 확인
    return password === document.getElementById('passwordedit1').value;
  }
  
  elPasswordEditInput1.addEventListener('keyup', function () {
    if (elPasswordEditInput1.value.trim() === '') {
      elPasswordEdit1Helper1.classList.add('hide');
      elPasswordEdit1Helper2.classList.remove('hide');
    } else if (isValidPassword(elPasswordEditInput1.value)) {
      elPasswordEdit1Helper1.classList.add('hide');
      elPasswordEdit1Helper2.classList.add('hide');
    } else {
      elPasswordEdit1Helper1.classList.remove('hide');
      elPasswordEdit1Helper2.classList.add('hide');
    }
  });
  
  elPasswordEditInput2.addEventListener('keyup', function () {
    if (elPasswordEditInput2.value.trim() === '') {
      elPasswordEdit2Helper1.classList.add('hide');
      elPasswordEdit2Helper2.classList.remove('hide');
    } else if (isValidRePassword(elPasswordEditInput2.value)) {
      elPasswordEdit2Helper1.classList.add('hide');
      elPasswordEdit2Helper2.classList.add('hide');
    } else {
      elPasswordEdit2Helper1.classList.remove('hide');
      elPasswordEdit2Helper2.classList.add('hide');
    }
  });
  
  // 입력 상자의 값이 변경될 때마다 호출되는 함수
  function handleInputChange() {
    var password = document.getElementById('passwordedit1').value;
    var repassword = document.getElementById('passwordedit2').value;
    var loginBtn = document.getElementById('passwordedit-btn');
  
    // 입력 상자 1과 입력 상자 2의 유효성을 모두 검사하여 로그인 버튼 상태 업데이트
    if (isValidPassword(password) && isValidRePassword(repassword)) {
      loginBtn.classList.remove('disabled');
      loginBtn.classList.add('active');
    } else {
      loginBtn.classList.remove('active');
      loginBtn.classList.add('disabled');
    }
  }
  
  // 입력 상자의 값 변경 이벤트를 감시하여 유효성 검사 및 로그인 버튼 상태 업데이트
  document.getElementById('passwordedit1').addEventListener('input', handleInputChange);
  document.getElementById('passwordedit2').addEventListener('input', handleInputChange);
  
  fetch('passwordedit.json')
    // 데이터를 JSON 형태로 변환
    .then(response => response.json())
    // 변환된 데이터를 콘솔에 출력
    // data는 윗줄의 response.json()의 결과값을 말함.
    .then(data => console.log(data))
    // 오류 처리
    .catch(error => console.error('Fetch 오류:', error));