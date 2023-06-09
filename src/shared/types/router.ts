import { RouteProps } from 'react-router-dom'
import { UserRole } from '@/entities/User'

export type AppRouteProps = RouteProps & {
  needAuth?: boolean,
  roles?: UserRole[]
}
