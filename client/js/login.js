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
try{
loginBtn.addEventListener('click', handleLogin);
   
}catch{
  throw new Error('로그인이 되어 있는 상태 입니다.')
}
