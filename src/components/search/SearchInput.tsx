import { Input } from '@/components'

const SearchInput = () => {
  return (
    <>
      <h1 className="text-black-200 mb-[50px] text-[40px] font-bold">
        제품 검색
      </h1>
      <Input placeholder="검색어를 입력하세요" inputType="search" />
    </>
  )
}

export default SearchInput
