import { ArticleList } from './ui/ArticleList/ArticleList'
import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
import type { Article } from './model/types/article'
import type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
import { getArticleDetailsData } from './model/selectors/articleDetails'
import { ArticleView } from './model/types/article'

export {
  ArticleDetails,
  getArticleDetailsData,
  ArticleList,
  Article,
  ArticleDetailsSchema,
  ArticleView,
}
