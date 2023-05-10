import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import withMock from 'storybook-addon-mock'
import { NotificationList } from './NotificationList'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { WithoutRate } from '@/features/ArticleRating/ui/ArticleRating/ArticleRating.stories'

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationList>

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.decorators = [
  StoreDecorator({}),
]
Default.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'Notification 1',
          description: 'Description of Notification 1',
        },
        {
          id: '2',
          title: 'Notification 2',
          description: 'Description of Notification 2',
        },
        {
          id: '3',
          title: 'Notification 3',
          description: 'Description of Notification 3',
        },
      ],
    },
  ],
}
