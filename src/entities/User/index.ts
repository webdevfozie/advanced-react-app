import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
import { userReducer, userActions } from './model/slice/UserSlice'
import { User, UserSchema } from './model/types/User'

export {
  userReducer,
  userActions,
  User,
  UserSchema,
  getUserAuthData,
}
