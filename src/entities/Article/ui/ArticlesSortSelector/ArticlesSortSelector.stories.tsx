import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticlesSortSelector } from './ArticlesSortSelector'

export default {
  title: 'entities/ArticlesSortSelector',
  component: ArticlesSortSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesSortSelector>

const Template: ComponentStory<typeof ArticlesSortSelector> = (args) => <ArticlesSortSelector {...args} />

export const Default = Template.bind({})
Default.args = {}
