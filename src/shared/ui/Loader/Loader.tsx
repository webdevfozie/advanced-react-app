import { classNames } from '@/shared/lib/classNames/classNames'
import './Loader.scss'

interface PageLoaderProps {
  className?: string,
}

export const Loader = ({ className }: PageLoaderProps) => (
  <div className={classNames('lds-ripple', {}, [className])}>
    <div />
    <div />
  </div>
)
