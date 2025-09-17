import TestImage from '@/assets/test.png'

import CardImage from './CardImage'

const DetailCard = () => {
  return (
    <div>
      <CardImage
        src={TestImage}
        alt="짱구"
        width={560}
        height={560}
        Heart={true}
        className="bg-[#f5f5f5]"
      />
    </div>
  )
}

export default DetailCard
