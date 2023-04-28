import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticleInfiniteList } from './ArticleInfiniteList'

export default {
  title: 'slice/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleInfiniteList>

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => <ArticleInfiniteList {...args} />

export const Default = Template.bind({})
Default.args = {}
