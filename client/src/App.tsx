import { useState } from 'react';
import Dashboard from './pages/DashBoard';
import TokenHoldings from './components/TokenHoldings';

import Navbar from './components/NavBar';
import './index.css'; // ✅ THIS IS REQUIRED!


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (

      <div className="app-container">
        <Navbar username="Alan Starobinski" />
        <main className="content">
          
          <Dashboard />
         
        </main>
      </div>
  );
}
