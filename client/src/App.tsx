import { useState } from 'react';
import Sidebar from './components/SideBar';
import Dashboard from './pages/DashBoard';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <main className="flex-1 p-6">
        <Dashboard />
      </main>
    </div>
  );
}
