'use client'

import dynamic from 'next/dynamic'

import { SearchInput } from '@/components/search'

const SearchDetail = dynamic(() => import('@/components/search/SearchDetail'))
const SearchResult = dynamic(() => import('@/components/search/SearchResult'))

const Search = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start pt-25">
      <SearchInput />
      <div className="flex-center mt-25 flex-col gap-25">
        <SearchDetail />
        <SearchResult />
      </div>
    </section>
  )
}

export default Search
