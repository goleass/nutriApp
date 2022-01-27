import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';

// Import pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import { AuthProvider } from './context/AuthProvider';
import { ProtectedLayout } from './components/ProtectedLayout'

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedLayout children={<Dashboard />} />} />

          <Route path="/patients" element={<ProtectedLayout children={<Dashboard />} />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/signup" element={<Signup />} />

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
