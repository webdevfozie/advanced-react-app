import { useTranslation } from 'react-i18next'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Country } from 'entities/Country/model/types/country'
import { CountrySelect } from 'entities/Country'
import cls from './ProfileCard.module.scss'
import { Profile } from '../../model/types/profile'

interface ProfileCardProps {
  className?: string,
  data?: Profile,
  isLoading?: boolean,
  error?: string,
  readonly?: boolean,
  onChangeFirstName?: (value?: string) => void
  onChangeLastName?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (value?: Currency) => void
  onChangeCountry?: (value?: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    readonly,
    error,
    onChangeFirstName,
    onChangeLastName,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props

  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <div className={classNames(cls.profileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  }

  if (error) {
    return (
      <div className={classNames(cls.profileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля!')}
          align={TextAlign.CENTER}
        >
          {t('Попробуйте обновить страницу')}
        </Text>
      </div>
    )
  }

  return (
    <div className={classNames(cls.profileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar
              src={data?.avatar}
              alt={data?.username}
              size={200}
            />
          </div>
        ) }

        <Input
          value={data?.firstname}
          placeholder={t('Ваше имя')}
          readonly={readonly}
          onChange={onChangeFirstName}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          readonly={readonly}
          onChange={onChangeLastName}
        />
        <Input
          value={data?.age}
          placeholder={t('Ваш возраст')}
          readonly={readonly}
          onChange={onChangeAge}
        />
        <Input
          value={data?.city}
          placeholder={t('Город')}
          readonly={readonly}
          onChange={onChangeCity}
        />
        <Input
          value={data?.username}
          placeholder={t('Ваш username')}
          readonly={readonly}
          onChange={onChangeUsername}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Ваш аватар')}
          readonly={readonly}
          onChange={onChangeAvatar}
        />
        <CurrencySelect
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  )
}
