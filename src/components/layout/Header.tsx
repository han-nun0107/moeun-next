'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { NAV_ITEMS, USER_ICONS } from '@/constants/header/header'
import { ROUTE_PATHS } from '@/constants/routePaths'
import { Z_INDEX } from '@/foundations/zIndex'
import { useHeader } from '@/hooks/useHeader'
import Button from '@/components/common/Button'
import LOGO from '@/assets/icons/logo/logo.svg'

const Header = () => {
  const router = useRouter()

  const { isLoggedIn, onLogin, onLogout } = useHeader()

  return (
    <header
      className="fixed top-0 left-0 flex h-[90px] w-full items-center justify-around border-b border-[#d9d9d9] bg-white"
      style={{ zIndex: Z_INDEX.HEADER }}
    >
      <div className="flex w-full items-center justify-between px-80">
        <Link href={ROUTE_PATHS.HOME} aria-label="홈으로 이동">
          <Image src={LOGO} alt="모은 한잔취향 로고" width={100} height={50} />
        </Link>

        <div className="flex items-center gap-15">
          <nav>
            <ul className="flex gap-15">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-lg font-semibold text-[#333]"
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </nav>

          <div className="flex items-center">
            {!isLoggedIn ? (
              <Button onClick={onLogin} variant="CONTAINED">
                로그인/회원가입
              </Button>
            ) : (
              <>
                <div className="flex items-center gap-8">
                  {USER_ICONS.map((icon) => (
                    <Button
                      key={icon.path}
                      onClick={() => router.push(icon.path)}
                      aria-label={icon.label}
                      variant="ICON"
                    >
                      <Image
                        src={icon.icon}
                        alt={icon.label}
                        width={20}
                        height={20}
                      />
                    </Button>
                  ))}
                  <Button onClick={onLogout} variant="OUTLINE">
                    로그아웃
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
