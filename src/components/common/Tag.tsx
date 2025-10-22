const Tag = ({ tagName }: { tagName: string }) => {
  return (
    <div className="flex h-[25px] items-center justify-center rounded-sm bg-[#fff] px-2 py-[5px] text-[#f2544b]">
      <p className="text-[11px] font-bold">{tagName}</p>
    </div>
  )
}

export default Tag
