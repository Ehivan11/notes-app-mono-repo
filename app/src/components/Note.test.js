import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'

test('Render content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const view = render(<Note note={note} />)

  view.screen.getByText('This is a test')
  view.screen.getByText('make not important')
})

test('Clicking the button call event handler once', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const mockHandler = jest.fn()

  const view = render(<Note note={note} toggleImportance={mockHandler}/>)

  const button = view.screen.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})
