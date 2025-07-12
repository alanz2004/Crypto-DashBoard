import { useState } from 'react';
import Dashboard from './pages/DashBoard';
import TokenHoldings from './components/TokenHoldings';

import Navbar from './components/NavBar';
import './index.css'; // ✅ THIS IS REQUIRED!


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (

      <div className="min-h-screen w-screen overflow-x-hidden bg-gray-50">
        <Navbar username="Alan Starobinski" />
        <main className="max-w-screen-xl mx-auto p-4 flex flex-col items-center">
          
          <Dashboard />
         
        </main>

      </div>
  );
}
