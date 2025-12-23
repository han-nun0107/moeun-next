import { useEffect, useRef } from 'react'

type UseInfiniteScrollProps = {
  enabled: boolean
  onLoadMore: () => void
  isLoading?: boolean
}

export const useInfiniteScroll = ({
  enabled,
  onLoadMore,
  isLoading = false,
}: UseInfiniteScrollProps) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabled && !isLoading) {
          onLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
      observer.disconnect()
    }
  }, [enabled, onLoadMore, isLoading])

  return observerTarget
}
