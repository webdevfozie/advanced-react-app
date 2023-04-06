import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { SidebarItemType } from '../types/sidebar'

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
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
    ]

    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.profile + userData.id,
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
      )
    }

    return sidebarItemsList
  },
)
