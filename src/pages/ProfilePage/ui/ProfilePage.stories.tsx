import React from 'react'
import { Args, ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import avatar from 'shared/assets/tests/avatar.jpeg'
import ProfilePage from './ProfilePage'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = (args: Args) => <ProfilePage {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator({
  profile: {
    form: {
      firstname: 'Artem',
      lastname: 'Frolov',
      country: Country.Kazakhstan,
      currency: Currency.KZT,
      age: 24,
      city: 'Almaty',
      avatar,
    },
  },
})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      firstname: 'Artem',
      lastname: 'Frolov',
      country: Country.Kazakhstan,
      currency: Currency.KZT,
      age: 24,
      city: 'Almaty',
      avatar,
    },
  },
})]
