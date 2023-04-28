import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticleDetailsComments } from './ArticleDetailsComments'

export default {
  title: 'slice/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsComments>

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments {...args} />

export const Default = Template.bind({})
Default.args = {}
