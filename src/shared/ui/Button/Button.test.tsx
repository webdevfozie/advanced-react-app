import { render, screen } from '@testing-library/react'
import { Button, ButtonTheme } from './Button'

describe('Button', () => {
  test('render', () => {
    render((<Button>test</Button>))
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  test('clear theme', () => {
    render((<Button theme={ButtonTheme.CLEAR}>test</Button>))
    expect(screen.getByText('test')).toHaveClass(ButtonTheme.CLEAR)
  })
})
