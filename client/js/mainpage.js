
import { getNode } from '../lib/dom/index.js';

// 메인 배너 swiper

new Swiper(".mySwiper", {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, //버튼을 눌러도 오토플레이가 멈추지 않음
  },
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,

  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// 최근 본 상품 스크롤 걸리게

const content = document.querySelector('.scrollFixedContainer');
const wing = document.querySelector('.fixedMenu');

// 컨텐츠 영역부터 브라우저 최상단까지의 길이 구하기
const contentTop = content.getBoundingClientRect().top + window.scrollY;

window.addEventListener('scroll', function(){
  if(window.scrollY >= contentTop){
    wing.classList.add('fixed');
  }else{
    wing.classList.remove('fixed');
  }
});

