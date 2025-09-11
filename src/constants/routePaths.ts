export const ROUTE_PATHS = {
  HOME: '/',
  PACKAGE: '/package',
  TEST: '/test',
  SEARCH: '/search',
  FEEDBACK: '/feedback',
  CART: '/cart',
  LIKE: '/like-page',
  ITEM_DETAIL: (id: string) => `/item/${id}`,

  LOGIN: '/login',

  MYPAGE: {
    INDEX: '/my-page',
    TASTE_PROFILE: '/my-page/taste-profile',
    ACCOUNT_EDIT: '/my-page/account-edit',
    ORDER_HISTORY: '/my-page/order-history',
    TASTING_HISTORY: '/my-page/tasting-history',
  },

  NOT_FOUND: '*',
} as const
