import { getNode, insertLast } from '../lib/dom/index.js';
import { tiger } from '../lib/utils/tiger.js';

const mainProductList = getNode('.mainProductList');
// console.log(mainProductList);

async function handleProductList() {
  //상품 목록 불러오기

  const response = await tiger.get('http://localhost:3000/products');
  //console.log(response.data[1]); // {0번째 데이터를 가져온것}
  const products = response.data; // 배열 4개 들어있어

  //상품 목록 렌더링
  products.forEach((item) => {
    const productCard = /* HTML */ `
      <div>
        <ul class="relative w-[249px]">
          <li class="relative mb-4">
            <img
              class="w-[249px]"
              src="./assets/${item.image.thumbnail}"
              alt=""
            />
          </li>
          <li class="mb-2 text-base">${item.name}</li>
          <li class="font-semibold">${item.price} 원</li>

          <li class="absolute right-[15px] top-[258px]">
            <button class="productButton">
              <img
                src="./assets/img/main/cart.png"
                alt="장바구니"
                onclick="handleCartModal"
              />
            </button>
          </li>
        </ul>
      </div>
    `;
    /*  할인율    <li class="font-semibold">
        <span class="mr-2 font-semibold text-accentOrange">24&#37; </span> ${item.price} 원    </li>
        </li> */
    insertLast(mainProductList, productCard);
  });
  const productButton = getNode('.productButton');
  console.log(productButton);
}
window.addEventListener('DOMContentLoaded', handleProductList); //dom이 준비가 되면 콜백함수 실행

/* 1.장바구니 이미지에 이벤트 핸들러 달기 (모달창띄우는)
2.포이치 안에 item의 정보가 모달창에도 전달되게하기 -> e.target 이건언제쓰임? 
모달창 스타일한거는 어케 가져옴?  */
