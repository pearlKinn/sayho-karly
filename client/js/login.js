import { addValidateForInputEvent, emailReg, getNode, pwReg } from "../lib";

 const IdInput = getNode('.loginIdInput')
 const passwordInput = getNode('.loginPwdInput')

 addValidateForInputEvent(IdInput, emailReg);
 addValidateForInputEvent(passwordInput, pwReg);