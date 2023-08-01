import {
  pwReg,
  getNode,
  addClass,
  getNodes,
  emailReg,
  loadStorage,
  removeClass,
  saveStorage,
  generateRandomID,
  addValidateForInputEvent,
} from '../lib/index.js';

const authBtn = getNode('.authBtn');
const signupBtn = getNode('.signupBtn');
const IdInput = getNode('.userIdInput');
const nameInput = getNode('.userNameInput');
const emailInput = getNode('.userEmailInput');
const PhoneInput = getNode('.userPhoneInput');
const searchAddress = getNode('.searchAddressBtn');
const passwordInput = getNode('.userPasswordInput');
const passwordCheckInput = getNode('.userCheckInput');
const checkList = getNodes('.checkAgree');
const checkAll = getNode('.allAgree');

function handleCheckPwd(e) {
  const errorMessage = e.target.nextElementSibling;
  if (passwordInput.value !== passwordCheckInput.value) {
    removeClass(errorMessage, 'hidden');
  } else {
    addClass(errorMessage, 'hidden');
  }
}

function handleCheckValidation(e) {
  const errorMessage = e.target.nextElementSibling;
  if (hasNumber(nameInput.value)) {
    removeClass(errorMessage, 'hidden');
  } else {
    addClass(errorMessage, 'hidden');
  }
}

function handleCheckNumeric(e) {
  const inputValue = e.target.value;

  // 숫자 이외의 문자를 제거하여 숫자만 남깁니다.
  const numericValue = inputValue.replace(/\D/g, '');
  // 숫자만 남은 값을 input 요소에 설정합니다.
  e.target.value = numericValue;

  if (e.target.value) {
    removeClass(authBtn, 'disabled:border-gray-300');
    removeClass(authBtn, 'disabled:font-semibold');
    removeClass(authBtn, 'disabled:text-gray-300');
  } else {
    addClass(authBtn, 'disabled:border-gray-300');
    addClass(authBtn, 'disabled:font-semibold');
    addClass(authBtn, 'disabled:text-gray-300');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const id = IdInput.value;
  const password = passwordInput.value;
  const UID = generateRandomID(10);

  if (!id || !password || !emailInput || !nameInput || !PhoneInput) {
    alert('필수 입력값을 입력해주세요');
  } else {
    if (!emailReg(id) || !pwReg(password)) {
      alert('알맞은 양식을 지켜주세요');
    } else {
      saveStorage('uniqueID', UID);
      window.location.reload();
    }
  }
}

function openLinkInPopup(e) {
  e.preventDefault();
  const url = 'https://www.kurly.com/address/shipping-address';
  window.open(url, '_blank', 'width=500, height=400');
}

function hasNumber(text) {
  if (typeof text !== 'string') {
    return false;
  }

  const regex = /\d/;
  return regex.test(text);
}

let isChecked = false;
function handleToggle(e) {
  const target = e.target;
  isChecked = !isChecked;

  if (isChecked) {
    target.style.backgroundImage =
      'url(/assets/img/register/isChecked=true.svg)';
  } else {
    target.style.backgroundImage =
      'url(/assets/img/register/isChecked=false.svg)';
  }
}

checkList.forEach((item) => {
  item.addEventListener('click', handleToggle);
});

function handleCheckAllToggle(checkbox) {
  const isChecked = checkbox.checked;

  checkList.forEach((item) => {
    item.checked = isChecked;

    // 배경 이미지 변경
    if (isChecked) {
      item.style.backgroundImage =
        'url(/assets/img/register/isChecked=true.svg)';
    } else {
      item.style.backgroundImage =
        'url(/assets/img/register/isChecked=false.svg)';
    }
  });
  
  // 배경 이미지 변경
  if (isChecked) {
    checkAll.style.backgroundImage =
      'url(/assets/img/register/isChecked=true.svg)';
  } else {
    checkAll.style.backgroundImage =
      'url(/assets/img/register/isChecked=false.svg)';
  }
}
checkAll.addEventListener('click', function () {
  handleCheckAllToggle(this);
});
addValidateForInputEvent(IdInput, emailReg);
addValidateForInputEvent(passwordInput, pwReg);
addValidateForInputEvent(emailInput, emailReg);
passwordCheckInput.addEventListener('input', handleCheckPwd);
nameInput.addEventListener('input', handleCheckValidation);
PhoneInput.addEventListener('input', handleCheckNumeric);
searchAddress.addEventListener('click', openLinkInPopup);
signupBtn.addEventListener('click', handleRegister);

window.addEventListener('load', () => {
  loadStorage('uniqueID').then((res) => {
    if (res) {
      window.location.href = '/';
    }
  });
});
