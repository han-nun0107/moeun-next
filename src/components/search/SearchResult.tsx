import Link from 'next/link'

import { Card, Pagination } from '@/components'
import { useSearch } from '@/hooks/search/useSearch'

const SearchResult = () => {
  const { currentPage, totalPages, currentItems, handlePageChange } =
    useSearch()

  return (
    <article className="mb-25">
      <h3 className="border-black-200 border-b-2 pb-5 text-2xl font-bold">
        검색 결과
      </h3>
      <div className="grid grid-cols-4 gap-7 pt-5">
        {currentItems.map((item, idx) => (
          <Link key={`${item.title}-${idx}`} href={`/item/${idx + 1}`}>
            <Card
              type="product"
              data={{
                img: item.img,
                alt: item.alt,
                title: item.title,
                subtitle: item.subtitle,
                price: item.price,
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
