'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { NAV_ITEMS, USER_ICONS } from '@/constants/header/header'
import { IMAGE_URLS } from '@/constants/imageUrls'
import { ROUTE_PATHS } from '@/constants/routePaths'
import { Z_INDEX } from '@/foundations/zIndex'
import { useHeader } from '@/hooks/useHeader'

const Header = () => {
  const router = useRouter()

  const { isLoggedIn, onLogin, onLogout } = useHeader()

  return (
    <header
      className="fixed top-0 left-0 flex h-[90px] w-full items-center justify-around border-b border-[#d9d9d9] bg-white"
      style={{ zIndex: Z_INDEX.HEADER }}
    >
      <div className="flex w-full items-center justify-between px-8">
        {/* 로고 */}
        <Link href={ROUTE_PATHS.HOME} aria-label="홈으로 이동">
          <Image
            src={IMAGE_URLS.LOGO}
            alt="모은 한잔취향 로고"
            width={100}
            height={50}
          />
        </Link>

        {/* 메뉴 */}
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

          {/* 로그인 / 유저 아이콘 (로그인 전)*/}
          <div className="flex items-center">
            {!isLoggedIn ? (
              /* TODO: 버튼 공통 컴포넌트로 변경 */
              <button
                type="button"
                onClick={onLogin}
                className="h-13 w-41 cursor-pointer rounded-[60px] bg-[#f2544b] text-center leading-[52px] font-semibold text-white hover:bg-[#e04439]"
              >
                로그인/회원가입
              </button>
            ) : (
              <>
                {/* 마이페이지, 장바구니 (로그인 이후) */}
                <div className="flex items-center gap-8">
                  {USER_ICONS.map((icon) => (
                    <button
                      key={icon.label}
                      onClick={() => router.push(icon.path)}
                      aria-label={icon.label}
                      className="cursor-pointer"
                    >
                      <Image
                        src={icon.icon}
                        alt={icon.label}
                        width={20}
                        height={20}
                      />
                    </button>
                  ))}
                  {/* TODO: 버튼 공통 컴포넌트로 변경 */}
                  <button
                    type="button"
                    className="h-13 w-30 cursor-pointer rounded-4xl border border-[#d9d9d9] font-semibold text-[#666666]"
                    onClick={onLogout}
                  >
                    로그아웃
                  </button>
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
