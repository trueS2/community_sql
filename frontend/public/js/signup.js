var elSignupEmailHelper1 = document.querySelector('.emailhelper-signup1');
var elSignupEmailHelper2 = document.querySelector('.emailhelper-signup2');
var elSignupEmailHelper3 = document.querySelector('.emailhelper-signup3');
var elSignupEmailInput = document.querySelector('#emailbox-signup');

var elSignupPasswordHelper1 = document.querySelector('.passwordhelper-signup1');
var elSignupPasswordHelper2 = document.querySelector('.passwordhelper-signup2');
var elSignupPasswordInput = document.querySelector('#passwordbox-signup');

var elSignupPassword2Helper1 = document.querySelector('.password2helper-signup1');
var elSignupPassword2Helper2 = document.querySelector('.password2helper-signup2');
var elSignupPasswordInput2 = document.querySelector('#password2box-signup');

var elSignupNameHelper1 = document.querySelector('.namehelper-signup1');
var elSignupNameHelper2 = document.querySelector('.namehelper-signup2');
var elSignupNameHelper3 = document.querySelector('.namehelper-signup3');
var elSignupNameInput = document.querySelector('#namebox-signup');


function isvalidSignupEmail1(value) {
  return value.length > 0;
}

function isvalidSignupEmail2(value) {
  return value.includes('@') && value.includes('.');
}

elSignupEmailInput.onkeyup = function() {
  if (!isvalidSignupEmail1(elSignupEmailInput.value)) {
    elSignupEmailHelper1.classList.remove('hidden');
    elSignupEmailHelper2.classList.remove('hidden');
    elSignupEmailHelper3.classList.add('hidden');
  } else if (!isvalidSignupEmail2(elSignupEmailInput.value)) {
    elSignupEmailHelper1.classList.add('hidden');
    elSignupEmailHelper2.classList.remove('hidden');
    elSignupEmailHelper3.classList.add('hidden');
  } else {
    elSignupEmailHelper1.classList.add('hidden');
    elSignupEmailHelper2.classList.add('hidden');
    elSignupEmailHelper3.classList.add('hidden');
  }
}

function isValidPassword(password) {
    // 비밀번호가 8자 이상, 20자 이하인지 확인
    var isLengthValid = password.length >= 8 && password.length <= 20;

    // 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함하는지 확인
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumber = /[0-9]/.test(password);
    var hasSpecialChar = /[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>/?]/.test(password);

    return isLengthValid && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

elSignupPasswordInput.onkeyup = function() {
    var password = elSignupPasswordInput.value;
    if (!password) {
        elSignupPasswordHelper1.classList.remove('hidden');
        elSignupPasswordHelper2.classList.add('hidden');
    } else {
        if (isValidPassword(password)) {
            elSignupPasswordHelper1.classList.add('hidden');
            elSignupPasswordHelper2.classList.add('hidden');
        } else {
            elSignupPasswordHelper1.classList.add('hidden');
            elSignupPasswordHelper2.classList.remove('hidden');
        }
    }
}

function validatePasswordConfirmation(password, confirmPassword) {
    // 비밀번호 확인을 입력하지 않은 경우
    if (!confirmPassword) {
        elSignupPassword2Helper1.classList.remove('hidden');
        elSignupPassword2Helper2.classList.add('hidden');
        return false;
    }

    // 비밀번호 확인과 비밀번호가 다른 경우
    if (password !== confirmPassword) {
        elSignupPassword2Helper1.classList.add('hidden');
        elSignupPassword2Helper2.classList.remove('hidden');
        return false;
    }

    // 모든 검사 통과 시
    elSignupPassword2Helper1.classList.add('hidden');
    elSignupPassword2Helper2.classList.add('hidden');
    return true;
}

// 비밀번호 확인 입력 필드의 변경 이벤트 리스너 추가
elSignupPasswordInput2.addEventListener('input', function() {
    var password = elSignupPasswordInput.value;
    var confirmPassword = elSignupPasswordInput.value;
    validatePasswordConfirmation(password, confirmPassword);
})


function validateName(name) {
    // 닉네임을 입력하지 않은 경우
    if (!name) {
        elSignupNameHelper1.classList.remove('hidden');
        elSignupNameHelper2.classList.add('hidden');
        elSignupNameHelper3.classList.add('hidden');
        return false;
    }

    // 닉네임에 띄어쓰기가 있는 경우
    if (name.includes(' ')) {
        elSignupNameHelper1.classList.add('hidden');
        elSignupNameHelper2.classList.remove('hidden');
        elSignupNameHelper3.classList.add('hidden');
        return false;
    }

    // 닉네임이 11자 이상인 경우
    if (name.length > 10) {
        elSignupNameHelper1.classList.add('hidden');
        elSignupNameHelper2.classList.add('hidden');
        elSignupNameHelper3.classList.remove('hidden');
        return false;
    }

    // 모든 검사 통과 시
    elSignupNameHelper1.classList.add('hidden');
    elSignupNameHelper2.classList.add('hidden');
    elSignupNameHelper3.classList.add('hidden');
    return true;
}

// 닉네임 입력 필드의 변경 이벤트 리스너 추가
elSignupNameInput.addEventListener('input', function() {
    validateName(elSignupNameInput.value);
})

// 회원가입 로직 추가
document.querySelector('#signupbtn').addEventListener('click', async () => {
    const email = elSignupEmailInput.value;
    const password = elSignupPasswordInput.value;
    const nickname = elSignupNameInput.value;

    const response = await fetch('http://localhost:8080/users/signup', {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ email, password, nickname })
    });

    const responseData = await response.json();

    switch (responseData.status) {
        case 201:
            alert("회원가입 성공");
            setTimeout(() => {
                location.href = "/";
              }, 1000);
            return;
        case 400:
            alert("이메일, 비밀번호, 닉네임을 모두 입력해주세요.");
            return;
        case 404:
            alert("이미 가입한 이메일입니다.");
            return;
        default:
            alert("회원가입 실패");
            // console.log(responseData.message);
    }
})