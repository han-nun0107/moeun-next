import LOGO from '@/assets/icons/logo/logo-footer.svg'
import { FOOTER_INFO_GROUPS } from '@/constants'
import { Z_INDEX } from '@/foundations/zIndex'
import { cn } from '@/utils/cn'

import FooterLogo from './FooterLogo'
import RenderInfo from './RenderInfo'

const Footer = () => {
  return (
    <footer className="relative text-sm" style={{ zIndex: Z_INDEX.FOOTER }}>
      <div
        className={cn('text-white-100 h-[255px] w-full bg-gray-900 pb-12.5')}
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 py-12.5 pl-80">
            {FOOTER_INFO_GROUPS.map((infoGroup, idx) => (
              <div key={`${infoGroup}-${idx}`} className="flex">
                <RenderInfo infoArray={infoGroup} />
              </div>
            ))}
          </div>

          <div className="flex-center pr-80">
            <FooterLogo src={LOGO} />
          </div>
        </div>

        <p className="border-white-100/30 text-white-100/50 mx-auto max-w-[calc(100%-640px)] border-t py-4">
          © 2025 모은. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
