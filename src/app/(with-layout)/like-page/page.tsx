import { Card } from '@/components'
import RECOMMENDED from '@/mocks/main/recommended'

const LikePage = () => {
  return (
    <section className="mx-auto my-25 w-full max-w-320">
      <article className="flex h-full flex-col gap-16">
        <h1 className="border-b-2 border-[#000] pb-5 text-2xl font-bold text-[#333]">
          찜한 상품
        </h1>
        <div className="mx-auto grid grid-cols-4 gap-7">
          {RECOMMENDED.map((item, index) => (
            <Card key={index} type="product" data={item} />
          ))}
        </div>
      </article>
    </section>
  )
}

export default LikePage
