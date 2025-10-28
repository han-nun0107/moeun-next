import { Button, Input, Slider } from '@/components'
import { SEARCH_CHECKBOX, SLIDER_OPTIONS } from '@/constants'
import { useSearch } from '@/hooks/search/useSearch'

const SearchDetail = () => {
  const { handleSliderChange, sliderState } = useSearch()

  return (
    <article className="flex max-h-[322px] w-320 flex-col items-center justify-between">
      <div className="flex w-full justify-between">
        <h3 className="text-2xl font-bold text-[#333]">상세 검색</h3>
        <Button variant="FILTER_BUTTON">필터 적용하기</Button>
      </div>
      <div className="mt-4 grid h-[266px] w-full grid-cols-[.7fr_3fr] items-center justify-center bg-[#f2f2f2]">
        <div className="ml-[50px] flex w-[200px] flex-col items-start justify-center gap-5 overflow-auto py-4">
          {SEARCH_CHECKBOX.map((item) => (
            <Input
              key={item.id}
              id={item.id}
              inputType="checkbox"
              label={item.label}
              className="h-[30px] w-[30px]"
              labelClassName="text-lg text-[#333] ml-3"
            />
          ))}
        </div>
        <div className="grid h-[181px] grid-cols-2">
          {SLIDER_OPTIONS.map(({ key, label }) => (
            <Slider
              key={key}
              variant={key}
              label={label}
              value={[sliderState[key]]}
              onValueChange={handleSliderChange(key)}
            />
          ))}
        </div>
      </div>
    </article>
  )
}

export default SearchDetail
