import { Story } from '@storybook/react'
// eslint-disable-next-line fsd-imports-23/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'

import { Theme } from '@/shared/const/theme'

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider>
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  </ThemeProvider>
)
