// 아이템 수량 체크하는 기능 구현하기
import { getNode, getNodes, clearContents, loadStorage } from '../lib/index.js';

const itemData = async () => {
  const response = await fetch('http://localhost:3000/products');
  const data = await response.json();

  if (!response.ok) {
    return new Error('데이터를 불러오는데 실패했습니다.');
  }

  return data;
};

const products = await itemData();

function priceNameChange(i) {
  // const itemImg = getNode('#priceImg');
  const itemName = getNodes('.itemName');
  const itemPrice = getNodes('.itemPrice');
  const itemDesc = getNodes('.itemDesc');
  const itemMainImg = getNode('#itemMainImg');
  const itemBanner = getNode('.itemBanner');
  const itemInfo = getNode('.itemInfo');

  itemName.forEach((item) => {
    item.textContent = products[i].name;
  });
  itemPrice.forEach((item) => {
    item.textContent = products[i].price.toLocaleString();
  });
  itemDesc.forEach((item) => {
    item.textContent = products[i].description;
  });

  // alt 속성은 함수 리팩토링 후 추가
  itemMainImg.setAttribute('src', `/assets/${products[i].image.view}`);
  itemBanner.setAttribute('src', `/assets/${products[i].image.banner}`);
  itemInfo.setAttribute('src', `/assets/${products[i].image.info}`);
}

const changeItemData = () => {
  return loadStorage('selectItem').then((value) => {
    for (let i = 0; i < products.length; i++) {
      if (value === products[i].image.thumbnail) {
        priceNameChange(i);
        return i;
      }
    }
  });
};
changeItemData();

let num = await changeItemData();

// 상품의 수량을 체크하는 함수입니다.
function createHandleItemSelect(products, num) {
  let total = Number(products[num].price);
  let count = 1;
  let priceTotal = total;

  return function handleItemSelect(e) {
    const target = e.target.closest('button');
    const itemNum = getNode('#itemQuantity');
    const totalPrice = getNode('.totalPrice');

    if (!target) return;

    if (target.classList.contains('itemUp')) {
      count++;
      itemNum.textContent = count;
      priceTotal += total;

      totalPrice.textContent = priceTotal.toLocaleString();
      // ' - ' 이미지 검은색으로 변경되도록 추가해야함.
    } else if (itemNum.textContent === '1') {
      return;
    } else if (target.classList.contains('itemDown')) {
      count--;
      itemNum.textContent = count;
      priceTotal -= total;
      totalPrice.textContent = priceTotal.toLocaleString();
    }
  };
}
// 클로저 생성
const handleItemSelect = createHandleItemSelect(products, num);

(function btnEvent() {
  const dl = getNode('#itemSelect');
  dl.addEventListener('click', handleItemSelect);
})();

// (function cartEvent() {
//   const shoppingCart = getNode('.shoppingCart');
//   shoppingCart.addEventListener('click', handleItemHandOver);
// })();
