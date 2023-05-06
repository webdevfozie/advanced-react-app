import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { EditableProfileCard } from '@/features/EditableProfileCard'
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  className?: string,
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props
  const { id } = useParams<{id: string}>()

  return (
    <Page className={classNames(cls.profilePage, {}, [className])}>
      <VStack gap={16} max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
