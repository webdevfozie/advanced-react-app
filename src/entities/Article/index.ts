import {
  ArticleBlockType, ArticleView,
} from './model/consts/consts'
import { ArticleViewSwitcher } from './ui/ArticleViewSwitcher/ArticleViewSwitcher'
import { ArticleList } from './ui/ArticleList/ArticleList'
import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
import {
  Article,
} from './model/types/article'
import { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
import { getArticleDetailsData } from './model/selectors/articleDetails'

export {
  ArticleDetails,
  getArticleDetailsData,
  ArticleList,
  ArticleViewSwitcher,
  ArticleView,
  ArticleBlockType,
}

export type {
  Article,
  ArticleDetailsSchema,
}
export { ArticleType } from '@/entities/Article/model/consts/consts'
