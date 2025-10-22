import FacebookIcon from '@/assets/icons/test/facebook-icon.svg'
import KakaoIcon from '@/assets/icons/test/kakao-icon.svg'
import LinkIcon from '@/assets/icons/test/link-icon.svg'

type ShareType = {
  img: typeof KakaoIcon | typeof FacebookIcon | typeof LinkIcon
  alt: string
  label: string
}

export const SHARE_DATA: ShareType[] = [
  {
    img: KakaoIcon,
    alt: '카카오톡 공유',
    label: '카카오톡 공유',
  },
  {
    img: FacebookIcon,
    alt: '페이스북 공유',
    label: '페이스북 공유',
  },
  {
    img: LinkIcon,
    alt: '링크 복사',
    label: '링크 복사',
  },
]
