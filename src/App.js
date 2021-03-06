import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';

// Import pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patient/Patients';
import PatientProfile from './pages/Patient/PatientProfile';
import PatientHome from './pages/Patient/PatientHome';
import Profile from './pages/Profile';
import Anamnesis from './pages/Patient/Anamnesis';
import EnergyExpenditure from './pages/Patient/EnergyExpenditure';

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

          <Route path="/patients" element={<ProtectedLayout children={<Patients />} />} />

          <Route path="/patients/edit/:id" element={<ProtectedLayout children={<PatientHome />} />} />

          <Route path="/patients/edit/:id/gasto-energetico" element={<ProtectedLayout children={<EnergyExpenditure />} />} />
          
          <Route path="/patients/edit/:id/anamnesis" element={<ProtectedLayout children={<Anamnesis />} />} />

          <Route path="/patients/edit/:id/anamnesis/:anamnesisId" element={<ProtectedLayout children={<Anamnesis />} />} />
          
          <Route path="/patients/edit/:id/gasto-energetico/:energyExpenditureId" element={<ProtectedLayout children={<EnergyExpenditure />} />} />

          <Route path="/patients/edit/:id/profile" element={<ProtectedLayout children={<PatientProfile />} />} />

          <Route path="/profile" element={<ProtectedLayout children={<Profile />} />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/signup" element={<Signup />} />

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
