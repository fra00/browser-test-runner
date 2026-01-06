import React, { useState, useRef } from "react";
import { TestTransformer } from "./TestTransformer";
import { TestSandbox } from "./TestSandbox";

// Hook personalizzato per incapsulare la logica di esecuzione dei test
const useTestRunner = () => {
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const sandboxContainerRef = useRef(null);

  const run = async (virtualFiles, testFilePaths) => {
    setIsRunning(true);
    setResults(null);
    setError(null);

    try {
      // 1. Inizializziamo il Transformer
      const transformer = new TestTransformer(virtualFiles);
      let bundledCode;

      // Gestione di uno o più file di test
      const paths = Array.isArray(testFilePaths)
        ? testFilePaths
        : [testFilePaths];

      if (paths.length === 0) {
        throw new Error("Nessun file di test specificato.");
      }

      if (paths.length > 1) {
        // Se ci sono più test, creiamo un entry point virtuale che li importa tutti
        const entryCode = paths.map((p) => `import '${p}';`).join("\n");
        bundledCode = transformer.transformVirtual(entryCode);
      } else {
        // Se c'è un solo test, lo trasformiamo direttamente
        bundledCode = transformer.transform(paths[0]);
      }

      // 3. Prepariamo la Sandbox
      if (sandboxContainerRef.current) {
        sandboxContainerRef.current.innerHTML = "";
      }

      const sandbox = new TestSandbox({
        visible: true,
        container: sandboxContainerRef.current,
      });

      // 4. Eseguiamo il test
      const testResults = await sandbox.executeTest(bundledCode, (status) => {
        console.log("Test Status:", status);
      });

      setResults(testResults);
    } catch (err) {
      console.error(err);
      setError(err.message || "Errore sconosciuto durante l'esecuzione");
    } finally {
      setIsRunning(false);
    }
  };

  return { results, isRunning, error, sandboxContainerRef, run };
};

export default function TestComponent({ files = {}, testFilePaths = [] }) {
  // Utilizziamo l'hook per gestire la logica
  const { results, isRunning, error, sandboxContainerRef, run } =
    useTestRunner();

  const handleRunTests = () => {
    run(files, testFilePaths);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header del componente con pulsante Run */}
      <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center shrink-0">
        <h2 className="text-sm font-bold text-gray-700">Test Runner</h2>
        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className={`px-4 py-2 rounded font-medium text-white transition-colors ${
            isRunning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isRunning ? "Esecuzione..." : "Run Tests"}
        </button>
      </div>

      {/* Area Risultati */}
      <div className="flex-1 overflow-y-auto p-6">
        {error && (
          <div className="p-4 mb-4 rounded bg-red-50 border border-red-200 text-red-800 text-sm">
            <strong className="block mb-1">
              Errore di Compilazione/Esecuzione:
            </strong>
            <pre className="whitespace-pre-wrap font-mono text-xs">
              {error.toString()}
            </pre>
          </div>
        )}

        {results && (
          <div>
            <div className="flex gap-4 mb-6 text-sm">
              <span className="text-green-700 font-bold">
                Passati: {results.numPassedTests}
              </span>
              <span className="text-red-700 font-bold">
                Falliti: {results.numFailedTests}
              </span>
              <span className="text-gray-600">
                Totale: {results.numTotalTests}
              </span>
              <span className="text-gray-600">
                Tempo: {(results.endTime - results.startTime).toFixed(2)}
                ms
              </span>
            </div>

            <div className="space-y-3">
              {results.testResults.map((suite, sIdx) => (
                <div key={sIdx}>
                  {suite.assertionResults.map((test, tIdx) => (
                    <div
                      key={tIdx}
                      className={`p-3 rounded border ${
                        test.status === "pass"
                          ? "bg-green-50 border-green-200 text-green-900"
                          : "bg-red-50 border-red-200 text-red-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {test.status === "pass" ? "✅" : "❌"}
                        </span>
                        <span className="font-medium">{test.fullName}</span>
                        <span className="ml-auto text-xs opacity-70">
                          {test.duration.toFixed(1)}ms
                        </span>
                      </div>
                      {test.failureMessages.length > 0 && (
                        <pre className="mt-2 p-2 bg-white/50 rounded text-xs text-red-800 overflow-x-auto font-mono">
                          {test.failureMessages.join("\n")}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {!results && !error && !isRunning && (
          <div className="text-gray-500 italic text-center mt-10">
            Premi "Run Tests" per vedere i risultati.
          </div>
        )}
      </div>

      {/* Visual Preview (Hidden Sandbox) */}
      <div className="h-1/3 border-t border-gray-200 bg-white flex flex-col shrink-0">
        <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
          Visual Debug (Rendered Output)
        </div>
        <div ref={sandboxContainerRef} className="flex-1 overflow-auto p-4">
          {/* Il contenuto viene iniettato qui dalla Sandbox */}
        </div>
      </div>
    </div>
  );
}
