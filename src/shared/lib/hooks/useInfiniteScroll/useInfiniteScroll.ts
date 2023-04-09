import { MutableRefObject, useEffect } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
  const {
    callback,
    triggerRef,
    wrapperRef,
  } = options

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current
    let observer: IntersectionObserver | null = null

    if (callback) {
      const observerOptions: IntersectionObserverInit = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      }

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, observerOptions)

      observer.observe(triggerElement)

      return () => {
        if (observer && triggerElement) {
          // eslint-disable-next-line
          observer.unobserve(triggerElement)
        }
      }
    }
  }, [callback, triggerRef, wrapperRef])
}
