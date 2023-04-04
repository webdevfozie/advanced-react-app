import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ArticlesPage from './ArticlesPage'

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPage >

const Template: ComponentStory<typeof
ArticlesPage > = () => <ArticlesPage />

export const Default = Template.bind({})
Default.args = {}
