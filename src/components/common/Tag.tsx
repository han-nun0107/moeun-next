type TagProps = {
  tagName: string
}

const Tag = ({ tagName }: TagProps) => {
  return (
    <div className="flex-center bg-white-100 h-[25px] rounded-sm px-2 py-[5px] text-red-500">
      <p className="text-[11px] font-bold">{tagName}</p>
    </div>
  )
}

export default Tag
