type ItemRowLabelType = {
  type?: 'cart' | 'order' | 'tasting'
  children?: React.ReactNode
  className?: string
}

const ItemRowLabel = ({ type, children, className }: ItemRowLabelType) => {
  return (
    <div className={`w-320 ${className}`}>
      <div className="text-black-200 mb-3 border-b-2 pb-5 text-2xl font-bold">
        {type === 'cart' && <h1>장바구니 상품</h1>}
        {type === 'order' && <h1>주문내역</h1>}
        {type === 'tasting' && <h1>나의 시음 히스토리</h1>}
      </div>

      {type === 'cart' && (
        <div className="text-black-200 flex border-b pb-2 text-center">
          <div className="w-[40%] min-w-[250px] pl-47 text-left">
            상품/옵션 정보
          </div>
          <div className="mx-auto w-20">수량</div>
          <div className="w-[15%] min-w-[80px]">가격</div>
          <div className="w-[25%] min-w-[150px]">수령 장소</div>
        </div>
      )}
      {type === 'order' && (
        <div className="text-black-200 flex border-b pb-2 text-center">
          <div className="w-[15%] min-w-[80px]">주문일자</div>
          <div className="w-[40%] pl-60 text-left">상품/옵션 정보</div>
          <div className="mx-auto w-20">수량</div>
          <div className="w-[15%] min-w-[80px]">가격</div>
          <div className="w-[20%] min-w-[100px]">사용 후기</div>
        </div>
      )}
      {type === 'tasting' && (
        <div className="text-black-200 flex border-b pb-2 text-center">
          <div className="w-[40%] pl-25 text-left">상품/옵션 정보</div>
          <div className="w-[20%] pr-28">주문일자</div>
          <div className="w-[40%] min-w-[200px]">시음 후기 내용</div>
        </div>
      )}

      <div>{children}</div>
    </div>
  )
}

export default ItemRowLabel
