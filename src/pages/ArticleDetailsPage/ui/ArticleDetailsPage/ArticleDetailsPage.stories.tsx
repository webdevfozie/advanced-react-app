import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ArticleDetailsPage from './ArticleDetailsPage'

export default {
  title: 'slice/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsPage>

const Template: ComponentStory<typeof ArticleDetailsPage> = () => <ArticleDetailsPage />

export const Default = Template.bind({})
Default.args = {}
