# Read me


### 요구사항 명세서

<img width="1217" height="192" alt="로또 요구사항 명세서" src="https://github.com/user-attachments/assets/4b45d3f8-306e-4388-9fc4-5cdd2d9dc713" />

요구사항 분석
로또 홈페이지는 사용자가 로또를 구매하고, 당첨 번호를 확인하며, 이력 및 통계 정보를 조회할 수 있는 웹 서비스입니다. 주요 이해관계자는 일반 사용자, 사이트 관리자입니다.​

핵심 목표
온라인에서 로또를 간편하게 구매/관리

최신 및 과거 당첨 번호 제공

당첨 번호 대조 및 등수 결과 제공

사용자 맞춤 정보 및 서비스 제공



### 로또 UI

<img width="1222" height="217" alt="로또 UI" src="https://github.com/user-attachments/assets/702b1ca5-6ae5-4cd8-b90b-031d516d1799" />

<img width="2551" height="1385" alt="image" src="https://github.com/user-attachments/assets/36b5542a-3a95-4d3f-af84-df024eddbdf0" />


UI/UX 설계
주요 화면 및 구성
회원가입/로그인:
간단한 입력폼, 소셜 로그인 옵션(선택), 직관적인 진행 상태 표시

로또 구매:
로또 번호는 랜덤 자동 배정, 1~5세트 선택 입력, 구매 내역 실시간 표시

로또 당첨 확인:
회차별 검색 기능, 명확한 당첨 번호 표시, 등수별 결과(애니메이션 또는 컬러 하이라이트)

구매/당첨 내역:
표/카드 기반 리스트, 내역 클릭시 상세정보 팝업 또는 이동

관리자 전용 화면:
당첨 번호 등록/수정, 회원/구매관리, 직관적인 대시보드




### API 리스트


<img width="1223" height="327" alt="API 리스트" src="https://github.com/user-attachments/assets/48ebd7ea-0ebb-4c54-ab38-0b1dc49ba2c1" />

기능 요구 사항

기본적으로 제약조건은 기존 프리코스 3주차에 실행 했던 기능 요구 사항을 따름.
API기반으로 Annotation을 사용해서 get set 메서드 구현.
MongoDB와 연결해서 데이터를 주고 받을 수 있는지
Reactjs로 ui를 구성해서 Springboot로 기능 세팅.





