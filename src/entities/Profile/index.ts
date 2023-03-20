import { getProfileReadonly } from 'entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly'
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData'
import { getProfileIsLoading } from './model/selectors/getProfileIsloading/getProfileIsLoading'
import { getProfileError } from './model/selectors/getProfileError/getProfileError'
import { getProfileData } from './model/selectors/getProfileData/getProfileData'
import { ProfileCard } from './ui/ProfileCard/ProfileCard'
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData'
import { Profile, ProfileSchema } from './model/types/profile'
import { profileActions, profileReducer } from './model/slice/ProfileSlice'

export {
  Profile,
  ProfileSchema,
  profileActions,
  profileReducer,
  fetchProfileData,
  updateProfileData,
  ProfileCard,
  getProfileIsLoading,
  getProfileError,
  getProfileData,
  getProfileReadonly,
}
