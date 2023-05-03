import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Popover } from './Popover'

export default {
  title: 'slice/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />

export const Default = Template.bind({})
Default.args = {}
