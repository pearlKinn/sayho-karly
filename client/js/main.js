import {
  tiger,
  attr,
  getNode,
  getNodes,
  insertLast,
  removeClass,
  xhrPromise,
  saveStorage,
} from '../lib/index.js';

function handleModal() {
  const modal = getNode('.modal');
  const modalClose = getNode('.cartOrder__close');
  const addCartBtn = getNode('.cartOrder__button');
  const modalProductName = getNode('.btnList__h');

  function handleModalOpen() {
    modal.classList.remove('hidden');
  }

  function handleModalClose() {
    modal.classList.add('hidden');
  }

  async function submitCart() {
    const productId = attr(modalProductName, 'data-id');
    const quantity = getNode('.quantity').innerText;

    console.log('Id: ' + productId, '수량: ' + quantity);

    // data.json에 저장
    // const response = await tiger.post('http://localhost:3000/carts', {
    //   productId: productId,
    //   quantity: quantity,
    // });

    // 스토리지에 저장
    saveStorage(productId, quantity);
  }

  addCartBtn.addEventListener('click', submitCart);
  modalClose.addEventListener('click', handleModalClose);

  return { handleModalOpen };
}

const { handleModalOpen } = handleModal();

function handleOpenMoadal(item) {
  return function () {
    const modalProductName = getNode('.btnList__h');
    const modalProductPrice = getNode('.btnList__won');

    attr(modalProductName, 'data-id', item.id);
    modalProductName.innerText = item.name;
    modalProductPrice.innerText = item.price + '원';

    handleModalOpen();
  };
}

function renderProducts(products) {
  // 상품 렌더링 및 이벤트 리스너 추가
  const mainProductList = getNode('.mainProductList'); // 가져온거 뿌려줄 부모인 DIV를 찾아준것

  products.forEach((item) => {
    // 상품 반복
    const productCardTemplate = /* HTML */ `
      <ul class=" relative">
        <li class="relative mb-4" style="width:240px">
          <img class="" src="./assets/${item.image.thumbnail}" alt="" />
        </li>
        <li class="mb-2 w-[230px] bg-red-200 text-base" style="width:220px">
          ${item.name}
        </li>
        <li class="font-semibold">${item.price} 원</li>

        <li class="absolute right-[15px] top-[258px]">
          <button class="openButton">
            <img src="./assets/img/main/cart.png" alt="장바구니" />
          </button>
        </li>
      </ul>
    `;

    insertLast(mainProductList, productCardTemplate);

    const lastProductOpenButton =
      mainProductList.lastElementChild.querySelector('.openButton'); // 각 상품의 장바구니 버튼

    lastProductOpenButton.addEventListener('click', handleOpenMoadal(item));
  });
}

//수량증감 함수
let count = 1;
function handleProductQuantity(e) {
  const target = e.target.closest('button');
  console.log(target);

  const quantity = getNode('.quantity');

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

//자기 자신을 실행 즉시실행함수 전역오염 X

async function handleProductList() {
  const response = await tiger.get('http://localhost:3000/products');
  const products = response.data; // 배열 4개 들어있다.

  //상품 목록 렌더링
  renderProducts(products);
}

(function setEvent() {
  const modalBox = getNode('.modalBox');
  modalBox.addEventListener('click', handleProductQuantity);
})();

window.addEventListener('DOMContentLoaded', handleProductList); //dom이 준비가 되면 콜백함수 실행

const setItem = getNode('.selectItem');

// 썸네일 클릭시 스토리지에 등록하는 함수
// const testText = '미안하다 이거보여주려고 어그로끌었다.';
// console.log(testText.slice(3));

async function handleClickItem(e) {
  const target = e.target.closest('img');
  const targetThumbnail = attr(target, 'src').slice(9);

  const response = await fetch('http://localhost:3000/products');
  const data = await response.json();

  data.forEach((item) => {
    // console.log(JSON.stringify(item.image.thumbnail));
    if (item.image.thumbnail === targetThumbnail) {
      console.log('ok');
      location.href = 'detail.html';
      saveStorage('selectItem', item.image.thumbnail);
      return item.image.thumbnail;
    }
  });

  if (!target) return;
}

setItem.addEventListener('click', handleClickItem);
