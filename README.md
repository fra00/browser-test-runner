# React In-Browser Test Runner

Una suite di componenti React per eseguire test unitari direttamente nel browser. Include un motore di esecuzione (`TestComponent`) e un'interfaccia demo completa (`TestDemo`).

## 🚀 Getting Started

Il componente principale per l'integrazione è `TestComponent`. Ecco come usarlo:

```jsx
import TestComponent from "./testing/TestComponent";

// 1. Definisci i file (sorgente e test)
const files = {
  "/Button.jsx": { path: "/Button.jsx", content: "...", isFolder: false },
  "/Button.test.jsx": {
    path: "/Button.test.jsx",
    content: "...",
    isFolder: false,
  },
};

// 2. Renderizza il runner
<TestComponent files={files} testFilePaths={["/Button.test.jsx"]} />;
```

## 📋 Prerequisiti

Per integrare questo componente, il progetto di destinazione deve utilizzare:

- **React** (v16.8+ per il supporto agli Hooks)
- **Tailwind CSS** (per lo styling dell'interfaccia)
- **Vite** (consigliato per il supporto nativo agli import `?raw`) o un bundler configurato per caricare file come stringhe raw.

## 🛠️ Installazione

1. **Copia la cartella**: Copia l'intera directory `src/testing` nel tuo progetto (ad esempio in `src/components/testing`).

   File necessari:
   - `TestDemo.jsx` (Componente UI principale)
   - `TestComponent.jsx` (Runner dei test autonomo)
   - `TestTransformer.js` (Gestione della compilazione/transpiling)
   - `TestSandbox.js` (Ambiente di esecuzione isolato)
   - `VitestCompatibleRunner.js` (Motore di test compatibile con Jest/Vitest)

2. **Installa le dipendenze di parsing**:
   Il trasformatore utilizza `acorn` per analizzare il codice in sicurezza.

   ```bash
   npm install acorn acorn-walk acorn-jsx
   ```

3. **Nota sul Runtime**:
   Il sistema carica dinamicamente React, ReactDOM e Babel da CDN (`esm.sh`) all'interno della sandbox per garantire l'isolamento. Non è necessario installare `@babel/standalone` nel tuo progetto, ma è **richiesta una connessione internet** durante l'esecuzione dei test.

## 💻 Utilizzo

Importa `TestComponent` e passagli l'oggetto `files` (File System Virtuale) e l'array dei test da eseguire.

```jsx
import React from "react";
import TestComponent from "./components/testing/TestComponent";

// 1. Definizione del File System Virtuale
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

// 2. Render del componente
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

| Prop            | Tipo            | Default | Descrizione                                                                                       |
| --------------- | --------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `files`         | `Object`        | `{}`    | Oggetto che mappa i percorsi dei file al loro contenuto.                                          |
| `testFilePaths` | `Array<String>` | `[]`    | Array di stringhe contenente i percorsi dei file di test da eseguire. Devono esistere in `files`. |
