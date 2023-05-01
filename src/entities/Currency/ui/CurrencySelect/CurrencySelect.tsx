import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Currency } from '../../model/consts/consts'

interface CurrencySelectProps {
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const CurrencyOptions = Object.values(Currency).map((currency) => ({
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
    <ListBox
      label={t('Укажите валюту')}
      items={CurrencyOptions}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})
