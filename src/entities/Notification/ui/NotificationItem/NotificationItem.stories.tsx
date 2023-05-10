import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { NotificationItem } from './NotificationItem'

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationItem>

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />

export const Default = Template.bind({})
Default.args = {
  item: {
    id: '2',
    title: 'Notification 2',
    description: 'Description of Notification 2',
  },
}
