<div align=center>
    <h3>💜 Karly 💜</h3>
    <p>✨ Say 호~! 조 ✨</p>
</div>
</br></br>

> Tailwind & Javascript 이용하여 마켓 칼리 페이지 구현
> 프로젝트 기간 : 2023.07.28-2023.08.2 (총5일)
> 기술스텍  
>  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/tailwind-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src ="https://img.shields.io/badge/javascript-cc6699.svg?&style=for-the-badge&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181817?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/notion-0000?style=for-the-badge&logo=github&logoColor=white">

</br></br>

## 역할분담

> 이호 : 상품 상세페이지, 장바구니
> 김진주 : 스크럼 마스터, 회원가입, 로그인
> 이수연 : main, footer, 최근본상품, swiper , 파비콘
> 송영은 : header, nav, main 상품영역 , 장바구니 , 모달창
> 공통 : 파비콘, 오픈그래프

</br></br>

## 주요 기능

- 공동 Github 저장소를 통해 프로젝트(project)를 관리하였습니다.
- data.json에 추가적으로 데이터를 모델링 하였습니다.
- json-server를 사용하여 서버를 구동 하며 해당 사이트에서 제공된 API 명세서를 따릅니다.
- 함수 중심으로 프로그래밍 하여 개발하였습니다.
- Tailwind CSS 기술을 사용해 스타일링 하였습니다.
- 이미지의 경우, 대체 텍스트 제공했습니다.
- 페이지 단위로 구현했습니다.

</br></br>

## 화면 플로우

- 메인페이지 상품 클릭시 해당 상품 상세 페이지로 이동.
- 메인페이지 장바구니 아이콘 클릭시 모달창 렌더링
- 메인페이지 상단 엑스박스 클릭시 배너 숨김.
- 모달창 장바구니 닫기 클릭시 장바구니에 렌더링
- 회원가입시 유니크아이디 생성 후 로컬스토리지 저장 -> 자동 로그인 후 메인페이지로 리디렉션
- 로그인시 로컬스토리지에 유니크 아이디가 저장되어 있으면 자동 로그인
- 로그아웃시 유니크아이디 장바구니 정보 삭제

</br></br>

---

## 기능구현 코드리뷰

</br>

#### ⭐️ 이호 : 상세페이지, 장바구니
[메인 상품리스트]
- 메인페이지 상품 클릭시 해당 상품 스토리지에 selectItem 저장 및 상세 페이지로 이동. 
  
[상품페이지]
- 스토리지에 저장한 selectItem 을 상세페이지 화면에 렌더링
- 상품 수량 추가 및 삭제하기 기능하는 함수 구현
- 상품 수량 체크버튼 클릭시 총 상품금액 변경 및 데이터 받아오기

[장바구니]

- 스토리지에 저장된 수량을 장바구니 수량에 렌더링

</br></br>

#### ⭐️ 송영은 : Main 상품리스트, 장바구니

</br>

[메인 상품리스트]

- Main 상품정보 data.json 랜더링
- cart icon 클릭시 모달창 클릭이벤트
- 각각 상품의 장바구니 아이콘 클릭시 해당 상품 정보를 모달창에 렌더링

[메인 상품 모달창]

- Main 장바구니 담기버튼 클릭이벤트
- 수량증감, 가격 변경
- 모달창 장바구니 담기 클릭시 해당 상품 ID값, 수량 스토리지에 저장
- 모달창 장바구니 담기 클릭시 모달창 닫기
- 모달창 숨김처리 이후 3초 상단 알림창 띄우기

[장바구니]

- Cart 스토리지에 저장되어있는 아이디값을 data.json에서 찾아서 장바구니 페이지에 렌더링
- Cart 체크박스 선택시 이미지 변경 및 전체삭제 구현

</br></br>

#### ⭐️ 김진주 : 회원가입,로그인
</br>

[회원가입]

- 아이디 유효성 검사
  비밀번호 유효성 검사
  비밀번호가 일치하는지 검사
  이름 유효성 검사
  전화번호에 숫자만 입력받을 수 있도록 함

[체크박스 기능구현]

- 전체동의 후 회원가입 가능(가입하기 disabled)
  4개 중 하나라도 false 값이면 전체 동의 off
  양식과 전체 동의 후 가입하기 활성화
  유니크아이디 생성 후 로컬스토리지 저장
  가입 성공하면 자동 로그인 후 메인페이지로 리디렉션

[로그인]

- 로그인 아이디 비밀번호 유효성검사 후 맞으면 유니크아이디 생성 및 로컬 스토리지 저장
  아이디와 비밀번호가 입력되지 않았을 때 로그인페이지로 리디렉션
  로컬스토리지에 유니크 아이디가 저장되어 있으면 자동 로그인
  모든 페이지에서 로그인 및 회원가입이 로그아웃으로 변경

[로그아웃]

- 유니크아이디 및 장바구니 정보 삭제
  메인 페이지로 이동 및 모든 페이지에서 로그아웃에서 로그인 및 회원가입 변경

</br></br>

#### ⭐️ 이수연 : 메인페이지
</br>

[상단 띠배너]

- X btn 클릭시에 띠 배너 닫히는 기능 구현

[최근 본 상품]

- 첫 진입 시에 숨겨두었다가 일정 스크롤 위치에 도달시 노출

[메인 비주얼 영역 배너]

- 스와이프 기능
  불릿 추가
  화살표 버튼 커스텀

## 구현기능
### 메인 캐러셀 구현
![](https://cdn.discordapp.com/attachments/1133636447342174229/1136173600542556240/karly_banner.gif)
### 장바구니 구현
![](https://cdn.discordapp.com/attachments/1133636447342174229/1136173755564036196/main_cart.gif)
![](https://cdn.discordapp.com/attachments/1133636447342174229/1136173630305353728/karly_cartadd.gif)
### 회원가입 구현
![](https://cdn.discordapp.com/attachments/1133636447342174229/1136173695321251940/karly_id.gif)
### 로그인 구현
![](https://cdn.discordapp.com/attachments/1133636447342174229/1136173721384648744/karly_login.gif)

### 상품 자세히 보기 구현
![](https://cdn.discordapp.com/attachments/1133636447342174229/1136174059261022258/detail_down.gif)
![](https://cdn.discordapp.com/attachments/1133636447342174229/1136174075337773056/detail_cart.gif)
