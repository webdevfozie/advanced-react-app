import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { ProfileCard } from 'entities/Profile'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from 'shared/ui/Stack'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { profileActions, profileReducer } from '../../model/slice/ProfileSlice'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'

interface EditableProfileCardProps {
  className?: string;
  id: string,
}

const initialReducers: ReducersList = {
  profile: profileReducer,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props; const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const form = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)

  const validateErrorTranslations = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия являются обязательными'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
    [ValidateProfileError.SERVER_ERROR]: t('Произошла серверная ошибка при сохранении'),
    [ValidateProfileError.INCORRECT_CITY]: t('Некорректный город'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('Указана некорректная валюта'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USERNAME]: t('Некорректный логин'),
  }

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

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
    <DynamicModuleLoader reducers={initialReducers}>
      <VStack gap={8} max className={classNames('', {}, [className])}>
        <EditableProfileCardHeader />
        {validateErrors?.length && validateErrors.map((error) => (
          <Text
            key={error}
            theme={TextTheme.ERROR}
          >
            {validateErrorTranslations[error]}
          </Text>
        ))}
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
      </VStack>
    </DynamicModuleLoader>
  )
})
