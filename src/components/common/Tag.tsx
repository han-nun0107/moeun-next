const Tag = ({ tagName }: { tagName: string }) => {
  return (
    <div className="flex h-[25px] w-[54px] items-center justify-center rounded-sm bg-[#fff] text-[#f2544b]">
      <p className="text-xs font-bold">{tagName}</p>
    </div>
  )
}

export default Tag
