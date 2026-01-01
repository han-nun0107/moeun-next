import type { ItemRow } from '@/types/item-row'
import { formatDateTime } from '@/utils/date/formatDate'

import CartItemRow from './list-component/CartItemRow'
import OrderItemRow from './list-component/OrderItemRow'
import TastingItemRow from './list-component/TastingItemRow'

const ItemRowList = (props: ItemRow) => {
  switch (props.type) {
    case 'cart':
      return (
        <CartItemRow
          id={props.id}
          detailId={props.product?.id}
          img={props.image_url || props.product?.main_image || ''}
          name={props.product?.name || ''}
          quantity={props.quantity || 0}
          price={props.subtotal || '0'}
          pickupName={props.pickup_store?.name || ''}
          pickupAddress={props.pickup_store?.address || ''}
          pickupContact={props.pickup_store?.contact || ''}
          onQuantityChange={props.onQuantityChange}
          onDelete={props.onDelete}
          checked={props.checked}
          onCheckChange={props.onCheckChange}
        />
      )

    case 'order':
      return (
        <OrderItemRow
          id={props.id}
          key={props.id}
          order={props.created_at}
          img={props.product?.main_image_url || ''}
          name={props.product?.name || ''}
          quantity={props.quantity || 0}
          price={props.price || '0'}
          reviewed={props.reviewed}
          feedback_id={props?.feedback_id || null}
          product={props.product}
          user="임시"
        />
      )

    case 'tasting': {
      return (
        <TastingItemRow
          img={props.image_url || ''}
          name={props.product_name || ''}
          order={formatDateTime(props.created_at)}
          feedback={props.comment || ''}
          sweetness={props.sweetness}
          acidity={props.acidity}
          body={props.body}
          carbonation={props.carbonation}
          aroma={props.aroma}
          bitterness={props.bitterness}
          confidence={props.confidence}
        />
      )
    }
    default:
      return null
  }
}

export default ItemRowList
