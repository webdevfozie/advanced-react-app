import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { SidebarItemType } from '../types/sidebar'
import { RoutePath } from '@/shared/const/router'

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
