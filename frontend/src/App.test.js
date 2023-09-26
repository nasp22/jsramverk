require("setimmediate");
import { render, screen } from '@testing-library/react';
import App from './App';

test('header', () => {
  render(<App />);
  // const linkElement = screen.getByText(/Trafikledare Applikationen/i);
  // expect(linkElement).toBeInTheDocument();
});
