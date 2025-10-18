import { IMAGE_URLS } from '@/constants'

export const CAROUSEL = {
  Main: {
    text: {
      title: '너무 많은 전통주, 어떤 것이 내 취향일지 모르겠다구요?',
      content: '당신의 전통주 한 잔,',
      content2: '한 잔 취향만의 입맛 테스트를 통해',
      content3: '당신의 맛을 찾아보세요!',
    },
    image: {
      img: IMAGE_URLS.Banner.Main,
      alt: 'MainBanner',
      height: 650,
    },
    variant: 'TEST',
  } as const,
  Package: {
    text: {
      title: '2025년 주류대상 선정',
      content: '한 잔 취향의 특별한 인천 패키지',
    },
    image: {
      img: IMAGE_URLS.Banner.Package,
      alt: 'PackageBanner',
      height: 500,
    },
    variant: 'BUY',
  } as const,
}
