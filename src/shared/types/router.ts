import { RouteProps } from 'react-router-dom'
// eslint-disable-next-line fsd-imports-23/layer-imports
import { UserRole } from '@/entities/User'

export type AppRouteProps = RouteProps & {
  needAuth?: boolean,
  roles?: UserRole[]
}
