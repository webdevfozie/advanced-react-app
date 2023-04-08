import { ArticleViewSwitcher } from './ui/ArticleViewSwitcher/ArticleViewSwitcher'
import { ArticleList } from './ui/ArticleList/ArticleList'
import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
import { Article, ArticleView } from './model/types/article'
import { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
import { getArticleDetailsData } from './model/selectors/articleDetails'

export {
  ArticleDetails,
  getArticleDetailsData,
  ArticleList,
  Article,
  ArticleDetailsSchema,
  ArticleView,
  ArticleViewSwitcher,
}
