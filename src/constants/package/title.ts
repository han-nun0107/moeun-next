type PackageTitleItem = {
  title: string
  desc: string[]
}

export const getPackageTitle = (username?: string): PackageTitleItem[] => {
  const defaultUsername = username || '당신'

  return [
    {
      title: '추천 패키지',
      desc: [`오직 ${defaultUsername}만의 취향을 반영한 패키지`],
    },
    {
      title: '주류 대상 수상 5종 패키지',
      desc: ['주류 대상 수상 5종 패키지'],
    },
    {
      title: '막걸리 패키지',
      desc: ['막걸리 러버들을 위한 전용 패키지'],
    },
  ]
}

export const PACKAGE_TITLE = getPackageTitle()
