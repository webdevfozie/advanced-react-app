import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import avatar from '@/shared/assets/tests/avatar.jpeg'
import { ProfileCard } from './ProfileCard'

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  data: {
    firstname: 'Artem',
    lastname: 'Frolov',
    country: Country.Kazakhstan,
    currency: Currency.KZT,
    age: 24,
    city: 'Almaty',
    avatar,
  },
}

export const withError = Template.bind({})
withError.args = {
  error: 'error',
}

export const isLoading = Template.bind({})
isLoading.args = {
  isLoading: true,
}
