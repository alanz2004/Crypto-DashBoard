import { useState } from 'react';


import HomePage from './pages/HomePage';

import Dashboard from './pages/DashBoard';
import MarketingPage from './pages/MarketingPage';
import Team from "./pages/Team";
import WalletPage from './pages/Wallet';
import AIHelperPage from './pages/AIHelper';
import CodePage from './pages/Code';
import SmartContractsDashboard from './pages/SmartContractsDashboard';
import CreateLandingPage from './pages/CreateLandingPage';
import MarketingNeeds from './pages/MarketingNeeds';


import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';


import CreateProject from './components/CreateProject/CreateProject';
import AppFooter from './components/AppFooter';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Navbar from './components/NavBars/NavBar';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';




import './index.css'; // ✅ THIS IS REQUIRED!


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <AuthProvider>

                <Routes>
              {/* Login route — always available — no Navbar or layout */}
              <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/marketingneeds' element={<MarketingNeeds />}/>
              <Route path='/createproject' element={<ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>} />

              {/* Main app routes with layout */}
              <Route
                path="*"
                element={
                  loggedIn ? (
                    <ProtectedRoute>
                         <div className="app-container">
                            <Navbar username="Alan Starobinski" />
                            <main className="content">
                              <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/team" element={<Team />} />
                                <Route path="/wallet" element={<WalletPage />} />
                                <Route path="/helper" element={<AIHelperPage projectId='68a07b2e8ac4689151efe55a'/>} />
                                <Route path='/smartcontracts' element={<SmartContractsDashboard projectId='68a07b2e8ac4689151efe55a'/>} />
                                <Route path='/code' element={<CodePage projectId='68a07b2e8ac4689151efe55a'/>} />
                                <Route path='/marketing' element={<MarketingPage projectId='68a07b2e8ac4689151efe55a'/>}/>
                                <Route path='/createLandingPage' element={<CreateLandingPage projectId='68a07b2e8ac4689151efe55a'/>} />
                              </Routes>
                            </main>

                            <AppFooter />
                          </div>
                    </ProtectedRoute>
                   
                  ) : (
                    // Redirect to login if not logged in
                    <LoginPage setLoggedIn={setLoggedIn} />
                  )
                }
              />
            </Routes>

      </AuthProvider>
    
    </Router>
  );
}
