import {
  pwReg,
  getNode,
  emailReg,
  saveStorage,
  generateRandomID,
  addValidateForInputEvent,
} from '../lib/index.js';

const IdInput = getNode('.loginIdInput');
const passwordInput = getNode('.loginPwdInput');
const loginBtn = getNode('.loginBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', handleLogin);
}

function handleLogin(e) {
  e.preventDefault();
  const Id = IdInput.value;
  const password = passwordInput.value;

  if (!Id || !password) {
    alert('아이디 및 비밀번호는 필수 입력값입니다.');
    window.location.href = '/login.html';
  } else {
    const UID = generateRandomID(10);
    saveStorage('uniqueID', UID);
    window.location.href = '/';
  }
}

addValidateForInputEvent(IdInput, emailReg);
addValidateForInputEvent(passwordInput, pwReg);
   