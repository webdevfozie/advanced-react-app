import { useTranslation } from 'react-i18next'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import { memo, useCallback } from 'react'
import { Country } from '../../model/types/country'

interface CountrySelectProps {
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

const CountryOptions: SelectOption[] = Object.values(Country).map((currency) => ({
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
    <Select
      label={t('Укажите страну')}
      options={CountryOptions}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})
