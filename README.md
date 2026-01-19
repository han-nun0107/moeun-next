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
src
├── app                     # Next.js App Router
│   ├── (with-layout)        # 공통 레이아웃 적용 영역
│   │   ├── cart             # 장바구니 / 주문 완료
│   │   ├── feedback         # 후기 페이지
│   │   ├── item/[id]        # 상품 상세 페이지
│   │   ├── like-page        # 찜(좋아요) 페이지
│   │   ├── my-page          # 마이페이지
│   │   │   ├── edit         # 회원 정보 수정
│   │   │   ├── history      # 주문 / 시음 히스토리
│   │   │   ├── order        # 주문 내역
│   │   ├── package          # 패키지 상품
│   │   ├── search           # 검색 페이지
│   │   ├── test             # 취향 테스트
│   │   ├── layout.tsx       # 서브 레이아웃
│   │   └── page.tsx         # 메인 페이지
│   ├── api                  # Next.js Route Handler
│   │   ├── payment          # 결제 관련 API
│   │   └── payments/order   # 주문 처리 API
│   ├── auth/callback        # 소셜 로그인 콜백
│   ├── login                # 로그인 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   └── globals.css          # 전역 스타일
│
├── api                     # 외부 API / 서버 통신 모듈
│   ├── payment
│   └── product
│
├── components              # 공통 UI 컴포넌트
│   ├── common               # Button, Modal, Card 등 재사용 컴포넌트
│   ├── layout               # Header / Footer
│   ├── home                 # 메인 페이지 전용 컴포넌트
│   ├── detail               # 상품 상세
│   ├── cart                 # 장바구니
│   ├── search               # 검색
│   ├── test                 # 취향 테스트
│   └── my-page              # 마이페이지
│
├── hooks                   # 커스텀 훅
│   ├── cart
│   ├── product
│   ├── search
│   ├── test
│   ├── my-page
│   └── modal
│
├── service                 # 비즈니스 로직 / API 가공
│   ├── product
│   ├── cart
│   ├── order
│   ├── payment
│   ├── test
│   └── my-page
│
├── stores                  # Zustand 전역 상태
│   └── useLoginStore.ts
│
├── constants               # 상수 정의 (route, UI, section)
├── types                   # TypeScript 타입 정의
├── utils                   # 공통 유틸 함수
├── providers               # React Query Provider 등
├── foundations             # UI 기본 설계 (button, zIndex 등)
├── assets                  # 아이콘 / 이미지 리소스
├── styles                  # 폰트, 스타일 설정
└── mocks                   # MSW 테스트용 Mock 데이터
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
