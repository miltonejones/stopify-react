import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import LinkButton from './LinkButton';

afterEach(() => cleanup());

describe('<LinkButton/>', () => {
  it('LinkButton mounts without failing', () => {
    render(<LinkButton />); 
    expect(screen.getAllByTestId("test-for-LinkButton").length).toBeGreaterThan(0);
  });
});

