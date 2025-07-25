import { useState } from 'react';


import Dashboard from './pages/DashBoard';
import Team from "./pages/Team";
import WalletPage from './pages/Wallet';
import AIHelperPage from './pages/AIHelper';

import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Navbar from './components/NavBar';
import './index.css'; // ✅ THIS IS REQUIRED!


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login route — always available — no Navbar or layout */}
        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />


        {/* Main app routes with layout */}
        <Route
          path="*"
          element={
            loggedIn ? (
              <div className="app-container">
                <Navbar username="Alan Starobinski" />
                <main className="content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/helper" element={<AIHelperPage />} />
                  </Routes>
                </main>
              </div>
            ) : (
              // Redirect to login if not logged in
              <LoginPage setLoggedIn={setLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
}
