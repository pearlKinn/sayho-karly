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

// const products = await itemData();

// // console.log(products);

// //   스토리지에 data id 값 넣어보기
// function itemPutId() {
//   //   console.log(products[0].id);

//   for (let i = 0; i < 4; i++) {
//     saveStorage(String(i), products[i].id);
//   }
// }
// itemPutId();

// let keys = Object.keys(localStorage);

// for (let key of keys) {
//   //   console.log(`${key}: ${localStorage.getItem(key)}`);
//   if (localStorage.getItem(key) === 'product-akqk') {
//     console.log('yes');
//   } else {
//     console.log('no');
//     // console.log(localStorage.getItem(key));
//   }
// }
// loadStorage('0')
//   .then((value) => {
//     // 비동기적으로 성공적으로 데이터를 가져온 경우
//     // console.log(`로컬 스토리지에서 '0'의 값은 ${value} 입니다.`);
//     if (value === 'product-ekfk') {
//       console.log('ok');
//     }
//   })
//   .catch((error) => {
//     // 비동기적으로 데이터를 가져오는데 실패한 경우
//     console.error(error.message);
//   });

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
