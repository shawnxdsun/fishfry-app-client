import React from 'react';
import App from './App';
import { render } from '@testing-library/react';

it('should render components without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});
