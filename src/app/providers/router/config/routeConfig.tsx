import { MainPage } from '@/pages/MainPage'
import { AboutPage } from '@/pages/AboutPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage'
import { ArticleEditPage } from '@/pages/ArticleEditPage'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { UserRole } from '@/entities/User'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFound } from '@/pages/NotFound'
import { AppRouteProps } from '@/shared/types/router'
import { AppRoutes, RoutePath } from '@/shared/const/router'

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
