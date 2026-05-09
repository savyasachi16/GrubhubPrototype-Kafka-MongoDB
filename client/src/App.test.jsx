import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { it } from 'vitest';

it('renders without crashing', () => {
  render(<App />);
});
