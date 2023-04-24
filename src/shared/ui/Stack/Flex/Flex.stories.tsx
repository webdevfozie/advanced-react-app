import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Flex } from './Flex'

export default {
  title: 'shared/Stack/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />

export const Default = Template.bind({})
Default.args = {
  direction: 'row',
  children: (
    <>
      <span>Text</span>
      <span>Text</span>
      <span>Text</span>
      <span>Text</span>
    </>
  ),
}
