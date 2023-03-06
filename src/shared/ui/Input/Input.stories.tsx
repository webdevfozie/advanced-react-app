import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Input } from './Input'

export default {
  title: 'shared/Input',
  component: Input,
} as ComponentMeta<typeof Input>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Placeholder',
  value: '123',
}
