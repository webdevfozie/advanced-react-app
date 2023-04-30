import { RouteProps } from 'react-router-dom'
import { MainPage } from 'pages/MainPage'
import { AboutPage } from 'pages/AboutPage'
import { NotFound } from 'pages/NotFound'
import { ProfilePage } from 'pages/ProfilePage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage'
import { ArticleEditPage } from 'pages/ArticleEditPage'
import { AdminPanelPage } from 'pages/AdminPanelPage'
import { UserRole } from 'entities/User/model/types/User'
import { ForbiddenPage } from 'pages/ForbiddenPage'

export type AppRouteProps = RouteProps & {
  needAuth?: boolean,
  roles?: UserRole[]
}

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

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/', // + id
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + id
  [AppRoutes.ARTICLE_CREATE]: '/articles/create',
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
  [AppRoutes.ADMIN_PANEL]: '/admin',
  [AppRoutes.FORBIDDEN_PAGE]: '/forbidden',

  [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: `${RoutePath[AppRoutes.PROFILE]}:id`,
    element: <ProfilePage />,
    needAuth: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath[AppRoutes.ARTICLES],
    element: <ArticlesPage />,
    needAuth: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: `${RoutePath[AppRoutes.ARTICLE_DETAILS]}:id`,
    element: <ArticleDetailsPage />,
    needAuth: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: RoutePath[AppRoutes.ARTICLE_CREATE],
    element: <ArticleEditPage />,
    needAuth: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: RoutePath[AppRoutes.ARTICLE_EDIT],
    element: <ArticleEditPage />,
    needAuth: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: RoutePath[AppRoutes.ADMIN_PANEL],
    element: <AdminPanelPage />,
    needAuth: true,
    roles: [UserRole.ADMIN],
  },
  [AppRoutes.FORBIDDEN_PAGE]: {
    path: RoutePath[AppRoutes.FORBIDDEN_PAGE],
    element: <ForbiddenPage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFound />,
  },
}
