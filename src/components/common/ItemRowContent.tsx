'use client'

import ItemRowLabel from '@/components/common/item-row/ItemRowLabel'
import ItemRowList from '@/components/common/item-row/ItemRowList'
import useItemRow from '@/hooks/item-row/useItemRow'
import type { ItemRowType } from '@/types/item-row'

type ItemRowProps = {
  items: ItemRowType[]
  type: 'cart' | 'order' | 'tasting'
  onQuantityChange?: () => void
  checkedItems?: (number | string)[]
  onCheckChange?: (itemId: number | string, isChecked: boolean) => void
}

const ItemRowContent = ({
  items,
  type,
  onQuantityChange,
  checkedItems,
  onCheckChange,
}: ItemRowProps) => {
  const { itemList, handleQuantityChange } = useItemRow(items || [])

  if (items.length === 0) {
    switch (type) {
      case 'cart':
        return <div>장바구니가 비어있습니다.</div>
      case 'order':
        return <div>주문 내역이 없습니다.</div>
      case 'tasting':
        return <div>나의 시음 히스토리가 없습니다.</div>
      default:
        return <div>일치하는 타입이 없습니다.</div>
    }
  }

  return (
    <ItemRowLabel type={type}>
      {itemList.map((item, idx) => (
        <ItemRowList
          key={`${item.id ?? idx}`}
          {...item}
          type={type}
          checked={item.id != null && checkedItems?.includes(item.id)}
          onCheckChange={(isChecked) => {
            if (item.id != null) {
              onCheckChange?.(item.id, isChecked)
            }
          }}
          onQuantityChange={async (newQuantity: number) => {
            await handleQuantityChange(idx, newQuantity)
            onQuantityChange?.()
          }}
        />
      ))}
    </ItemRowLabel>
  )
}

export default ItemRowContent
