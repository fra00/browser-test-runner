# React In-Browser Test Runner

A suite of React components to run unit tests directly in the browser. Includes an execution engine (`TestComponent`) and a complete demo interface (`TestDemo`).

🔗 **Live Demo:** https://browser-test-runner.netlify.app/

## 🚀 Getting Started

The main component for integration is `TestComponent`. Here is how to use it:

```jsx
import TestComponent from "./testing/TestComponent";

// 1. Define files (source and test)
const files = {
  "/Button.jsx": { path: "/Button.jsx", content: "...", isFolder: false },
  "/Button.test.jsx": {
    path: "/Button.test.jsx",
    content: "...",
    isFolder: false,
  },
};

// 2. Render the runner
<TestComponent files={files} testFilePaths={["/Button.test.jsx"]} />;
```

## 📋 Prerequisites

To integrate this component, the target project must use:

- **React** (v16.8+ for Hooks support)
- **Tailwind CSS** (for interface styling)
- **Vite** (recommended for native `?raw` import support) or a bundler configured to load files as raw strings.

## 🛠️ Installation

1. **Copy the folder**: Copy the entire `src/testing` directory into your project (e.g., into `src/components/testing`).

   Required files:
   - `TestDemo.jsx` (Main UI Component)
   - `TestComponent.jsx` (Standalone Test Runner)
   - `TestTransformer.js` (Compilation/transpiling management)
   - `TestSandbox.js` (Isolated execution environment)
   - `VitestCompatibleRunner.js` (Jest/Vitest compatible test engine)

2. **Install parsing dependencies**:
   The transformer uses `acorn` to safely analyze code.

   ```bash
   npm install acorn acorn-walk acorn-jsx
   ```

3. **Runtime Note**:
   The system dynamically loads React, ReactDOM, and Babel from CDN (`esm.sh`) inside the sandbox to ensure isolation. You do not need to install `@babel/standalone` in your project, but an **internet connection is required** during test execution.

## 💻 Usage

Import `TestComponent` and pass it the `files` object (Virtual File System) and the array of tests to execute.

```jsx
import React from "react";
import TestComponent from "./components/testing/TestComponent";

// 1. Virtual File System Definition
const virtualFiles = {
  "/MyComponent.jsx": {
    path: "/MyComponent.jsx",
    isFolder: false,
    content: `...`,
  },
  "/MyComponent.test.jsx": {
    path: "/MyComponent.test.jsx",
    isFolder: false,
    content: `...`,
  },
};

// 2. Component Render
export default function App() {
  return (
    <div className="h-screen w-full">
      <TestComponent
        files={virtualFiles}
        testFilePaths={["/MyComponent.test.jsx"]}
      />
    </div>
  );
}
```

## ⚙️ Props

| Prop            | Type            | Default | Description                                                                            |
| --------------- | --------------- | ------- | -------------------------------------------------------------------------------------- |
| `files`         | `Object`        | `{}`    | Object mapping file paths to their content.                                            |
| `testFilePaths` | `Array<String>` | `[]`    | Array of strings containing the paths of test files to execute. Must exist in `files`. |
