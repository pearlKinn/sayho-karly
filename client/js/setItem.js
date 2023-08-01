import {
  saveStorage,
  getNode,
  loadStorage,
  deleteStorage,
  getNodes,
} from '../lib/index.js';

const itemData = async () => {
  const response = await fetch('http://localhost:3000/products');
  const data = await response.json();

  if (!response.ok) {
    return new Error('데이터를 불러오는데 실패했습니다.');
  }

  return data;
};

const products = await itemData();

// console.log(products);

//   스토리지에 data id 값 넣어보기
function itemPutId() {
  //   console.log(products[0].id);

  for (let i = 0; i < 4; i++) {
    saveStorage(String(i), products[i].id);
  }
}
itemPutId();

let keys = Object.keys(localStorage);

for (let key of keys) {
  //   console.log(`${key}: ${localStorage.getItem(key)}`);
  if (localStorage.getItem(key) === 'product-akqk') {
    console.log('yes');
  } else {
    console.log('no');
    // console.log(localStorage.getItem(key));
  }
}

const keyToCheck = await loadStorage('0');

const value = localStorage.getItem(keyToCheck);

if (value !== null) {
  console.log(`로컬 스토리지에서 ${keyToCheck}의 값은 ${value} 입니다.`);
} else {
  console.log(
    `${keyToCheck}에 해당하는 값이 로컬 스토리지에 존재하지 않습니다.`
  );
}

// 메인에서 스토리지 추가하는 기능
//   loadStorage('9').then(console.log('saa')).catch(console.log('dd'));
// console.log(localStorage);
// const storageItem = getNodes('.storageItem');

// function handleItemClick() {
//   console.log('gg');
// }

// storageItem.forEach((item) => {
//   item.addEventListener('click', handleItemClick);
// });
