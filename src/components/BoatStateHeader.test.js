import React from 'react';
import BoatStateHeader from './BoatStateHeader';
import { render, screen } from '@testing-library/react';

it('should render boat state header', () => {
    const div = document.createElement('div');
    render(<BoatStateHeader  />, div);
    expect(screen.getByTestId('boat-state-header')).toBeInTheDocument();
});
