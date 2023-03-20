import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string,
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation('profile')

  const readonly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()

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
    <div className={classNames(cls.profilePageHeader, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')} />
        { readonly ? (
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.editBtn}
            onClick={onEdit}
          >
            {t('Редактировать профиль')}
          </Button>
        ) : (
          <div className={cls.editBtn}>
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
          </div>
        )}
      </div>
    </div>
  )
}
