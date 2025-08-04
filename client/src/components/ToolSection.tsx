import React, { useState } from 'react';

interface ToolSectionProps {
  title: string;
  description: string;
  renderContent: () => React.ReactNode;
}

const ToolSection: React.FC<ToolSectionProps> = ({ title, description, renderContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="tool-section">
      <div className="tool-header">
        <div className="tool-info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button onClick={() => setOpen(!open)} className="tool-toggle-btn">
          {open ? 'Close' : 'Open'}
        </button>
      </div>
      {open && <div className="tool-body">{renderContent()}</div>}
    </div>
  );
};

export default ToolSection;
