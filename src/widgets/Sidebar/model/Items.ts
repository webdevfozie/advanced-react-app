import { RoutePath } from 'shared/config/routeConfig/routeConfig'

export interface SidebarItemType {
  path: string,
  text: string,
  icon: string
  needAuth?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная страница',
    icon: '🏠',
  },
  {
    path: RoutePath.about,
    text: 'О нас',
    icon: '💁‍',
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    icon: '🪪',
    needAuth: true,
  },
  {
    path: RoutePath.articles,
    text: 'Статьи',
    icon: '📄',
    needAuth: true,
  },
]
