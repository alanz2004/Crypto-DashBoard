import React, { useState } from "react";
import "./EmbedContainer.css";

const EmbedContainer: React.FC = () => {
  const [mode, setMode] = useState<"js" | "react" | "cmd">("js");

  const codeSnippets: Record<string, string> = {
    js: `fetch("https://your-api.com/api/tokenholders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", tokens: 100 })
})
.then(res => res.json())
.then(data => console.log("Success:", data))
.catch(err => console.error("Error:", err));`,

    react: `import { useState } from "react";

export default function AddTokenHolder() {
  const [name, setName] = useState("");
  const [tokens, setTokens] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("https://your-api.com/api/tokenholders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, tokens })
    });
    const data = await res.json();
    console.log("Saved:", data);
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={tokens} onChange={e => setTokens(e.target.value)} placeholder="Tokens" />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}`,

    cmd: `curl -X POST https://your-api.com/api/tokenholders \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","tokens":100}'`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[mode]);
    alert("Code copied!");
  };

  return (
    <div className="embed-container">
      <div className="embed-header">
        <div className="mode-switch">
          <button
            className={mode === "js" ? "active" : ""}
            onClick={() => setMode("js")}
          >
            JavaScript
          </button>
          <button
            className={mode === "react" ? "active" : ""}
            onClick={() => setMode("react")}
          >
            React
          </button>
          <button
            className={mode === "cmd" ? "active" : ""}
            onClick={() => setMode("cmd")}
          >
            cURL
          </button>
        </div>
        <button className="copy-btn" onClick={copyToClipboard}>
          Copy Code
        </button>
      </div>

      <pre className="code-block">
        <code>{codeSnippets[mode]}</code>
      </pre>
    </div>
  );
};

export default EmbedContainer;
