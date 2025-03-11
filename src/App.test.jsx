import '@testing-library/jest-dom/vitest' // Ensure Vitest uses the matchers
import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import App from './App'

// Mock Monaco Editor to behave like a <textarea>
vi.mock('@monaco-editor/react', () => {
  return {
    default: ({ value, onChange }) => (
      <textarea
        data-testid='monaco-editor'
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    )
  }
})

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Markdown Editor', () => {
  it('renders markdown editor and preview', async () => {
    render(<App />)

    // Ensure only the Markdown preview heading is checked
    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hello, Markdown!')
  })

  it('updates preview when user types in editor', async () => {
    render(<App />)
    const user = userEvent.setup()

    // Find the mocked Monaco editor (behaving like a textarea)
    const editor = await screen.findByTestId('monaco-editor')

    // Simulate typing in the editor
    await user.clear(editor)
    await user.type(editor, '# Testing Markdown')

    // Ensure only the preview updates
    await waitFor(() => {
      const preview = screen.getByRole('heading', { level: 1 })
      expect(preview).toHaveTextContent('Testing Markdown')
    })
  })
})
