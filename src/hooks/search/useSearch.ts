import { useQuery } from '@tanstack/react-query'
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  searchProducts,
  type SearchProductsResult,
} from '@/service/product/product'
import type { ProductDetail } from '@/types/product'
import type { SliderVariantType } from '@/types/slider/slider'

const DEFAULT_VALUE = 0
const ITEMS_PER_PAGE = 8

type SliderState = Record<SliderVariantType, number>

type CheckboxFilter = 'gift' | 'regional' | 'award' | 'limited'

type SearchFilters = {
  checkboxes: Record<CheckboxFilter, boolean>
  sliders: SliderState
}

const INITIAL_SLIDER_STATE: SliderState = {
  sweetness: DEFAULT_VALUE,
  body: DEFAULT_VALUE,
  acidity: DEFAULT_VALUE,
  carbonation: DEFAULT_VALUE,
  bitter: DEFAULT_VALUE,
  aroma: DEFAULT_VALUE,
}

const INITIAL_CHECKBOX_STATE: SearchFilters['checkboxes'] = {
  gift: false,
  regional: false,
  award: false,
  limited: false,
}

const CHECKBOX_ID_MAP: Record<string, CheckboxFilter> = {
  'search-checkbox-1': 'gift',
  'search-checkbox-2': 'regional',
  'search-checkbox-3': 'award',
  'search-checkbox-4': 'limited',
}

type SearchContextValue = {
  query: string
  handleChangeQuery: (value: string) => void
  handleSearch: () => void
  sliderState: SliderState
  handleSliderChange: (key: SliderVariantType) => (value: number[]) => void
  checkboxFilters: SearchFilters['checkboxes']
  handleToggleCheckbox: (id: string) => void
  currentPage: number
  totalPages: number
  currentItems: ProductDetail[]
  handlePageChange: (page: number) => void
  isLoading: boolean
  isError: boolean
}

const SearchContext = createContext<SearchContextValue | null>(null)

const useSearchProvider = (): SearchContextValue => {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sliderState, setSliderState] =
    useState<SliderState>(INITIAL_SLIDER_STATE)
  const [checkboxFilters, setCheckboxFilters] = useState<
    SearchFilters['checkboxes']
  >(INITIAL_CHECKBOX_STATE)

  const [appliedQuery, setAppliedQuery] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({
    checkboxes: INITIAL_CHECKBOX_STATE,
    sliders: INITIAL_SLIDER_STATE,
  })

  const handleChangeQuery = (value: string) => {
    setQuery(value)
  }

  const handleSearch = () => {
    setAppliedQuery(query)
    setAppliedFilters({
      checkboxes: checkboxFilters,
      sliders: sliderState,
    })
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSliderChange = (key: SliderVariantType) => (value: number[]) => {
    setSliderState((prev) => ({
      ...prev,
      [key]: value[0],
    }))
  }

  const handleToggleCheckbox = (id: string) => {
    const key = CHECKBOX_ID_MAP[id]
    if (!key) return

    setCheckboxFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const { data, isLoading, isError } = useQuery<SearchProductsResult>({
    queryKey: ['search-products', appliedQuery, appliedFilters, currentPage],
    queryFn: () =>
      searchProducts({
        query: appliedQuery,
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
        checkboxes: appliedFilters.checkboxes,
        sliders: appliedFilters.sliders,
      }),
    placeholderData: (previousData) => previousData,
  })

  const hasError = isError || Boolean(data?.error)

  const totalPages = useMemo(() => {
    if (!data) return 1
    return Math.max(1, Math.ceil((data.total || 0) / ITEMS_PER_PAGE))
  }, [data])

  const currentItems = hasError ? [] : (data?.data ?? [])

  return {
    query,
    handleChangeQuery,
    handleSearch,
    sliderState,
    handleSliderChange,
    checkboxFilters,
    handleToggleCheckbox,
    currentPage,
    totalPages,
    currentItems,
    handlePageChange,
    isLoading,
    isError: hasError,
  }
}

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const value = useSearchProvider()
  return React.createElement(SearchContext.Provider, { value }, children)
}

export const useSearch = () => {
  const ctx = useContext(SearchContext)
  if (!ctx) {
    throw new Error('useSearch는 SearchProvider 내부에서만 사용할 수 있습니다.')
  }
  return ctx
}
