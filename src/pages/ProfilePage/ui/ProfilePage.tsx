import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  fetchProfileData,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  profileActions,
  ProfileCard,
  profileReducer,
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  className?: string,
}

const initialReducers: ReducersList = {
  profile: profileReducer,
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const form = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstName = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({
      firstname: value,
    }))
  }, [dispatch])

  const onChangeLastName = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({
      lastname: value,
    }))
  }, [dispatch])

  const onChangeAge = useCallback((value: string = '') => {
    const validatedValue = value.replace(/\D+/gm, '')
    dispatch(profileActions.updateProfile({
      age: Number(validatedValue || 0),
    }))
  }, [dispatch])

  const onChangeCity = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({
      city: value,
    }))
  }, [dispatch])

  const onChangeUsername = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({
      username: value,
    }))
  }, [dispatch])

  const onChangeAvatar = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({
      avatar: value,
    }))
  }, [dispatch])

  const onChangeCurrency = useCallback((value: Currency = Currency.RUB) => {
    dispatch(profileActions.updateProfile({
      currency: value,
    }))
  }, [dispatch])

  const onChangeCountry = useCallback((value: Country = Country.Kazakhstan) => {
    dispatch(profileActions.updateProfile({
      country: value,
    }))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.profilePage, {}, [className])}>
        <ProfilePageHeader />
        <ProfileCard
          data={form}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
