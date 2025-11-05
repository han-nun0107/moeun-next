import { MainSectionProps } from '@/types/main/mainSection'

const ProductTitle = ({ title, desc }: MainSectionProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-black-200 text-text-32 font-semibold">{title}</h1>
      <div>
        {desc.map((item, index) => (
          <p key={item + index} className="text-lg font-medium text-gray-700">
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ProductTitle
