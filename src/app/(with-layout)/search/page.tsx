'use client'

import { SearchDetail, SearchInput, SearchResult } from '@/components/search'

const Search = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start pt-25">
      <SearchInput />
      <div className="mt-25 flex flex-col items-center justify-center gap-25">
        <SearchDetail />
        <SearchResult />
      </div>
    </section>
  )
}

export default Search
