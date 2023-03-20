import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Avatar } from './Avatar'

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Primary = Template.bind({})
Primary.args = {
  src: 'https://lh3.googleusercontent.com/a/AGNmyxY1DSuPmNmMunvmzbjxjflvXyKmRfRNw_sIr1cUPw=s634',
  size: 50,
}
export const Large = Template.bind({})
Large.args = {
  src: 'https://lh3.googleusercontent.com/a/AGNmyxY1DSuPmNmMunvmzbjxjflvXyKmRfRNw_sIr1cUPw=s634',
  size: 150,
}
