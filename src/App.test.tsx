import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('app render', async () => {
  render(<App />);
});

test('header render', async () => {
  render(<App />);
  const element = screen.getByText(/WILIOT/i)
  expect(element).toBeInTheDocument()
});

test('info render', async () => {
  render(<App />);
  const element = screen.getByText(/ID 1/i)
  expect(element).toBeInTheDocument()
});

test('chart render', async () => {
  render(<App />);
  const element = screen.getByText(/DATA/i)
  expect(element).toBeInTheDocument()
});
