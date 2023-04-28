import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page'
import { VStack } from 'shared/ui/Stack'
import { EditableProfileCard } from 'features/EditableProfileCard'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  className?: string,
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props
  const { t } = useTranslation('profile')
  const { id } = useParams<{id: string}>()

  if (!id) {
    return <Text>{t('Профиль не найден!')}</Text>
  }

  return (
    <Page className={classNames(cls.profilePage, {}, [className])}>
      <VStack gap={16} max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
