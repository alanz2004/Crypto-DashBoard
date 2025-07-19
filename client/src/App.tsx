import { useState } from 'react';


import Dashboard from './pages/DashBoard';
import Team from "./pages/Team";
import WalletPage from './pages/Wallet';
import AIHelperPage from './pages/AIHelper';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Navbar from './components/NavBar';
import './index.css'; // ✅ THIS IS REQUIRED!


export default function App() {
  return (

      <Router>
      <div className="app-container">
        <Navbar username="Alan Starobinski" />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path='/wallet' element={<WalletPage />} />
            <Route path='/helper' element={<AIHelperPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
