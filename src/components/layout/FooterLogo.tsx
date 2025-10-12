'use client'

import Image from 'next/image'
import Link from 'next/link'

interface FooterLogoProps {
  src: string
}

const FooterLogo = ({ src }: FooterLogoProps) => {
  return (
    <Link href="/">
      <Image
        src={src}
        alt="footer-logo"
        width={100}
        height={100}
        className="cursor-pointer"
      />
    </Link>
  )
}

export default FooterLogo
