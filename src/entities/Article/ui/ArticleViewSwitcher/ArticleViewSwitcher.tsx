import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { ArticleView } from '../../model/consts/consts'
import cls from './ArticleViewSwitcher.module.scss'

interface ArticleViewSwitcherProps {
  className?: string,
  view: ArticleView,
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: <Icon>📑</Icon>,
  },
  {
    view: ArticleView.BIG,
    icon: <Icon>📄</Icon>,
  },
]

export const ArticleViewSwitcher = (props: ArticleViewSwitcherProps) => {
  const {
    className,
    view,
    onViewClick,
  } = props

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView)
  }

  return (
    <div className={classNames(cls.articleViewSwitcher, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={viewType.view === view ? ButtonTheme.BACKGROUND_INVERTED : ButtonTheme.OUTLINE}
          onClick={onClick(viewType.view)}
        >
          {viewType.icon}
        </Button>
      ))}
    </div>
  )
}
