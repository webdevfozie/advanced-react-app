import { Route, Routes } from 'react-router-dom'
import {
  memo, Suspense, useCallback,
} from 'react'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig'
import { RequireAuth } from 'app/providers/router/ui/RequireAuth'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        <div className="page-wrapper">
          {route.element}
        </div>
      </Suspense>
    )

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.needAuth
          ? <RequireAuth>{element}</RequireAuth>
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
