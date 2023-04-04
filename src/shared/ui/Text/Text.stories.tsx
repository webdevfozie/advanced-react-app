import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Text, TextSize, TextTheme } from './Text'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
}

export const SizeL = Template.bind({})
SizeL.args = {
  title: 'Title',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  size: TextSize.L,
}
export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
  title: 'Title',
}

export const OnlyText = Template.bind({})
OnlyText.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
}

export const DefaultDark = Template.bind({})
DefaultDark.args = {
  title: 'Title',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
}
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)]
export const OnlyTitleDark = Template.bind({})
OnlyTitleDark.args = {
  title: 'Title',
}
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({})
OnlyTextDark.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
}
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Error = Template.bind({})
Error.args = {
  title: 'Error 404',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  theme: TextTheme.ERROR,
}
