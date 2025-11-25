'use client'

import Image from 'next/image'
import Link from 'next/link'

import GoogleIcon from '@/assets/icons/login/google-icon.svg'
import KaKaoIcon from '@/assets/icons/login/kakao-icon.svg'
import NaverIcon from '@/assets/icons/login/naver-icon.svg'
import LogoRight from '@/assets/icons/logo/logo-black.svg'
import LogoLeft from '@/assets/icons/logo/logo-white.svg'
import { Button } from '@/components'
import { IMAGE_URLS } from '@/constants/imageUrls'
import { supabase } from '@/utils/supabase'

type SocialLogin = {
  provider: string
  icon: string
  label: string
  className: string
}

const SOCIAL_LOGINS: SocialLogin[] = [
  {
    provider: 'kakao',
    icon: KaKaoIcon,
    label: '카카오 로그인',
    className: 'bg-[var(--kakao-primary)] text-[var(--kakao-text)]',
  },
  {
    provider: 'naver',
    icon: NaverIcon,
    label: '네이버 로그인',
    className: 'bg-[var(--naver-primary)] text-[var(--naver-text)]',
  },
  {
    provider: 'google',
    icon: GoogleIcon,
    label: '구글 로그인',
    className: 'border border-[var(--google-primary)] bg-white',
  },
]

const Login = () => {
  const handleLogin = async (provider: string) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('로그인 실패:', error)
    }
  }
  return (
    <div className="flex h-screen p-5">
      <div
        className="relative hidden h-full w-full rounded-[20px] bg-cover bg-center bg-no-repeat xl:block xl:w-[55%]"
        style={{ backgroundImage: `url(${IMAGE_URLS.Login.Background})` }}
      >
        <Link
          href="/"
          aria-label="홈으로 이동"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src={LogoLeft}
            alt="모은 한잔 취향 로고"
            width={250}
            height={120}
          />
        </Link>
      </div>
      <main className="flex-center w-full xl:w-[45%]">
        <div className="flex w-full flex-col">
          <header className="flex flex-col items-center gap-5">
            <Link href="/" aria-label="홈으로 이동">
              <Image
                src={LogoRight}
                alt="모은 한잔 취향 로고"
                width={118}
                height={60}
              />
            </Link>
            <h1 className="text-black-200 text-text-22 mb-20">
              로그인하고 나만의 전통주를 즐겨보세요!
            </h1>
          </header>
          <section className="mx-auto flex w-full max-w-[440px] flex-col gap-5">
            {SOCIAL_LOGINS.map((socialLogin) => (
              <Button
                key={socialLogin.provider}
                variant="SOCIAL"
                className={socialLogin.className}
                onClick={() => handleLogin(socialLogin.provider)}
              >
                <Image
                  src={socialLogin.icon}
                  alt={socialLogin.label}
                  width={40}
                  height={40}
                />
                <span className="w-full text-center">{socialLogin.label}</span>
              </Button>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login
