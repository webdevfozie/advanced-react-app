import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Drawer } from './Drawer'
import { Text } from '../Text/Text'

export default {
  title: 'shared/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [(Story) => <div style={{ position: 'relative' }}><Story /></div>],
} as ComponentMeta<typeof Drawer>

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  children: (
    <Text title="Drawer content" />
  ),
}
