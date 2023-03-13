import { classNames } from 'shared/lib/classNames/classNames'
import { Icon } from 'shared/ui/Icon/Icon'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  className?: string,
}

const initialReducers: ReducersList = {
  profile: profileReducer,
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.profilePage, {}, [className])}>
        <Icon>Страница профиля</Icon>
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
