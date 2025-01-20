import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    _id: '1',
    text: 'Remember to test Todo component',
    done: true
  }

  render(<Todo todo={todo} />)

  const element = screen.getByText('Remember to test Todo component')
  expect(element).toBeDefined()
})