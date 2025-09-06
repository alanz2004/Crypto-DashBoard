import { useState } from "react";
import "./Code.css";

const CodePage = () => {
  const [activeFile, setActiveFile] = useState("index.js");

  const files = ["index.js", "App.js", "Wallet.js", "TokenHolders.js"];

  const codeSamples: Record<string, string> = {
    "index.js": `console.log("Hello from index.js");`,
    "App.js": `function App() { return <h1>Cosmic Dashboard</h1>; }`,
    "Wallet.js": `const balance = 1000; console.log("Wallet:", balance);`,
    "TokenHolders.js": `const holders = ["Alice", "Bob"]; console.log(holders);`,
  };

  return (
    <div className="code-page">
      {/* Sidebar for file list */}
      <div className="file-list">
        {files.map((file) => (
          <div
            key={file}
            className={`file-item ${activeFile === file ? "active" : ""}`}
            onClick={() => setActiveFile(file)}
          >
            {file}
          </div>
        ))}
      </div>

      {/* Code display */}
      <div className="code-viewer">
        <pre>
          <code>{codeSamples[activeFile]}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodePage;
