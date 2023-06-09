import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Modal } from './Modal'

import { Theme } from '@/shared/const/theme'

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, obcaecati?',
  isOpen: true,
}

export const Dark = Template.bind({})
Dark.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, obcaecati?',
  isOpen: true,
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
