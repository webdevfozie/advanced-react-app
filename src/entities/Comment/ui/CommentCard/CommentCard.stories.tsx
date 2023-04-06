import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CommentCard } from './CommentCard'

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />

export const Default = Template.bind({})
Default.args = {
  comment: {
    id: '123',
    user: {
      id: '1232',
      username: 'new user',
    },
    text: 'Comment',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}
