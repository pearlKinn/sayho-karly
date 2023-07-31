import { addClass, removeClass } from "../dom/index.js";

function validateInput(inputElement, validationFunction, target) {
  if (validationFunction(inputElement.value) || !inputElement.value) {
    addClass(target, 'hidden');
  } else {
    removeClass(target, 'hidden');
  }
}
export function addValidateForInputEvent(input, inputReg) {
  return input.addEventListener('input', () =>
    validateInput(input, inputReg, input.nextElementSibling)
  );
}

export function emailReg(text) {
  const RegExr =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegExr.test(String(text).toLowerCase());
}

export function pwReg(text) {
  const RegExr = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return RegExr.test(String(text).toLowerCase());
}