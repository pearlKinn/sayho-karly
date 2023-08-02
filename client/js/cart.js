import { getNode, getNodes } from '../lib/dom/index.js';
import { loadStorage, tiger } from '../lib/utils/index.js';
import { insertLast } from '../lib/dom/insert.js';

async function handleCartList() {
  try {
    const result = await loadStorage('cartItems');
    // console.log(result);
    const renderCarts = [];

    for (const item of result) {
      const response = await tiger.get(
        `http://localhost:3000/products/${item.productId}`
      );
      const products = response.data;
      renderCarts.push(response.data);
    }

    renderFood(renderCarts);
    // const waterList = getNode('.water__list');
    // console.log(waterList);
  } catch (error) {
    console.error('에러', error);
  }
}

window.addEventListener('DOMContentLoaded', handleCartList);
// let loadFoodNum = await handleCartList();
// console.log(loadFoodNum);
// function foodLoadToStorage() {}

// 스토리지의 아이템id값을 체크하고 먼역 일치한다면 quantity를 뿌려주는 기능 구현
async function renderFood(products) {
  const btnList = getNode('.water__list');
  const foodDataLoad = await loadStorage('cartItems');
  // console.log(foodDataLoad);

  const foodDataQuantities = foodDataLoad.map((item) => {
    const foodDataItem = foodDataLoad.find((foodItem) => {
      // console.log(item.productId, foodItem);
      if (item.quantity === foodItem.quantity) {
        return foodItem.quantity;
      }
    });

    return foodDataItem ? foodDataItem.quantity : 0;
  });

  // async function renderFood(products) {
  //   const btnList = getNode('.water__list');
  //   const foodDataLoad = await loadStorage('cartItems');

  products.forEach((item, index) => {
    const quantity = foodDataQuantities[index];
    // console.log(foodDataQuantities);
    const productFoodTemplate = /* HTML */ `
      <li
        class="btnList flex h-[118px] w-[742px] items-center gap-2 bg-no-repeat"
      >
        <div
          style="
      background-image: url(/assets/img/register/isChecked=true.svg);
    "
          class="checkList h-[24px] w-[24px] bg-cover"
        ></div>
        <img
          src="./assets/${item.image.thumbnail}"
          alt="상품 탱탱쫄면"
          style="width:60px"
        />
        <span class="btnList__h w-[345px]">${item.name}</span>
        <div
          class="btnGroup border-[#C4C4C4]] flex w-[84px] items-center gap-2 border"
        >
          <button
            type="button"
            class="btnList__remove h-[30px] w-[30px] bg-[url('/assets/img/cart/minus.png')] bg-auto bg-center bg-no-repeat"
          ></button>
          <span class="itemquan">${quantity}</span>
          <button
            type="button"
            class="btnList__add btnList__remove h-[30px] w-[30px] bg-[url('/assets/img/cart/plus.png')] bg-auto bg-center bg-no-repeat"
          ></button>
        </div>
        <span class="btnList__won ml-auto">${item.price} 원</span>
        <button
          type="button"
          class="btnList__cancel mr-4 h-[30px] w-[30px] bg-[url('/assets/img/cart/close.png')] bg-auto bg-center bg-no-repeat"
        ></button>
      </li>
    `;

    insertLast(btnList, productFoodTemplate);
    toggleCheckboxes();
  });
}

//-------------------체크박스 선택 토글

const toggleCheckboxes = () => {
  const checkList = getNodes('.checkList');
  const checkAll = getNodes('.checkAll');

  let isChecked = false;

  function handleToggle(e) {
    const target = e.target;

    isChecked = !isChecked;
    if (isChecked) {
      target.style.backgroundImage =
        "url('/assets/img/register/isChecked=true.svg')";
    } else {
      target.style.backgroundImage =
        "url('/assets/img/register/isChecked=false.svg')";
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
    checkAll.forEach((checkbox) => {
      if (isChecked) {
        checkbox.style.backgroundImage =
          'url(/assets/img/register/isChecked=true.svg)';
      } else {
        checkbox.style.backgroundImage =
          'url(/assets/img/register/isChecked=false.svg)';
      }
    });
  }

  checkList.forEach((item) => {
    item.addEventListener('click', handleToggle);
  });

  checkAll.forEach((checkbox) => {
    checkbox.addEventListener('click', function () {
      handleCheckAllToggle(this);
    });
  });
};

checkList.forEach((item) => {
  item.addEventListener('click', handleToggle);
});

// checkAll[0]와 checkAll[1] 모두에게 이벤트 등록
checkAll.forEach((checkbox) => {
  checkbox.addEventListener('click', function () {
    handleCheckAllToggle(this);
  });
});

//상품수량에 버튼 클릭이벤트
// const addBtns = getNodes('.btnList__add');
// const add

function createHandleItemSelect() {
  let total = 1;
  let count = 1;
  let priceTotal = total;

  return function handleItmeQuantity(e) {
    const target = e.target.closest('button');
    const itemquan = getNode('.itemquan');

    if (!target) return;
    // console.log(e.target);
    if (target.classList.contains('btnList__add')) {
      count++;
      itemquan.textContent = count;
      priceTotal += total;
    } else if (itemquan.text === '1') {
      return;
    } else if (target.classList.contains('btnList__remove')) {
      count--;
      itemquan.textContent = count;
      priceTotal -= total;
    }
  };
}

const handleItmeQuantity = createHandleItemSelect();

(function itemQuantityEvent() {
  const addMinusBtn = getNode('.cart__left');
  addMinusBtn.addEventListener('click', handleItmeQuantity);
})();
