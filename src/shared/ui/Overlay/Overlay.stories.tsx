import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Overlay } from './Overlay'

export default {
  title: 'slice/Overlay',
  component: Overlay,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Overlay>

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />

export const Default = Template.bind({})
Default.args = {}
