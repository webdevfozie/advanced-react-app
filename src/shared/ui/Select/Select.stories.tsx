import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Select } from './Select'

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Select',
  options: [
    {
      value: 'value',
      content: 'Первый',
    },
    {
      value: 'value1',
      content: 'Второй',
    },
    {
      value: 'value2',
      content: 'Третий',
    },
  ],
}
