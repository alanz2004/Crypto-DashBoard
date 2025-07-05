import { useState } from 'react';
import Dashboard from './pages/DashBoard';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
       <Dashboard />
    </div>
  );
}
