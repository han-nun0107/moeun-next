import { ROUTE_PATHS } from '@/constants/routePaths'
import MYPAGE from '@/assets/icons/header/mypage.svg'
import LIKE from '@/assets/icons/header/like.svg'
import CART from '@/assets/icons/header/cart.svg'

export const NAV_ITEMS = [
  { label: '패키지', path: ROUTE_PATHS.PACKAGE },
  { label: '테스트', path: ROUTE_PATHS.TEST },
  { label: '제품 검색', path: ROUTE_PATHS.SEARCH },
  { label: '후기', path: ROUTE_PATHS.FEEDBACK },
]

export const USER_ICONS = [
  {
    label: '마이페이지',
    icon: MYPAGE,
    path: ROUTE_PATHS.MYPAGE.INDEX,
  },
  {
    label: '장바구니',
    icon: CART,
    path: ROUTE_PATHS.CART,
  },
  {
    label: '좋아요페이지',
    icon: LIKE,
    path: ROUTE_PATHS.LIKE,
  },
]
