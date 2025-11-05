'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Z_INDEX } from '@/foundations/zIndex'

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const menuItems = [
    { to: '/my-page', label: '나의 입맛 프로필' },
    { to: '/my-page/order', label: '주문/배송 내역' },
    { to: '/my-page/history', label: '나의 시음 히스토리' },
    { to: '/my-page/edit', label: '회원정보 수정' },
  ]

  return (
    <>
      <nav
        className="fixed top-[90px] left-0 h-[calc(100vh-90px)] w-[260px] bg-gray-50 px-[52px] pt-[62px]"
        style={{ zIndex: Z_INDEX.SIDEBAR }}
      >
        <h2 className="text-black-200 mb-8 text-3xl font-bold">마이페이지</h2>
        <ul className="text-18px flex flex-col gap-4 text-gray-700">
          {menuItems.map(({ to, label }) => {
            const isActive = pathname === to

            return (
              <li key={to}>
                <Link
                  href={to}
                  className={
                    isActive
                      ? 'border-b-2 border-black font-bold'
                      : 'font-medium'
                  }
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <main className="mt-25 ml-[320px] flex-1">{children}</main>
    </>
  )
}

export default MyPageLayout
