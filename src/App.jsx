import React from "react";
import TestDemo from "./demo/TestDemo";

const INITIAL_FILES = {
  "/Counter.jsx": {
    path: "/Counter.jsx",
    content: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Counter</h2>
      <p data-testid="count" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
      >
        Increment
      </button>
    </div>
  );
}`,
    isFolder: false,
  },
  "/Counter.test.jsx": {
    path: "/Counter.test.jsx",
    content: `import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

test('increments counter', () => {
  render(<Counter />);
  const count = screen.getByTestId('count');
  const button = screen.getByText('Increment');

  expect(count.textContent).toBe('0');
  fireEvent.click(button);
  expect(count.textContent).toBe('1');
});`,
    isFolder: false,
  },
};

export default function App() {
  return (
    <TestDemo
      files={INITIAL_FILES}
      testFilePath="/Counter.test.jsx"
      sourceFilePath="/Counter.jsx"
    />
  );
}
