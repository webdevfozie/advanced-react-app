import { useSelector } from 'react-redux'
import { getUserAuthData, getUserRoles } from 'entities/User'
import { Navigate, useLocation } from 'react-router-dom'
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useMemo } from 'react'
import { UserRole } from 'entities/User/model/consts/consts'

interface RequireAuthProps {
  children: JSX.Element,
  roles?: UserRole[]
}

export function RequireAuth(props: RequireAuthProps) {
  const {
    children,
    roles,
  } = props
  const auth = useSelector(getUserAuthData)
  const location = useLocation()
  const userRoles = useSelector(getUserRoles)

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true
    }

    return roles.some((requiredRole) => userRoles?.includes(requiredRole))
  }, [roles, userRoles])

  if (!auth) {
    return <Navigate to={RoutePath[AppRoutes.MAIN]} state={{ from: location }} replace />
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath[AppRoutes.FORBIDDEN_PAGE]} state={{ from: location }} replace />
  }

  return children
}
