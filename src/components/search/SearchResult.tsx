import Link from 'next/link'

import { Card, Pagination } from '@/components'
import { useSearch } from '@/hooks/search/useSearch'

const SearchResult = () => {
  const {
    currentPage,
    totalPages,
    currentItems,
    handlePageChange,
    isLoading,
    isError,
  } = useSearch()

  return (
    <article className="mb-25">
      <h3 className="border-black-200 border-b-2 pb-5 text-2xl font-bold">
        검색 결과
      </h3>
      {isLoading && <p className="pt-5 text-gray-700">검색 중입니다...</p>}
      {isError && (
        <p className="pt-5 text-red-500">검색 결과를 불러오지 못했습니다.</p>
      )}
      {!isLoading && !isError && currentItems.length === 0 && (
        <p className="pt-5 text-gray-700">검색 결과가 없습니다.</p>
      )}
      <div className="grid grid-cols-4 gap-7 pt-5">
        {currentItems.map((item, idx) => (
          <Link
            key={`${item.name}-${item.id}-${idx}`}
            href={`/item/${item.id}`}
          >
            <Card
              type="product"
              data={{
                img: item.main_image_url || '',
                alt: item.name,
                title: item.name,
                subtitle: item.brewery_name || item.description || '',
                price: item.final_price || item.price,
              }}
            />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-10"
        />
      )}
    </article>
  )
}

export default SearchResult
