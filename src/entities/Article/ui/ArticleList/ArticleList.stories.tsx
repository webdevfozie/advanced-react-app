import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticleView } from '../../model/consts/consts'
import { ArticleList } from './ArticleList'

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />

export const Loading = Template.bind({})
Loading.args = {
  view: ArticleView.BIG,
  articles: [],
  isLoading: true,
}

export const LoadingSmall = Template.bind({})
LoadingSmall.args = {
  view: ArticleView.SMALL,
  articles: [],
  isLoading: true,
}
