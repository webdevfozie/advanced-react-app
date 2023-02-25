import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/testing/componentRender/componentRender'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  test('render', () => {
    componentRender(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('toggle', () => {
    componentRender(<Sidebar />)
    const toggle = screen.getByTestId('sidebar-toggle')
    fireEvent.click(toggle)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
