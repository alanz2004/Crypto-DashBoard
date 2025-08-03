import React from 'react';
import './CreateProject.css';


interface Props {
  value: string;
  onNext: () => void;
  onChange: (field: string, value: string) => void;
}

const StepProjectName: React.FC<Props> = ({ value, onNext, onChange }) => {
  return (
    <div className="step-container">
      <div className="step-image">
        <img src='/assets/image_1.png' alt="project name" />
      </div>
      <div className="step-form">
        <h2>🚀 Project Name</h2>
        <p>This is the name users and investors will see. Choose something unique and memorable.</p>
        <input
          type="text"
          placeholder="Enter your project name"
          value={value}
          onChange={(e) => onChange('projectName', e.target.value)}
        />
        <button disabled={!value} onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default StepProjectName;
