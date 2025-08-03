import React, { useState } from 'react';
import './CreateProject.css';
import StepProjectName from './StepProjectName';
import StepProjectDescription from './StepProjectDescription';
import StepWallet from './StepWallet';

const CreateProject: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    wallet: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    <StepProjectName value={formData.projectName} onNext={nextStep} onChange={updateField} />,
    <StepProjectDescription value={formData.description} onNext={nextStep} onBack={prevStep} onChange={updateField} />,
    <StepWallet value={formData.wallet} onNext={() => alert('Finished!')} onBack={prevStep} onChange={updateField} />,
  ];

  return (
    <div className="create-project-container">
      {steps[step]}
    </div>
  );
};

export default CreateProject;
