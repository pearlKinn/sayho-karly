import { getNode } from '../lib/index.js';

const URL = 'http://localhost:3000/products';

// data 불러오는 함수
// option에는 통신방법이 옵니다. (객체로서 들어옵니다))
const itemData = async () => {
  const response = await fetch('http://localhost:3000/products');
  const data = await response.json();

  if (!response.ok) {
    return new Error('데이터를 불러오는데 실패했습니다.');
  }

  return data;
};

const data = await itemData();

// data값에서 이것저것 출력해보자
data.forEach((item) => {
  console.log(item);
});

// data값에서 name값만 출력해보자
data.forEach((item) => {
  console.log(item.name);
});

// data값에서 쫄면 name값만 출력해보자
console.log(data[1].name);

// 쫄면 name값을 변경해보자.
data[1].name = '짜잔~';
// 실제 데이터는 변경되지 않았다.
console.log(data[1].name);

//post통신으로 json파일에 데이터추가해보기
// 잘 되는데, 아이디값만 추가된다. 이유가 뭐지??? 지우는건 어떻게하지?
function postTest() {
  fetch('http://localhost:3000/products', {
    method: 'GET',
    body: JSON.stringify({
      user: {
        name: 'John',
        email: 'john@example.com',
      },
    }),
  });
}

// postTest();

//
