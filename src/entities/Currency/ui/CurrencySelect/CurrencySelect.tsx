import { useTranslation } from 'react-i18next'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import { memo, useCallback } from 'react'
import { Currency } from '../../model/types/currency'

interface CurrencySelectProps {
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const CurrencyOptions: SelectOption[] = Object.values(Currency).map((currency) => ({
  value: currency,
  content: currency,
}))

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    value,
    onChange,
    readonly,
  } = props

  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <Select
      label={t('Укажите валюту')}
      options={CurrencyOptions}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})
