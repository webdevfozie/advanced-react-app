import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Tags } from './Tags'

export default {
  title: 'shared/Tags',
  component: Tags,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tags>

const Template: ComponentStory<typeof Tags> = (args) => <Tags {...args} />

export const Default = Template.bind({})
Default.args = {
  tags: [
    {
      value: 'tag 1',
      content: 'Tag 1',
    },
    {
      value: 'tag 2',
      content: 'Tag 2',
    },
    {
      value: 'tag 3',
      content: 'Tag 3',
    },
  ],
  value: 'tag 2',
  onTagClick: action('onTagClick'),
}
