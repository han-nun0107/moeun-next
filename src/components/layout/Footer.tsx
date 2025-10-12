import { FOOTER_INFO_GROUPS } from '@/constants/footer/footer'
import { IMAGE_URLS } from '@/constants/imageUrls'
import { cn } from '@/utils/cn'

import FooterLogo from './FooterLogo'
import RenderInfo from './RenderInfo'

const Footer = () => {
  return (
    <footer className="fixed right-0 bottom-0 left-0 text-sm">
      <div className={cn('h-[255px] w-full bg-[#2e2f2f] pb-12.5 text-white')}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 py-12.5 pl-80">
            {FOOTER_INFO_GROUPS.map((infoGroup, idx) => (
              <div key={`${infoGroup}-${idx}`} className="flex">
                <RenderInfo infoArray={infoGroup} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center pr-80">
            <FooterLogo src={IMAGE_URLS.Footer.Logo} />
          </div>
        </div>

        <p className="mx-auto max-w-[calc(100%-640px)] border-t border-[#fff]/30 py-4 text-[#fff]/50">
          © 2025 모은. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
