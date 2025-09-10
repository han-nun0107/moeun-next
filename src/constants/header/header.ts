import { IMAGE_URLS } from '@/constants/imageUrls'
import { ROUTE_PATHS } from '@/constants/routePaths'

export const NAV_ITEMS = [
  { label: '패키지', path: ROUTE_PATHS.PACKAGE },
  { label: '테스트', path: ROUTE_PATHS.TEST },
  { label: '제품 검색', path: ROUTE_PATHS.SEARCH },
  { label: '후기', path: ROUTE_PATHS.FEEDBACK },
]

export const USER_ICONS = [
  {
    label: '마이페이지',
    icon: IMAGE_URLS.MY_PAGE,
    path: ROUTE_PATHS.MYPAGE.INDEX,
  },
  {
    label: '장바구니',
    icon: IMAGE_URLS.CART,
    path: ROUTE_PATHS.CART,
  },
]
