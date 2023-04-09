import { classNames } from 'shared/lib/classNames/classNames'
import { MutableRefObject, ReactNode, useRef } from 'react'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEndCallback?: () => void
}

export const Page = (props: PageProps) => {
  const {
    className,
    children,
    onScrollEndCallback,
  } = props

  const wrapperRef = useRef() as MutableRefObject<HTMLElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEndCallback,
  })

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  )
}
