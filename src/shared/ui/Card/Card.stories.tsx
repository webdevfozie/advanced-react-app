import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Text } from '../Text/Text'
import { Card } from './Card'

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <Text title="Title">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolores nobis?
    Aspernatur magni maiores natus officia qui quidem totam.
  </Text>,
}
