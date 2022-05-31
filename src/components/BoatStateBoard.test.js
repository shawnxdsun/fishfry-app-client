import React from 'react';
import ReactDOM from 'react-dom';
import BoatStateBoard from './BoatStateBoard';
import { render, screen } from '@testing-library/react';


describe('boat state board', () => {
    it('should render components', () => {
        const div = document.createElement('div');
        render(<BoatStateBoard  />, div);
        expect(screen.getByTestId('boat-state-board')).toBeInTheDocument();
        expect(screen.getByTestId('boat-state-board-add-boat-dialog')).toBeInTheDocument();
        expect(screen.getByTestId('boat-state-board-add-boat-container')).toBeInTheDocument();
    });
});

