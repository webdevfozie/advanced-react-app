import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import withMock from 'storybook-addon-mock'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />

export const Normal = Template.bind({})
Normal.args = {

}
Normal.decorators = [StoreDecorator({})]

const article = {
  id: '1',
  img: '',
  createdAt: '',
  views: 123,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: '123',
  subtitle: 'asfsa',
}

Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=5`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
        { ...article, id: '4' },
        { ...article, id: '5' },
      ],
    },
  ],
}
