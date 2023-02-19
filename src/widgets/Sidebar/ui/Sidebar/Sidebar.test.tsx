import { fireEvent, screen } from '@testing-library/react'
import { renderWithTranslation } from 'shared/lib/testing/renderWithTranslation/renderWithTranslation'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  test('render', () => {
    renderWithTranslation(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('toggle', () => {
    renderWithTranslation(<Sidebar />)
    const toggle = screen.getByTestId('sidebar-toggle')
    fireEvent.click(toggle)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
