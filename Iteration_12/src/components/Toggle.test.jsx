import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';
import '@testing-library/jest-dom';

test('toggles status on button click', () => {
  render(<Toggle />);

  const status = screen.getByTestId('status');
  const button = screen.getByRole('button', { name: /toggle/i });

  expect(status).toHaveTextContent('OFF');

  fireEvent.click(button);
  expect(status).toHaveTextContent('ON');

  fireEvent.click(button);
  expect(status).toHaveTextContent('OFF');
});

test('matches snapshot', () => {
  const { container } = render(<Toggle />);
  expect(container).toMatchSnapshot();
});