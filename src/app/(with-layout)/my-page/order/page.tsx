import { ItemRowContent } from '@/components'
import { mockOrderData } from '@/mocks/itemRow'

const Order = () => {
  return (
    <section className="h-screen">
      <article>
        <ItemRowContent items={mockOrderData} type="order" />
      </article>
    </section>
  )
}

export default Order
