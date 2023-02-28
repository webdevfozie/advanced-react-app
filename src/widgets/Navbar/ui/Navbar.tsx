import { classNames } from 'shared/lib/classNames/classNames'
import { Icon } from 'shared/ui/Icon/Icon'
import { Modal } from 'shared/ui/Modal/Modal'
import { useState } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string,
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const onClose = () => setIsAuthModalOpen(false)
  const openModal = () => setIsAuthModalOpen(true)

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <Button
          onClick={openModal}
          theme={ButtonTheme.OUTLINE_INVERTED}
        >
          <Icon>🔐</Icon>
          &nbsp;
          {t('Войти')}
        </Button>
      </div>
      <Modal isOpen={isAuthModalOpen} onClose={onClose}>
        123
      </Modal>
    </div>
  )
}
