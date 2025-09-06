import { useState } from "react";
import "./Code.css";

const CodePage = () => {
  const [activeFile, setActiveFile] = useState("index.js");
  const [fileContent, setFileContent] = useState(`console.log("Hello Cosmic World!");`);
  const [fileName, setFileName] = useState("example.js");

  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = fileName; // file name from state
    document.body.appendChild(a);
    a.click();

    // cleanup
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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
         <div className="download-row">
          <button className="download-btn" onClick={handleDownload}>
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
