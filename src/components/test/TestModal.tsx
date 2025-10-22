import { SHARE_DATA } from '@/constants/test/share'

const TestModal = () => {
  return (
    <div className="mt-[51px] flex space-x-[46px]">
      {SHARE_DATA.map((option, index) => (
        <div
          className="flex flex-col items-center"
          key={`${option.label} - ${index}`}
        >
          <img
            src={option.img.src}
            alt={option.alt}
            className="mb-3 h-[90px] w-[90px] cursor-pointer"
          />
          <p className="cursor-pointer"> {option.label}</p>
        </div>
      ))}
    </div>
  )
}

export default TestModal
