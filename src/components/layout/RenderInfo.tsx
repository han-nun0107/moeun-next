type RenderInfoProps = {
  infoArray: { label: string; value: string }[]
}

const RenderInfo = ({ infoArray }: RenderInfoProps) => {
  return (
    <div className="flex">
      {infoArray.map((info, idx) => (
        <div key={`${info.value}-${idx}`} className="flex flex-row">
          {idx > 0 && <span className="mx-2">|</span>}
          <p>
            {info.label} {info.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default RenderInfo
