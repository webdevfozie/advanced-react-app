import { classNames } from 'shared/lib/classNames/classNames'
import {
  MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getScrollByPath, scrollSavingActions } from 'features/ScrollSaving'
import { useLocation } from 'react-router-dom'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'
import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEndCallback?: () => void
}

export const PAGE_ID = 'page_id'

export const Page = (props: PageProps) => {
  const {
    className,
    children,
    onScrollEndCallback,
  } = props

  const wrapperRef = useRef() as MutableRefObject<HTMLElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const location = useLocation()
  const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, location.pathname))

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEndCallback,
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollSavingActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: location.pathname,
    }))
  }, 500)

  return (
    <main
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
    >
      {children}
      {onScrollEndCallback ? <div className={cls.scrollTrigger} ref={triggerRef} /> : null}
    </main>
  )
}
