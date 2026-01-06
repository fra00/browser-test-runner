import React, { useState, useEffect } from "react";
import TestComponent from "../testing/TestComponent";

export default function TestDemo({
  files = {},
  testFilePath = "/Counter.test.jsx",
  sourceFilePath = "/Counter.jsx",
}) {
  const [sourceCode, setSourceCode] = useState(
    files[sourceFilePath]?.content || ""
  );
  const [testCode, setTestCode] = useState(files[testFilePath]?.content || "");
  const [activeTab, setActiveTab] = useState("results");

  useEffect(() => {
    setSourceCode(files[sourceFilePath]?.content || "");
  }, [files, sourceFilePath]);

  useEffect(() => {
    setTestCode(files[testFilePath]?.content || "");
  }, [files, testFilePath]);

  // Costruiamo l'oggetto files aggiornato con il contenuto degli editor
  const currentFiles = {
    ...files,
    [sourceFilePath]: {
      path: sourceFilePath,
      content: sourceCode,
      isFolder: false,
    },
    [testFilePath]: {
      path: testFilePath,
      content: testCode,
      isFolder: false,
    },
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-700">
          Web Test Runner Demo
        </h1>
        {/* Il pulsante Run è ora gestito internamente da TestComponent */}
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editors */}
        <div className="flex-1 flex flex-col border-r border-gray-200">
          {/* Source Editor */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
              {sourceFilePath} (Source)
            </div>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              className="flex-1 w-full p-4 font-mono text-sm resize-none outline-none focus:bg-blue-50/10"
              spellCheck="false"
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200"></div>

          {/* Test Editor */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
              {testFilePath} (Test)
            </div>
            <textarea
              value={testCode}
              onChange={(e) => setTestCode(e.target.value)}
              className="flex-1 w-full p-4 font-mono text-sm resize-none outline-none bg-gray-50/30 focus:bg-blue-50/10"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right: Results & Preview */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-200 bg-white shrink-0">
            <button
              onClick={() => setActiveTab("results")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "results"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Risultati
            </button>
            <button
              onClick={() => setActiveTab("getting-started")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "getting-started"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Getting Started
            </button>
            <button
              onClick={() => setActiveTab("syntax")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "syntax"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sintassi
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden relative">
            {/* TestComponent (Results) */}
            <div
              className={`absolute inset-0 ${
                activeTab === "results" ? "block" : "hidden"
              }`}
            >
              <TestComponent
                files={currentFiles}
                testFilePaths={[testFilePath]}
              />
            </div>

            {/* Getting Started */}
            {activeTab === "getting-started" && (
              <div className="h-full overflow-y-auto p-6">
                <div className="space-y-6 text-sm text-gray-700">
                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Uso di TestComponent
                    </h4>
                    <p className="mb-2 text-xs">
                      Il componente <code>TestComponent</code> è il motore di
                      esecuzione dei test. Importalo e passagli i file virtuali.
                    </p>
                    <pre className="block bg-gray-100 p-3 rounded font-mono text-xs mb-2 overflow-x-auto border border-gray-200">
                      {`import TestComponent from './TestComponent';

<TestComponent 
  files={virtualFiles} 
  testFilePaths={["/tests/MyComponent.test.jsx"]} 
/>`}
                    </pre>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Struttura Oggetto Files
                    </h4>
                    <p className="mb-2 text-xs">
                      L'oggetto <code>files</code> deve seguire questa
                      struttura:
                    </p>
                    <pre className="block bg-gray-100 p-3 rounded font-mono text-xs mb-2 overflow-x-auto border border-gray-200">
                      {`const virtualFiles = {
  "/MyComponent.jsx": { 
    path: "/MyComponent.jsx", // Percorso univoco
    content: "export default ...", // Codice sorgente
    isFolder: false 
  },
  "/tests/MyComponent.test.jsx": { 
    path: "/tests/MyComponent.test.jsx", 
    content: "import ...", 
    isFolder: false 
  }
};`}
                    </pre>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Esecuzione Multipla
                    </h4>
                    <p className="mb-2 text-xs">
                      Puoi eseguire più file di test contemporaneamente passando
                      un array di percorsi:
                    </p>
                    <pre className="block bg-gray-100 p-3 rounded font-mono text-xs mb-2 overflow-x-auto border border-gray-200">
                      {`<TestComponent 
  files={virtualFiles} 
  testFilePaths={[
    "/tests/Button.test.jsx",
    "/tests/Header.test.jsx"
  ]} 
/>`}
                    </pre>
                  </section>
                </div>
              </div>
            )}

            {/* Syntax */}
            {activeTab === "syntax" && (
              <div className="h-full overflow-y-auto p-6">
                <div className="space-y-6 text-sm text-gray-700">
                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Struttura Base (Vitest/Jest)
                    </h4>
                    <pre className="block bg-gray-100 p-3 rounded font-mono text-xs mb-2 overflow-x-auto border border-gray-200">
                      {`import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});`}
                    </pre>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      React Testing Library
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <code>render(component)</code>: Renderizza il componente
                        nel DOM virtuale.
                      </li>
                      <li>
                        <code>screen</code>: Accesso alle query (
                        <code>getByText</code>, <code>getByRole</code>,{" "}
                        <code>queryBy...</code>).
                      </li>
                      <li>
                        <code>fireEvent</code>: Simula eventi DOM (
                        <code>click</code>, <code>change</code>,{" "}
                        <code>submit</code>).
                      </li>
                      <li>
                        <code>waitFor(callback)</code>: Attende che
                        un'asserzione asincrona abbia successo.
                      </li>
                      <li>
                        <code>act(callback)</code>: Avvolge aggiornamenti di
                        stato o effetti asincroni.
                      </li>
                      <li>
                        <code>renderHook(callback)</code>: Utility per testare
                        hook personalizzati isolati.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Lifecycle & Setup
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <code>beforeEach(fn)</code>: Esegue prima di ogni test
                        nella suite.
                      </li>
                      <li>
                        <code>afterEach(fn)</code>: Esegue dopo ogni test nella
                        suite.
                      </li>
                      <li>
                        <code>beforeAll(fn)</code>: Esegue una volta prima di
                        tutti i test.
                      </li>
                      <li>
                        <code>afterAll(fn)</code>: Esegue una volta dopo tutti i
                        test.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Mocking (vi)
                    </h4>
                    <p className="mb-2 text-xs">
                      L'oggetto globale <code>vi</code> fornisce utility
                      compatibili con Vitest/Jest.
                    </p>
                    <pre className="block bg-gray-100 p-3 rounded font-mono text-xs mb-2 overflow-x-auto border border-gray-200">
                      {`const handler = vi.fn();
fireEvent.click(button);
expect(handler).toHaveBeenCalled();

// Spy su metodi esistenti
const spy = vi.spyOn(console, 'log');
expect(spy).toHaveBeenCalledWith('msg');`}
                    </pre>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      React Hooks Globali
                    </h4>
                    <p className="text-xs mb-2">
                      Disponibili globalmente (senza import) per comodità:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {[
                        "useState",
                        "useEffect",
                        "useContext",
                        "useReducer",
                        "useCallback",
                        "useMemo",
                        "useRef",
                        "useImperativeHandle",
                        "useLayoutEffect",
                        "createContext",
                      ].map((hook) => (
                        <span
                          key={hook}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono"
                        >
                          {hook}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Matchers Comuni (expect)
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
                      <li>.toBe(value)</li>
                      <li>.toEqual(object)</li>
                      <li>.toBeTruthy() / .toBeFalsy()</li>
                      <li>.toBeInTheDocument()</li>
                      <li>.toHaveTextContent(text)</li>
                      <li>.toHaveAttribute(attr, val)</li>
                      <li>.toHaveBeenCalled() / .toHaveBeenCalledWith(...)</li>
                      <li>.toHaveLength(number)</li>
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
