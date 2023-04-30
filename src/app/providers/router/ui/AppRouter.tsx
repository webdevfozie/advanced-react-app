import { Route, Routes } from 'react-router-dom'
import {
  memo, Suspense, useCallback,
} from 'react'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig'
import { RequireAuth } from 'app/providers/router/ui/RequireAuth'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    )

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.needAuth
          ? <RequireAuth roles={route.roles}>{element}</RequireAuth>
          : element}
      />
    )
  }, [])

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  )
}

export default memo(AppRouter)
