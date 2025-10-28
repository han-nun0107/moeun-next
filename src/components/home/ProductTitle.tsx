import { MainSectionProps } from '@/types/main/mainSection'

const ProductTitle = ({ title, desc }: MainSectionProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-[32px] font-semibold text-[#333]">{title}</h1>
      <div>
        {desc.map((item, index) => (
          <p key={item + index} className="text-lg font-medium text-[#666]">
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ProductTitle
