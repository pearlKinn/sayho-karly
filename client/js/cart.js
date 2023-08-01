import { getNode, getNodes } from '../lib/dom/index.js';
import { loadStorage, tiger } from '../lib/utils/index.js';
import { insertLast } from '../lib/dom/insert.js';

//-------------------체크박스 선택 토글
const checkList = getNodes('.checkList'); //여러개불러와야해
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

// checkAll[0]와 checkAll[1] 모두에게 이벤트 등록
checkAll.forEach((checkbox) => {
  checkbox.addEventListener('click', function () {
    handleCheckAllToggle(this);
  });
});
