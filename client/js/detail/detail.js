// 아이템 수량 체크하는 기능 구현하기
import { getNode } from '../lib/index.js';

// 상품의 수량을 체크하는 함수입니다.
const dl = getNode('#itemSelect');

let count = 1;
function handleItemSelect(e) {
  const target = e.target.closest('button');
  const itemNum = getNode('#itemQuantity');

  if (!target) return;

  if (target.classList.contains('itemUp')) {
    count = count + 1;
    itemNum.textContent = count;
    // ' - ' 이미지 검은색으로 변경되도록 추가해야함.
  } else if (itemNum.textContent === '1') {
    return;
  } else if (target.classList.contains('itemDown')) {
    count = count - 1;
    itemNum.textContent = count;
    // console.log(itemNum.textContent);
  }
}

dl.addEventListener('click', handleItemSelect);
