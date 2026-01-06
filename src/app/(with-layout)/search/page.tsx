'use client'

import dynamic from 'next/dynamic'

import { SearchInput } from '@/components/search'
import { SearchProvider } from '@/hooks/search/useSearch'

const SearchDetail = dynamic(() => import('@/components/search/SearchDetail'))
const SearchResult = dynamic(() => import('@/components/search/SearchResult'))

const Search = () => {
  return (
    <SearchProvider>
      <section className="flex min-h-screen w-full flex-col items-center justify-start pt-25">
        <SearchInput />
        <div className="flex-center mt-25 flex-col gap-25">
          <SearchDetail />
          <SearchResult />
        </div>
      </section>
    </SearchProvider>
  )
}

export default Search
