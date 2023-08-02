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
let checkedValues = new Array(4).fill(false);
let allAgreeCheckedValue = false;

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

function handleChecked(e, checkedValueIdx) {
  const target = e.target;
  checkedValues[checkedValueIdx] = !checkedValues[checkedValueIdx];
  if (checkedValues[checkedValueIdx]) {
    // 임의의 checkedValues를 체크했을 때
    target.style.backgroundImage =
      'url(/assets/img/register/isChecked=true.svg)';
    if (!checkedValues.includes(false)) {
      allAgreeCheckedValue = true;
      checkAll.style.backgroundImage =
        'url(/assets/img/register/isChecked=true.svg)';
    }
  } else {
    // 임의의 checkedValues를 체크가 해제됐을 때
    allAgreeCheckedValue = false;
    checkAll.style.backgroundImage =
      'url(/assets/img/register/isChecked=false.svg)';
    target.style.backgroundImage =
      'url(/assets/img/register/isChecked=false.svg)';
  }
}

checkList.forEach((item, idx) => {
  item.addEventListener('click', (e) => handleChecked(e, idx));
});

function handleAllAgreeChecked() {
  
  if (allAgreeCheckedValue) {
    allAgreeCheckedValue = false;
    checkAll.style.backgroundImage =
      'url(/assets/img/register/isChecked=false.svg)';
    checkedValues = checkedValues.map((_, idx) => {
      checkList[idx].style.backgroundImage =
        'url(/assets/img/register/isChecked=false.svg)';
      return false;
    });
  } else {
    allAgreeCheckedValue = true;
    checkAll.style.backgroundImage =
      'url(/assets/img/register/isChecked=true.svg)';
    checkedValues = checkedValues.map((_, idx) => {
      checkList[idx].style.backgroundImage =
        'url(/assets/img/register/isChecked=true.svg)';
      return true;
    });
    removeClass(signupBtn, 'disabled:cursor-not-allowed')
    signupBtn.disabled = false
  }

  /* 
  [해제된 전체동의를 눌러서 체크하는 경우]
  allCheckedValue = false
  1. 전체동의 클릭을 누른다
  2. allCheckedValue = true
  3. 전체동의에 대한 체크이미지를 교체한다
  4. checkedValues 모든 값을 트루로 바꿔준다.
  5. checkedValues 이미지를 체크된 이미지로 교체한다

  [체크된 전체동의하기 체크를 눌러 해제해 줬을 때] 
  1. allCheckedValue = false
  2. allCheckedValue를 이미지 교체한다.
  3. checkedValues의 값들을 모두 false로 바꿔준다.
  4. checkedValues의 이미지를 교체한다.


  [체크된 checkedValues를 하나라도 해제했을 때]
  1. 임의의 checkedValues 클릭한다.
  2. 클릭된 checkedValues를 false로 바꿔준다.
  - 이미지를 교체한다.
  3. allCheckedValue를 false로 바꿔준다..
  4. allCheckedValue의 이미지를 교체한다.
  
  [4가지 모두 체크했을 때 전체 체크하는 경우]
  allCheckedValue = false
  1. 임의의 checkedValues 클릭한다. 
  2.  클릭된 checkedValues  true로 바뀐다. 
  - 클릭된 checkedValues의 이미지를 교체한다.
  3. checkedValues 중 false가 있는지 관찰한다. => checkedValues.includes(false)
  4. false가 없다면 allCheckedValue를 true로 바꿔준다 (false가 있다면 패스)
  5. allCheckedValue가 true로 바뀐다.  
  6. allCheckedValue 이미지를 교체한다.



  */
}

checkAll.addEventListener('click', handleAllAgreeChecked);
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
