import { Input } from '@/components'
import { useSearch } from '@/hooks/search/useSearch'

const SearchInput = () => {
  const { query, handleChangeQuery, handleSearch } = useSearch()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <>
      <h1 className="text-black-200 text-bold-text-40 mb-[50px]">제품 검색</h1>
      <Input
        placeholder="검색어를 입력하세요"
        inputType="search"
        value={query}
        onChange={(e) => handleChangeQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}

export default SearchInput
