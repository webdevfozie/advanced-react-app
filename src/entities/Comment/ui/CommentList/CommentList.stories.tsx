import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CommentList } from './CommentList'

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />

export const Default = Template.bind({})
Default.args = {
  commentList: [
    {
      id: '123',
      user: {
        id: '1232',
        username: 'new user',
      },
      text: 'Comment',
    },
    {
      id: '123',
      user: {
        id: '1232',
        username: 'new user',
      },
      text: 'Comment',
    },
    {
      id: '123',
      user: {
        id: '1232',
        username: 'new user',
      },
      text: 'Comment',
    },
  ],
}

export const Loading = Template.bind({})
Loading.args = {
  commentList: [],
  isLoading: true,
}
