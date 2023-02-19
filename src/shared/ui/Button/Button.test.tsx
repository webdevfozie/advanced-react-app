import { render, screen } from '@testing-library/react'
import { Button, ThemeButton } from 'shared/ui/Button/Button'

describe('Button', () => {
  test('render', () => {
    render((<Button>test</Button>))
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  test('clear theme', () => {
    render((<Button theme={ThemeButton.CLEAR}>test</Button>))
    expect(screen.getByText('test')).toHaveClass(ThemeButton.CLEAR)
  })
})
