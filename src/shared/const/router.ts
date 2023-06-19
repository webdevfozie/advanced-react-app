export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article-details',
  ARTICLE_CREATE = 'article-create',
  ARTICLE_EDIT = 'article-edit',
  ADMIN_PANEL = 'admin-panel',
  FORBIDDEN_PAGE = 'forbidden-page',

  NOT_FOUND = 'not_found'
}

export const getRouteMain = () => '/'
export const getRouteAbout = () => '/about'
export const getRouteProfile = (id: string) => `/profile/${id}`
export const getRouteArticles = () => '/articles'
export const getRouteArticleDetails = (id: string) => `/articles/${id}`
export const getRouteArticleCreate = () => '/articles/create'
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`
export const getRouteAdminPanel = () => '/admin'
export const getRouteForbidden = () => '/forbidden'
