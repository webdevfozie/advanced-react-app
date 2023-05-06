import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card/Card'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { ArticleView } from '../../model/consts/consts'
import cls from './ArticleListItem.module.scss'

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleView
}

export const ArticleListItemSkeleton = (props: ArticleListItemSkeletonProps) => {
  const {
    className,
    view,
  } = props

  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Skeleton radius="50%" height={30} width={30} />
            <Skeleton width={150} height={16} className={cls.username} />
            <Skeleton width={150} height={16} className={cls.createdAt} />
          </div>
          <Skeleton width={250} height={24} className={cls.title} />
          <Skeleton width="100%" height={200} className={cls.img} />
          <div className={cls.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      <Card>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} className={cls.img} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton height={16} width={130} />
        </div>
        <Skeleton className={cls.title} width={150} height={16} />
      </Card>
    </div>
  )
}
