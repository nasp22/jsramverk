import { render, screen } from '@testing-library/react';
import DelayMap from './DelayMap';

test('renders learn react link', () => {
  render(<DelayMap />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
