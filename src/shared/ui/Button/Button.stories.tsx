import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Button, ButtonSize, ButtonTheme } from './Button'

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const SizeS = Template.bind({})
SizeS.args = {
  children: 'Button',
  size: ButtonSize.S,
}

export const SizeM = Template.bind({})
SizeM.args = {
  children: 'Button',
  size: ButtonSize.M,
}

export const SizeL = Template.bind({})
SizeL.args = {
  children: 'Button',
  size: ButtonSize.L,
}

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button',
}

export const Clear = Template.bind({})
Clear.args = {
  children: 'Button',
  theme: ButtonTheme.CLEAR,
}

export const Outline = Template.bind({})
Outline.args = {
  children: 'Button',
  theme: ButtonTheme.OUTLINE,
}

export const OutlineDark = Template.bind({})
OutlineDark.args = {
  children: 'Button',
  theme: ButtonTheme.OUTLINE,
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Background = Template.bind({})
Background.args = {
  children: 'Button',
  theme: ButtonTheme.BACKGROUND,
}

export const BackgroundInverted = Template.bind({})
BackgroundInverted.args = {
  children: 'Button',
  theme: ButtonTheme.BACKGROUND_INVERTED,
}

export const Square = Template.bind({})
Square.args = {
  children: '⚙️',
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
}
