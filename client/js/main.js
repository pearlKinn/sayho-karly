import { attr, getNode, getNodes, insertLast } from '../lib/dom/index.js';
import { tiger } from '../lib/utils/index.js';

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

    console.log(productId, quantity);
    const response = await tiger.post('http://localhost:3000/carts', {
      productId,
      quantity,
    });

    console.log('response', response);
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
      <ul class="relative flex w-full flex-col justify-between border">
        <li class="relative mb-4" style="width:240px">
          <img class="" src="./assets/${item.image.thumbnail}" alt="" />
        </li>
        <li class="mb-2 text-base">${item.name}</li>
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

async function handleProductList() {
  const response = await tiger.get('http://localhost:3000/products');
  const products = response.data; // 배열 4개 들어있어

  //상품 목록 렌더링
  renderProducts(products);
}

window.addEventListener('DOMContentLoaded', handleProductList); //dom이 준비가 되면 콜백함수 실행
// import {
//   getNode,
//   getNodes,
//   insertLast,
//   removeClass,
// } from '../lib/dom/index.js';
// import { delayP, tiger } from '../lib/utils/index.js';

// const mainProductList = getNode('.mainProductList');
// const openButton = getNode('.openButton');

// function handleButton(e) {
//   console.log('안녕', e.target);
// }

// // console.log(mainProductList);

// async function handleProductList() {
//   //상품 목록 불러오기

//   const response = await tiger.get('http://localhost:3000/products');
//   //console.log(response.data[1]); // {0번째 데이터를 가져온것}

//   const products = response.data; // 배열 4개 들어있어
//   let openButtons;

//   //상품 목록 렌더링
//   products.forEach((item) => {
//     const productCard = /* HTML */ `
//       <ul class="relative flex w-full flex-col justify-between border">
//         <li class="relative mb-4" style="width:240px">
//           <img class="" src="./assets/${item.image.thumbnail}" alt="" />
//         </li>
//         <li class="mb-2 text-base">${item.name}</li>
//         <li class="font-semibold">${item.price} 원</li>

//         <li class="absolute right-[15px] top-[258px]">
//           <button class="openButton">
//             <img src="./assets/img/main/cart.png" alt="장바구니" />
//           </button>
//         </li>
//       </ul>
//     `;
//     /*  할인율    <li class="font-semibold">
//         <span class="mr-2 font-semibold text-accentOrange">24&#37; </span> ${item.price} 원    </li>
//         </li> */
//     insertLast(mainProductList, productCard);

//     console.log(mainProductList.lastElementChild);
//     openButtons = getNodes('.openButton');
//     // console.log(openButtons);
//     // openButton.addEventListener('click', () => console.log('되니'));
//   });

//   openButtons.forEach((button) => {
//     console.log(button);
//     button.addEventListener('click', handleButton);
//   });

//   // console.log(openButton);
//   return openButton;

//   // removeClass;
// }
// window.addEventListener('DOMContentLoaded', handleProductList); //dom이 준비가 되면 콜백함수 실행

// // console.log(handleProductList);

// /* 1.장바구니 이미지에 이벤트 핸들러 달기 (모달창띄우는)
// 2.포이치 안에 item의 정보가 모달창에도 전달되게하기 -> e.target 이건언제쓰임?
// 모달창 스타일한거는 어케 가져옴?  */

// // 프라미스를...써야하는뎅.,.,...  음...
// /* delayP({
//   data: '성공~',
//   timeout: 0,
// }).then((res) => {
//   console.log(res);
// });
//  */
