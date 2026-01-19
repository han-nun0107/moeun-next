# 잇츠미

### 🍶 전통 주류 판매 & 취향 테스트 플랫폼

## 잇츠미란?

전통 주류를 판매하고, 개인의 취향을 분석하는 **취향 테스트**를 제공하는  
이커머스 플랫폼입니다.  
사용자는 테스트를 통해 자신의 입맛을 확인하고,  
이에 맞는 전통 주류와 패키지를 추천받을 수 있습니다.

---

## 👥 개발자

| 역할 | 이름 |
| --- | --- |
| 개발자 | 정우수 |

---

## 🛠 기술 스택

### Frontend

- **React 19.1.0** – UI 라이브러리
- **TypeScript 5** – 타입 안정성
- **Next.js 16.0.10** – React 기반 풀스택 프레임워크
- **Tailwind CSS 4** – 유틸리티 퍼스트 스타일링

---

### State Management & Data Fetching

- **Zustand 5.0.6** – 전역 상태 관리
- **TanStack Query 5.83.0** – 서버 상태 관리
- **Axios 1.10.0** – HTTP 클라이언트

---

### Backend / Auth / Infra

- **Supabase**
  - `@supabase/supabase-js`
  - `@supabase/ssr`
  - 인증, 세션 관리, 서버 연동

---

### Payment

- **Toss Payments SDK**
  - `@tosspayments/tosspayments-sdk`
  - 결제 연동 처리

---

### UI / UX & Utilities

- **Radix UI (Slider)** – 접근성 고려 UI 컴포넌트
- **lucide-react** – 아이콘 라이브러리
- **Swiper** – 슬라이더 UI
- **html2canvas** – DOM → 이미지 캡처
- **clsx** – 조건부 클래스 관리
- **tailwind-merge** – Tailwind 클래스 병합
- **react-focus-lock** – 접근성 포커스 제어
- **react-hook-form** – 폼 상태 관리
- **date-fns-tz** – 타임존 기반 날짜 처리
- **js-cookie** – 쿠키 관리
- **Pretendard** – 폰트 적용

---

### Development Tools

- **ESLint** – 코드 린팅
- **Prettier** – 코드 포맷팅
- **Prettier Plugin TailwindCSS** – Tailwind 클래스 정렬
- **TypeScript Strict Mode** – 타입 안정성 강화
- **Turbopack** – Next.js 고속 빌드 도구

---

## 🌿 브랜치 전략

### Git Flow 기반 브랜치 구조

```bash
main (production)
├── develop (integration)
├── feature/기능명
├── hotfix/긴급수정
└── release/배포준비
```

### 브랜치별 역할

| 브랜치 | 목적 | 설명 |
| --- | --- | --- |
| `main` | 프로덕션 | 실제 서비스 배포 |
| `develop` | 개발 통합 | 기능 개발 완료 후 병합 |
| `feature/*` | 기능 개발 | 개별 기능 단위 개발 |
| `hotfix/*` | 긴급 수정 | 운영 중 버그 수정 |
| `release/*` | 배포 준비 | 배포 전 최종 테스트 |

---

## 📝 컨벤션

### 디렉토리 / 파일 규칙

| 항목 | 규칙 | 예시 |
| --- | --- | --- |
| 📁 디렉토리 | camelCase | `userProfile`, `myPage` |
| 📄 일반 파일 | camelCase | `helperFunctions.ts` |
| 📦 컴포넌트 폴더 | PascalCase | `components/Button/` |
| 🧩 컴포넌트 파일 | PascalCase | `Button.tsx`, `Modal.tsx` |

---

### 커밋 타입

| Type | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 스타일 수정 |
| `refactor` | 구조 개선 |
| `test` | 테스트 코드 |
| `chore` | 설정/패키지 관리 |
| `remove` | 코드 제거 |
| `hotfix` | 긴급 수정 |
| `deprecated` | 제거 예정 코드 |
| `design` | UI/UX 작업 |

#### 커밋 예시

```bash
feat: 취향 테스트 결과 페이지 구현 (#12)
fix: 결제 요청 실패 시 에러 처리 수정 (#24)
docs: README 기술 스택 업데이트
refactor: 패키지 구성 로직 분리
```

---

## 📁 프로젝트 구조

```bash
📦 src
├── api
│   ├── payment
│   ├── product
├── app
│   ├── (with-layout)
│   │   ├── cart
│   │   │   ├── complete
│   │   │   ├── page.tsx
│   │   ├── feedback
│   │   │   ├── page.tsx
│   │   ├── item
│   │   │   ├── [id]
│   │   ├── layout.tsx
│   │   ├── like-page
│   │   │   ├── page.tsx
│   │   ├── my-page
│   │   │   ├── edit
│   │   │   ├── history
│   │   │   ├── layout.tsx
│   │   │   ├── order
│   │   │   ├── page.tsx
│   │   ├── package
│   │   │   ├── page.tsx
│   │   ├── page.tsx
│   │   ├── search
│   │   │   ├── page.tsx
│   │   ├── test
│   │   │   ├── page.tsx
│   ├── api
│   │   ├── payment
│   │   │   ├── confirm
│   │   ├── payments
│   │   │   ├── order
│   ├── auth
│   │   ├── callback
│   │   │   ├── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── login
│   │   ├── page.tsx
├── assets
│   ├── icons
│   │   ├── card
│   │   │   ├── fullHeart.svg
│   │   │   ├── heartButton.svg
│   │   ├── cart
│   │   │   ├── minus.svg
│   │   │   ├── plus.svg
│   │   ├── dropdown
│   │   │   ├── arrow.svg
│   │   ├── header
│   │   │   ├── cart.svg
│   │   │   ├── like.svg
│   │   │   ├── mypage.svg
│   │   ├── input
│   │   │   ├── search.svg
│   │   ├── login
│   │   │   ├── google-icon.svg
│   │   │   ├── kakao-icon.svg
│   │   │   ├── naver-icon.svg
│   │   ├── logo
│   │   │   ├── logo-black.svg
│   │   │   ├── logo-footer.svg
│   │   │   ├── logo-white.svg
│   │   ├── modal
│   │   │   ├── close.svg
│   │   ├── my-page
│   │   │   ├── my-question.svg
│   │   │   ├── select-cart.svg
│   │   ├── pagination
│   │   │   ├── next.svg
│   │   │   ├── prev.svg
│   │   ├── search
│   │   │   ├── search.svg
│   │   ├── star-rating
│   │   │   ├── star-rating.svg
│   │   ├── test
│   │   │   ├── facebook-icon.svg
│   │   │   ├── kakao-icon.svg
│   │   │   ├── link-icon.svg
│   │   │   ├── share.svg
│   ├── test.png
├── components
│   ├── auth
│   │   ├── AuthProvider.tsx
│   ├── cart
│   │   ├── CompleteErrorMessage.tsx
│   ├── common
│   │   ├── Button.tsx
│   │   ├── card
│   │   │   ├── CardImage.tsx
│   │   │   ├── DetailCard.tsx
│   │   │   ├── HeartButton.tsx
│   │   │   ├── PackageModalCard.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── RecommendedCard.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ReviewMainCard.tsx
│   │   │   ├── TestCard.tsx
│   │   ├── Card.tsx
│   │   ├── Carousel.tsx
│   │   ├── Dropdown.tsx
│   │   ├── gauge-bar
│   │   │   ├── JustifiedText.tsx
│   │   ├── GaugeBar.tsx
│   │   ├── index.ts
│   │   ├── Input.tsx
│   │   ├── item-row
│   │   │   ├── ItemRowLabel.tsx
│   │   │   ├── ItemRowList.tsx
│   │   │   ├── list-component
│   │   ├── ItemRowContent.tsx
│   │   ├── modal
│   │   │   ├── AlarmModal.tsx
│   │   │   ├── EditNickNameModal.tsx
│   │   │   ├── Portal.tsx
│   │   │   ├── RecommendedModal.tsx
│   │   │   ├── ResignationModal.tsx
│   │   │   ├── ReviewModal.tsx
│   │   │   ├── ReviewSlider.tsx
│   │   │   ├── ReviewStarTag.tsx
│   │   │   ├── ReviewSummaryForm.tsx
│   │   │   ├── SelectCartModal.tsx
│   │   │   ├── TasteReviewModal.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── RetryIcon.tsx
│   │   ├── Slider.tsx
│   │   ├── StarRating.tsx
│   │   ├── Tag.tsx
│   ├── detail
│   │   ├── DetailFeedback.tsx
│   │   ├── DetailInformation.tsx
│   │   ├── DetailProduct.tsx
│   │   ├── index.ts
│   ├── feedback
│   │   ├── index.ts
│   │   ├── LiveReview.tsx
│   │   ├── MonthlyReview.tsx
│   │   ├── SimilarReview.tsx
│   ├── home
│   │   ├── BannerCarousel.tsx
│   │   ├── index.ts
│   │   ├── MonthlyFeaturedSection.tsx
│   │   ├── PopularCarousel.tsx
│   │   ├── PopularPackagesSection.tsx
│   │   ├── ProductTitle.tsx
│   │   ├── RecommendedDrinksSection.tsx
│   ├── index.ts
│   ├── layout
│   │   ├── Footer.tsx
│   │   ├── FooterLogo.tsx
│   │   ├── Header.tsx
│   │   ├── index.ts
│   │   ├── RenderInfo.tsx
│   ├── my-page
│   │   ├── index.ts
│   │   ├── TasteFingerprint.tsx
│   │   ├── TasteTypeResult.tsx
│   ├── product
│   ├── providers
│   ├── search
│   │   ├── index.ts
│   │   ├── SearchDetail.tsx
│   │   ├── SearchInput.tsx
│   │   ├── SearchResult.tsx
│   ├── test
│   │   ├── index.ts
│   │   ├── MainStep.tsx
│   │   ├── QuestionStep.tsx
│   │   ├── ResultStep.tsx
│   │   ├── TestClient.tsx
│   │   ├── TestModal.tsx
├── constants
│   ├── carousel
│   │   ├── carousel.ts
│   ├── cart
│   │   ├── complete.ts
│   ├── dropdown
│   │   ├── dropdown.ts
│   ├── footer
│   │   ├── footer.ts
│   ├── gauge-bar
│   │   ├── tasteMeta.ts
│   ├── header
│   │   ├── header.ts
│   ├── home
│   │   ├── sections.ts
│   │   ├── title.ts
│   ├── imageUrls.ts
│   ├── index.ts
│   ├── my-page
│   │   ├── myPage.ts
│   ├── package
│   │   ├── sections.ts
│   │   ├── title.ts
│   ├── portalContainerId.ts
│   ├── routePaths.ts
│   ├── slider
│   │   ├── sliderColors.ts
│   ├── supabase-db
│   │   ├── dbTables.ts
│   ├── test
│   │   ├── localStorage.ts
│   │   ├── share.ts
├── foundations
│   ├── button.ts
│   ├── card.ts
│   ├── input.ts
│   ├── zIndex.ts
├── hooks
│   ├── cart
│   │   ├── useCart.ts
│   ├── detail
│   │   ├── useDetailPage.ts
│   ├── feedback
│   │   ├── useRefreshButton.ts
│   ├── item-row
│   │   ├── useCartItem.ts
│   │   ├── useItemRow.ts
│   │   ├── useOrderItemRow.ts
│   │   ├── useTasteDisplay.ts
│   ├── modal
│   │   ├── useReviewModal.ts
│   ├── my-page
│   │   ├── index.ts
│   │   ├── useEditPage.ts
│   │   ├── useEditPageModals.ts
│   │   ├── useGauge.ts
│   │   ├── useHistory.ts
│   │   ├── useOrder.ts
│   │   ├── usePagination.ts
│   │   ├── useRecommendedModal.ts
│   │   ├── useSelectCartModal.ts
│   │   ├── usetasteReviewModal.ts
│   │   ├── useTasteType.ts
│   ├── product
│   │   ├── usePopularProducts.ts
│   │   ├── useProduct.ts
│   │   ├── useProductDetail.ts
│   │   ├── useRecommendedProducts.ts
│   ├── search
│   │   ├── useSearch.ts
│   ├── test
│   │   ├── index.ts
│   │   ├── useMainStep.ts
│   │   ├── useQuestions.ts
│   │   ├── useQuestionStep.ts
│   │   ├── useTestClient.ts
│   ├── useDropdown.ts
│   ├── useHeader.ts
│   ├── useInfiniteScroll.ts
│   ├── useModal.ts
│   ├── useModalState.ts
│   ├── usePaginations.ts
│   ├── useStarRating.ts
├── mocks
│   ├── cart
│   │   ├── cart.ts
│   ├── detail
│   │   ├── detailMock.ts
│   ├── index.ts
│   ├── itemRow.ts
│   ├── main
│   │   ├── monthly.ts
│   │   ├── recommended.ts
│   ├── modal
│   │   ├── recommended.ts
│   │   ├── recommendedDropdown.ts
│   ├── package
│   │   ├── recommended.ts
│   ├── review
│   │   ├── review.ts
│   ├── test
│   │   ├── questions.ts
│   │   ├── resultProduct.ts
├── providers
│   ├── ReactQueryProvider.tsx
├── service
│   ├── cart
│   │   ├── cart.ts
│   ├── feedback
│   ├── my-page
│   │   ├── feedback.ts
│   │   ├── gauge.ts
│   │   ├── history.mapper.ts
│   │   ├── index.ts
│   │   ├── order.mapper.ts
│   │   ├── order.ts
│   │   ├── orderReview.ts
│   │   ├── tasteType.ts
│   ├── payment
│   ├── product
│   │   ├── product.ts
│   │   ├── productBase.ts
│   │   ├── productDetail.ts
│   │   ├── productList.ts
│   │   ├── productSearch.ts
│   ├── test
│   │   ├── questions.ts
│   │   ├── userResponses.ts
├── stores
│   ├── useLoginStore.ts
├── styles
│   ├── fonts.ts
├── types
│   ├── card
│   │   ├── card.ts
│   ├── carousel
│   │   ├── carousel.ts
│   ├── cart
│   │   ├── cart.ts
│   ├── dropdown.ts
│   ├── gauge-bar
│   │   ├── tasteTypes.ts
│   ├── index.ts
│   ├── item-row
│   │   ├── cart.ts
│   │   ├── common.ts
│   │   ├── index.ts
│   │   ├── order.ts
│   │   ├── tasting.ts
│   ├── main
│   │   ├── mainSection.ts
│   ├── modal
│   │   ├── feedback.ts
│   │   ├── modal.ts
│   ├── product
│   ├── product.ts
│   ├── review.ts
│   ├── slider
│   │   ├── slider.ts
│   ├── starRating.ts
│   ├── supabase
│   │   ├── common.ts
│   │   ├── index.ts
│   │   ├── tables
│   │   │   ├── cart.ts
│   │   │   ├── index.ts
│   │   │   ├── order.ts
│   │   │   ├── product_detail.ts
│   ├── supabase.ts
│   ├── test
│   │   ├── test.ts
│   ├── toss
│   │   ├── toss.ts
├── utils
│   ├── axios.ts
│   ├── cart
│   │   ├── formatOrderName.ts
│   │   ├── formatPayment.ts
│   │   ├── idConverter.ts
│   │   ├── optimisticUpdate.ts
│   │   ├── paymentInfoItems.ts
│   │   ├── priceCalculator.ts
│   │   ├── transformCartData.ts
│   ├── cn.ts
│   ├── date
│   │   ├── formatDate.ts
│   │   ├── toKST.ts
│   ├── getUsername.ts
│   ├── isValidUrl.ts
│   ├── maskingUserId.ts
│   ├── order
│   │   ├── calculateTotalAmount.ts
│   │   ├── createOrderItems.ts
│   │   ├── formatOrderName.ts
│   ├── supabase
│   │   ├── server-client.ts
│   ├── supabase.ts
│   ├── syncPendingResponses.ts
│   ├── validUrl.ts
```

---

## 🔐 인증 시스템

### 1. 로그인 & 성인 인증

- Supabase 기반 인증
- 소셜 로그인
- 성인 인증 로직 처리

---

### 2. 취향 테스트

- 회원 / 비회원 분기 처리
- 테스트 결과 서버 저장 여부 분기
- 결과 공유 (URL 기반)

---

### 3. 마이페이지

- 입맛 프로필 관리
- 취향 테스트 결과 조회
- 후기 기반 평균값 & 맛 지문 요약
- 나만의 패키지 구성
- 주문 / 배송 내역 확인
- 회원 정보 수정

---

### 4. 장바구니 & 결제

- 장바구니 상태 관리 (Zustand)
- Toss Payments 결제 연동
- 주문 상태 관리

---

## 🚀 주요 기능

### 인증 및 사용자 관리

- Supabase 기반 인증
- JWT 세션 관리
- 쿠키 기반 로그인 유지

---

### 취향 테스트 시스템

- 6가지 질문
- 9가지 결과 유형
- 결과 기반 상품 추천

---

### 쇼핑 기능

- 카테고리별 상품 조회
- 장바구니 담기
- 결제 및 주문 처리
- 후기 작성 및 조회

---

## 💡 코드 품질 관리

- **ESLint**: 코드 규칙 및 오류 검사
- **Prettier**: Tailwind 플러그인 포함 자동 포맷팅
- **Turbopack**: 빠른 개발 환경 제공
- **TypeScript**: 엄격한 타입 체크로 안정성 확보
