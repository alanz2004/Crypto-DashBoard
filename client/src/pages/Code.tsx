import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UploadAndGoLive from "../components/Code/UploadAndGoLive";
import "./Code.css";

// --- Types ---
interface CodePageProps {
  projectId: string;
}

interface ProjectFile {
  _id: string;
  fileName: string;
  content: string;
  language: string;
}

// --- Component ---
const CodePage: React.FC<CodePageProps> = ({ projectId }) => {
  const { token } = useAuth();

  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);

  // --- File Download ---
  const handleDownload = () => {
    if (!activeFile) return;

    const blob = new Blob([activeFile.content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = activeFile.fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };

  // --- Fetch Files ---
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/files/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setFiles(res.data);
        if (res.data.length > 0) {
          setActiveFile(res.data[0]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch files:", err);
      }
    };

    if (token && projectId) {
      fetchFiles();
    }
  }, [token, projectId]);

  return (
    <div className="code-page">
      <div className="code-files-container">
        {/* --- Sidebar: File List --- */}
        <aside className="file-list">
          {files.map((file) => (
            <div
              key={file._id}
              className={`file-item ${activeFile?._id === file._id ? "active" : ""}`}
              onClick={() => setActiveFile(file)}
            >
              {file.fileName}
            </div>
          ))}
        </aside>

        {/* --- Code Viewer --- */}
        <section className="code-viewer">
          <pre>
            <code>
              {activeFile?.content || "Select a file to view its content"}
            </code>
          </pre>

          <div className="download-row">
            <button
              className="download-btn"
              onClick={handleDownload}
              disabled={!activeFile}
            >
              ⬇ Download
            </button>
          </div>
        </section>
      </div>

      {/* --- Upload Section --- */}
      <UploadAndGoLive />
    </div>
  );
};

export default CodePage;
