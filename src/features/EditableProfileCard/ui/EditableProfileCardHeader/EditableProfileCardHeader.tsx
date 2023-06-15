import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from '@/entities/User'
import { HStack } from '@/shared/ui/Stack'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { profileActions } from '../../model/slice/ProfileSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'

interface ProfilePageHeaderProps {
  className?: string,
}

export const EditableProfileCardHeader = (props: ProfilePageHeaderProps) => {
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
            data-testid="EditableProfileCardHeader.editButton"
          >
            {t('Редактировать профиль')}
          </Button>
        ) : (
          <HStack gap={8}>
            <Button
              theme={ButtonTheme.OUTLINE_WARNING}
              onClick={onCancelEdit}
              data-testid="EditableProfileCardHeader.cancelButton"
            >
              {t('Отменить')}
            </Button>

            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onSave}
              data-testid="EditableProfileCardHeader.saveButton"
            >
              {t('Сохранить')}
            </Button>
          </HStack>
        )
      )}
    </HStack>
  )
}
