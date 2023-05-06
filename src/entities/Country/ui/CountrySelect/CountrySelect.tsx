import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ListBox } from '@/shared/ui/Popups'
import { Country } from '../../model/consts/consts'

interface CountrySelectProps {
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

const CountryOptions = Object.values(Country).map((currency) => ({
  value: currency,
  content: currency,
}))

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    value,
    onChange,
    readonly,
  } = props

  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <ListBox
      label={t('Укажите страну')}
      items={CountryOptions}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
      direction="top-right"
    />
  )
})
