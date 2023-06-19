import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { SidebarItemType } from '../types/sidebar'
import {
  getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router'

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        text: 'Главная страница',
        icon: '🏠',
      },
      {
        path: getRouteAbout(),
        text: 'О нас',
        icon: '💁‍',
      },
    ]

    if (userData) {
      sidebarItemsList.push(
        {
          path: getRouteProfile(userData.id),
          text: 'Профиль',
          icon: '🪪',
          needAuth: true,
        },
        {
          path: getRouteArticles(),
          text: 'Статьи',
          icon: '📄',
          needAuth: true,
        },
      )
    }

    return sidebarItemsList
  },
)
