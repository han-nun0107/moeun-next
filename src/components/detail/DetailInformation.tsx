import { dropdownOptions } from '@/constants'
import type { ProductDetail } from '@/types/product'

const DetailInformation = ({ data }: { data: ProductDetail }) => {
  const infoRows =
    data.product_type === 'package'
      ? dropdownOptions.PACKAGE_INFO_ROWS(data)
      : dropdownOptions.DRINK_INFO_ROWS(data)

  return (
    <div>
      {/* 탭 메뉴 */}
      <div className="border-b">
        <div className="flex w-full">
          <button className="text-bold-lg w-[33%] cursor-pointer border-b-2 border-black px-6 py-3 text-black">
            상품상세정보
          </button>
          <button className="text-bold-lg w-[33%] cursor-pointer px-6 py-3 text-gray-700">
            배송/교환/반품 안내
          </button>
          <button className="w-[33%] px-6 py-3 text-lg text-gray-700">
            상품후기
          </button>
        </div>
      </div>

      {/* 상품 정보 테이블 */}
      <div className="mt-[50px]">
        <table className="w-full border-collapse border-t border-b border-gray-300">
          <tbody>
            {infoRows.map((row, idx) => (
              <tr key={idx} className="h-20 border-b border-gray-300">
                <td className="text-bold-lg w-95 bg-gray-50 px-4 py-3 text-center">
                  {row.label}
                </td>
                <td className="pl-15 text-lg text-gray-700">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 상세 이미지 */}
      <div className="mt-[50px]">
        <div className="w-full">
          <img
            src={data?.description_image_url}
            alt="막걸리 브랜드"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default DetailInformation
