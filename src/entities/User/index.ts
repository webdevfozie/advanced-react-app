import { getUserRoles, isUserAdmin, isUserManager } from './model/selectors/getUserRoles/getUserRoles'
import { getUserMounted } from './model/selectors/getUserMounted/getUserMounted'
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
import { userActions, userReducer } from './model/slice/UserSlice'
import { User, UserSchema } from './model/types/User'
import { UserRole } from './model/consts/consts'

export {
  UserRole,
  userReducer,
  userActions,
  getUserAuthData,
  getUserMounted,
  isUserAdmin,
  isUserManager,
  getUserRoles,
}

export type {
  User,
  UserSchema,
}
