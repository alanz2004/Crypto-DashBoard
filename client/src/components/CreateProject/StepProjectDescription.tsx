import React from 'react';
import './CreateProject.css';

import projectImage from '../../assets/image_2.png';

interface Props {
  value: string;
  onNext: () => void;
  onBack: () => void;
  onChange: (field: string, value: string) => void;
}

const StepProjectDescription: React.FC<Props> = ({ value, onNext, onBack, onChange }) => {
  return (
    <div className="step-container">
      <div className="step-image">
        <img src='/assets/image_2.png' alt="project description" />
      </div>
      <div className="step-form">
        <h2>📝 Project Description</h2>
        <p>Describe your project clearly — what it does, who it's for, and what makes it special.</p>
        <textarea
          placeholder="Describe your project..."
          value={value}
          onChange={(e) => onChange('description', e.target.value)}
          rows={6}
        />
        <div className="step-actions">
          <button onClick={onBack}>Back</button>
          <button disabled={!value} onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default StepProjectDescription;
