import React from "react";
import TestComponent from "../testing/TestComponent";

// 1. Definizione del File System Virtuale
// Questo oggetto simula i file che il runner deve processare.
const virtualFiles = {
  "/Button.jsx": {
    path: "/Button.jsx",
    isFolder: false,
    content: `
import React from 'react';

export default function Button({ onClick, children }) {
  return (
    <button 
      onClick={onClick}
      style={{ 
        padding: '10px 20px', 
        backgroundColor: '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
}`,
  },
  "/Button.test.jsx": {
    path: "/Button.test.jsx",
    isFolder: false,
    content: `
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});`,
  },
};

// 2. Componente che utilizza il TestRunner
export default function UsageExample() {
  return (
    <div className="h-screen w-full p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Esempio Integrazione TestComponent
      </h1>
      <div className="h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-white shadow-xl">
        <TestComponent
          files={virtualFiles}
          testFilePaths={["/Button.test.jsx"]}
        />
      </div>
    </div>
  );
}
