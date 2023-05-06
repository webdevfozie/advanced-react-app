import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from '@/shared/ui/Stack'
import { addCommentFormActions, addCommentFormReducer } from '../model/slice/addCommentFormSlice'
import { getAddCommentFormText } from '../model/selectors/addCommentFormSelectors'
import cls from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm = (props: AddCommentFormProps) => {
  const {
    className,
    onSendComment,
  } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const text = useSelector(getAddCommentFormText)

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onCommentTextChange, onSendComment, text])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <HStack max gap={16} className={classNames(cls.addCommentForm, {}, [className])}>
        <Input
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onCommentTextChange}
          className={cls.input}
        />
        <Button
          onClick={onSendHandler}
        >
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  )
}

export default AddCommentForm
