export const SAMPLE_COMPONENT = `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Counter: <span data-testid="count-value">{count}</span></h2>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Increment
      </button>
    </div>
  );
}`;

export const SAMPLE_TEST = `import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Counter from './Counter';

describe('Counter Component', () => {
  it('should render with initial count of 0', () => {
    render(<Counter />);
    const countElement = screen.getByTestId('count-value');
    expect(countElement).toHaveTextContent('0');
  });

  it('should increment count when button is clicked', () => {
    render(<Counter />);
    
    const button = screen.getByText('Increment');
    const countElement = screen.getByTestId('count-value');

    // Primo click
    fireEvent.click(button);
    expect(countElement).toHaveTextContent('1');

    // Secondo click
    fireEvent.click(button);
    expect(countElement).toHaveTextContent('2');
  });

  it('should have the correct button style', () => {
    render(<Counter />);
    const button = screen.getByText('Increment');
    expect(button).toHaveAttribute('style');
  });
});`;
