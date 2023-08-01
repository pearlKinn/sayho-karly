import {
  tiger,
  getNode,
  getNodes,
  removeClass,
  xhrPromise,
  insertLast,
} from '../lib/index.js';

const response = await tiger.get('http://localhost:3000/products');
const products = response.data;

const modal = getNode('.modal');
const modalClose = getNode('.cartOrder__button');

const modalButton = getNodes('.modalButton');
// console.log(modalButton);

// const modalRemove = getNode('btnList__remove');
// const modaladd = getNode('btnList__add');

let count = 1;

function handleProductQuantity(e) {
  const target = e.target.closest('button');
  console.log(target);

  const quantity = getNode('#quantity'); //

  if (!target) return;
  console.log(target);
  console.log(quantity);
  if (target.classList.contains('btnList__add')) {
    // console.log('.btnList__add');
    quantity.textContent = ++count;
  } else if (quantity.textContent === '1') return;
  else if (target.classList.contains('btnList__remove')) {
    quantity.textContent = --count;
  }
}
//모달창 열때 클리어컨텐츠 유틸함수 사용 ?

function handleModalOpen() {
  modal.classList.remove('hidden');
}

function handleModalClose() {
  modal.classList.add('hidden');
}

modalButton.forEach((item) => {
  item.addEventListener('click', handleModalOpen);
});

modalClose.addEventListener('click', handleModalClose);

// modalBox.addEventListener('click', handleProductQuantity);

(function setEvent() {
  const modalBox = getNode('.modalBox');
  modalBox.addEventListener('click', handleProductQuantity);
})();

//자기 자신을 실행 즉시실행함수? ㅎㅎㅎㅎㅎㅎ 전역오염 X
