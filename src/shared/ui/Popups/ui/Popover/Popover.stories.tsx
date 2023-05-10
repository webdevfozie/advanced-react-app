import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Popover } from './Popover'
import { Button } from '@/shared/ui/Button/Button'
import { Text } from '@/shared/ui/Text/Text'

export default {
  title: 'shared/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [(Story) => <div style={{ padding: 200 }}><Story /></div>],
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />

export const Default = Template.bind({})
Default.args = {
  trigger: (
    <Button>Open popover</Button>
  ),
  children: (
    <Text title="popover content" />
  ),
  direction: 'bottom-left',
}
