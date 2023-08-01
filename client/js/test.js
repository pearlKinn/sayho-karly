import { tiger, getNode, getNodes, removeClass } from '../lib/index.js';

const response = await tiger.get('http://localhost:3000/products');
const products = response.data;

const modal = getNode('.modal');
const modalClose = getNode('.cartOrder__button');

const modalButton = getNodes('.modalButton');
console.log(modalButton);

function handleModalOpen() {
  modal.classList.remove('hidden');
}

function handleModalClose() {
  modal.classList.add('hidden');
}

modalButton.forEach((item) => {
  item.addEventListener('click', handleModalOpen);
});

modalClose.addEventListener('click', handleModalClose);
