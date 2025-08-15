import React, { useState } from 'react';
import './CreateProject.css';
import StepProjectName from './StepProjectName';
import StepProjectDescription from './StepProjectDescription';
import StepWallet from './StepWallet';

import { useAuth } from '../../context/AuthContext';


const CreateProject: React.FC = () => {

  const { token} = useAuth();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    wallet: '',
  });

  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitProject = async () => {
    if (!token) {
      alert('You must be logged in to create a project.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Project created successfully!');
        console.log(data);
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (err) {
      alert('Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    <StepProjectName value={formData.projectName} onNext={nextStep} onChange={updateField} />,
    <StepProjectDescription value={formData.projectDescription} onNext={nextStep} onBack={prevStep} onChange={updateField} />,
    <StepWallet value={formData.wallet} onNext={submitProject} onBack={prevStep} onChange={updateField} />,
  ];

  return (
    <div className="create-project-container">
      {steps[step]}
    </div>
  );
};

export default CreateProject;
