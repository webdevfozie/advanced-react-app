import { Route, Routes } from 'react-router-dom'
import { memo, Suspense, useMemo } from 'react'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData)

  const routes = useMemo(() => Object.values(routeConfig).filter((route) => !(
    route.needAuth && !isAuth
  )), [isAuth])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {
          routes.map(({
            element,
            path,
          }) => (
            <Route
              key={path}
              element={(
                <div className="page-wrapper">
                  {element}
                </div>
              )}
              path={path}
            />
          ))
        }
      </Routes>
    </Suspense>
  )
}

export default memo(AppRouter)
