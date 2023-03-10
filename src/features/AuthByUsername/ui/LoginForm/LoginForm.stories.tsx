import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { LoginForm } from './LoginForm'

export default {
  title: 'features/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [StoreDecorator({
  loginForm: {
    username: 'user',
    password: '123',
  },
})]

export const WithLoading = Template.bind({})
WithLoading.args = {}
WithLoading.decorators = [StoreDecorator({
  loginForm: {
    username: 'user',
    password: '123',
    isLoading: true,
  },
})]

export const WithError = Template.bind({})
WithError.args = {}
WithError.decorators = [StoreDecorator({
  loginForm: {
    username: 'user',
    password: '123',
    error: 'Ошибка 404',
  },
})]
