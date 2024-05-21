var elPasswordHelper = document.querySelector('.password-helper');
var elPasswordInput = document.querySelector('#user-password');
var elEmailHelper = document.querySelector('.email-helper');
var elEmailInput = document.querySelector('#user-email');

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = elEmailInput.value;
  const password = elPasswordInput.value;
  
  const response = await fetch('http://localhost:8080/users/login', {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  
  const responseData = await response.json();
  
  switch (responseData.status) {
    case 200:
      alert('로그인 되었습니다!');
      // console.log(responseData.message);
      setTimeout(() => {
        location.href = "/post";
      }, 1000);
      return;
    default:
      alert("로그인 실패");
      // console.log(responseData.message);
      return;
  }
});


function isValidPassword(value) {
  return value.length >= 8 && value.length <= 20
}

function isValidEmail(value) {
  return value.length > 0 && value.includes('@') && value.includes('.')
}

elPasswordInput.onkeyup = function () {
  if (isValidPassword(elPasswordInput.value)) {
    elPasswordHelper.classList.add('hide')
  } else {
    elPasswordHelper.classList.remove('hide')
  }
}

elEmailInput.onkeyup = function () {
  if (isValidEmail(elEmailInput.value)) {
    elEmailHelper.classList.add('hide');
  } else {
    elEmailHelper.classList.remove('hide');
  }
}

// 입력 상자의 값이 변경될 때마다 호출되는 함수
function handleInputChange() {
  var email = document.getElementById('user-email').value;
  var password = document.getElementById('user-password').value;
  var loginBtn = document.getElementById('loginBtn');

  // 이메일과 비밀번호가 모두 유효할 때만 로그인 버튼을 활성화
  if (isValidEmail(email) && isValidPassword(password)) {
    loginBtn.classList.remove('disabled');
    loginBtn.classList.add('active');
  } else {
    loginBtn.classList.remove('active');
    loginBtn.classList.add('disabled');
  }
}


// 입력 상자의 값 변경 이벤트를 감시하여 유효성 검사 및 로그인 버튼 상태 업데이트
document.getElementById('user-email').addEventListener('input', handleInputChange);
document.getElementById('user-password').addEventListener('input', handleInputChange);