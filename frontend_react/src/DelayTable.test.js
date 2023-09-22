import { render, screen } from '@testing-library/react';
import DelayTable from './DelayTable';

test('renders learn react link', () => {
  render(<DelayTable />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
