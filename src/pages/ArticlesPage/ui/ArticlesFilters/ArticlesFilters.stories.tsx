import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticlesFilters } from './ArticlesFilters'

export default {
  title: 'pages/ArticlesFilters',
  component: ArticlesFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesFilters>

const Template: ComponentStory<typeof ArticlesFilters> = (args) => <ArticlesFilters {...args} />

export const Default = Template.bind({})
Default.args = {}
