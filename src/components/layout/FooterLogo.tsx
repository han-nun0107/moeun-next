'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface FooterLogoProps {
  src: string
}

const FooterLogo = ({ src }: FooterLogoProps) => {
  const router = useRouter()

  return (
    <Image
      src={src}
      alt="footer-logo"
      width={100}
      height={100}
      className="cursor-pointer"
      onClick={() => router.push('/')}
    />
  )
}

export default FooterLogo
