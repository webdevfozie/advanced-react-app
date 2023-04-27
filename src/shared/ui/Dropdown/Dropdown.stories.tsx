import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from '../Button/Button'
import { Dropdown } from './Dropdown'

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  trigger: <Button>Open!</Button>,
  items: [
    {
      content: 'Hello',
    },
    {
      content: 'Hello 2',
    },
    {
      content: 'Hello 3',
    },
  ],
}
