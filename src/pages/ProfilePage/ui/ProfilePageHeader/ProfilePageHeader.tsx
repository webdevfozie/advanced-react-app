import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { getUserAuthData } from 'entities/User'
import { HStack, VStack } from 'shared/ui/Stack'

interface ProfilePageHeaderProps {
  className?: string,
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation('profile')
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const readonly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()
  const canEdit = profileData?.id === authData?.id

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Text title={t('Профиль')} />
      {canEdit && (
        readonly ? (
          <Button
            theme={ButtonTheme.OUTLINE}
            onClick={onEdit}
          >
            {t('Редактировать профиль')}
          </Button>
        ) : (
          <HStack gap={8}>
            <Button
              theme={ButtonTheme.OUTLINE_WARNING}
              onClick={onCancelEdit}
            >
              {t('Отменить')}
            </Button>

            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onSave}
            >
              {t('Сохранить')}
            </Button>
          </HStack>
        )
      )}
    </HStack>
  )
}
